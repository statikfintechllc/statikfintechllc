import { useState, useCallback, useEffect } from 'react';
import { Chat, Message, AIModel, ChatState } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

export function useChat() {
  const [chats, setChats] = useState<Chat[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pilot-chats');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [chatState, setChatState] = useState<ChatState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pilot-chat-state');
      return saved ? JSON.parse(saved) : {
        currentChatId: null,
        selectedModel: 'GPT 4o', // Default to a Daily-Dose model
        isLoading: false
      };
    }
    return {
      currentChatId: null,
      selectedModel: 'GPT 4o', // Default to a Daily-Dose model
      isLoading: false
    };
  });

  const { authState, availableModels } = useAuth();
  
  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pilot-chats', JSON.stringify(chats));
    }
  }, [chats]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pilot-chat-state', JSON.stringify(chatState));
    }
  }, [chatState]);

  const currentChat = chats?.find(chat => chat.id === chatState?.currentChatId);

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      lastUpdated: Date.now()
    };

    setChats(currentChats => [...currentChats, newChat]);
    setChatState(prev => ({
      ...prev,
      currentChatId: newChat.id
    }));

    return newChat.id;
  }, [setChats, setChatState]);

  const selectChat = useCallback((chatId: string) => {
    setChatState(prev => ({
      ...prev,
      currentChatId: chatId
    }));
  }, [setChatState]);

  const setModel = useCallback((model: AIModel) => {
    setChatState(prev => ({
      ...prev,
      selectedModel: model
    }));
  }, [setChatState]);

  const setLoading = useCallback((loading: boolean) => {
    setChatState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, [setChatState]);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!chatState.currentChatId) return;

    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: Date.now()
    };

    setChats(currentChats => 
      currentChats.map(chat => 
        chat.id === chatState.currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastUpdated: Date.now(),
              title: chat.title === 'New Chat' && chat.messages.length === 0 
                ? message.content.slice(0, 100) + (message.content.length > 100 ? '...' : '')
                : chat.title
            }
          : chat
      )
    );

    return newMessage.id;
  }, [chatState.currentChatId, setChats]);

  const deleteChat = useCallback((chatId: string) => {
    setChats(currentChats => currentChats.filter(chat => chat.id !== chatId));
    if (chatState.currentChatId === chatId) {
      setChatState(prev => ({
        ...prev,
        currentChatId: null
      }));
    }
  }, [setChats, setChatState, chatState.currentChatId]);

  const editMessage = useCallback(async (messageId: string, newContent: string) => {
    if (!chatState.currentChatId) return;

    const currentChatData = chats.find(chat => chat.id === chatState.currentChatId);
    if (!currentChatData) return;

    // Find the message being edited
    const messageIndex = currentChatData.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    const messageToEdit = currentChatData.messages[messageIndex];
    
    // If this is a user message, truncate all subsequent messages and regenerate AI response
    if (messageToEdit.role === 'user') {
      setLoading(true);
      
      try {
        // Create version history for the message
        const versions = messageToEdit.versions || [
          { content: messageToEdit.content, timestamp: messageToEdit.timestamp, model: messageToEdit.model }
        ];
        
        // Add new version
        const newVersion = { content: newContent, timestamp: Date.now(), model: messageToEdit.model };
        const updatedVersions = [...versions, newVersion];
        
        // Update the user message and remove all subsequent messages
        const truncatedMessages = currentChatData.messages.slice(0, messageIndex);
        const updatedUserMessage = {
          ...messageToEdit,
          content: newContent,
          isEdited: true,
          editedAt: Date.now(),
          versions: updatedVersions,
          currentVersionIndex: updatedVersions.length - 1
        };

        // Update chat with edited message and truncated conversation
        setChats(currentChats => 
          currentChats.map(chat => 
            chat.id === chatState.currentChatId
              ? {
                  ...chat,
                  messages: [...truncatedMessages, updatedUserMessage],
                  lastUpdated: Date.now()
                }
              : chat
          )
        );

        // Generate new AI response using GitHub Models API
        try {
          const response = await fetch('https://models.github.ai/inference/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState?.accessToken}`,
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28'
            },
            body: JSON.stringify({
              model: chatState.selectedModel,
              messages: [{ role: 'user', content: newContent }],
              temperature: 0.7,
              max_tokens: 2048
            })
          });

          if (!response.ok) {
            throw new Error(`GitHub Models API error: ${response.status}`);
          }

          const result = await response.json();
          const aiContent = result.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

          // Add new AI response
          const aiMessage: Message = {
            id: `msg-${Date.now()}-ai`,
            content: aiContent,
            role: 'assistant',
            timestamp: Date.now(),
            model: chatState.selectedModel
          };

          setChats(currentChats => 
            currentChats.map(chat => 
              chat.id === chatState.currentChatId
                ? {
                    ...chat,
                    messages: [...truncatedMessages, updatedUserMessage, aiMessage],
                    lastUpdated: Date.now()
                  }
                : chat
            )
          );
        } catch (error) {
          console.error('Error calling GitHub Models API:', error);
          
          // Add error message
          const errorMessage: Message = {
            id: `msg-${Date.now()}-error`,
            content: 'Sorry, I encountered an error processing your request. Please try again.',
            role: 'assistant',
            timestamp: Date.now(),
            model: chatState.selectedModel
          };

          setChats(currentChats => 
            currentChats.map(chat => 
              chat.id === chatState.currentChatId
                ? {
                    ...chat,
                    messages: [...truncatedMessages, updatedUserMessage, errorMessage],
                    lastUpdated: Date.now()
                  }
                : chat
            )
          );
        }
        console.error('Error regenerating AI response:', error);
        // Add error message
        const errorMessage: Message = {
          id: `msg-${Date.now()}-error`,
          content: 'Sorry, I encountered an error processing your edited message. Please try again.',
          role: 'assistant',
          timestamp: Date.now(),
          model: chatState.selectedModel
        };

        setChats(currentChats => 
          currentChats.map(chat => 
            chat.id === chatState.currentChatId
              ? {
                  ...chat,
                  messages: [...currentChatData.messages.slice(0, messageIndex), 
                            { ...messageToEdit, content: newContent, isEdited: true, editedAt: Date.now() },
                            errorMessage],
                  lastUpdated: Date.now()
                }
              : chat
          )
        );
      } finally {
        setLoading(false);
      }
    } else {
      // For AI messages, just update the content without regenerating
      const versions = messageToEdit.versions || [
        { content: messageToEdit.content, timestamp: messageToEdit.timestamp, model: messageToEdit.model }
      ];
      
      // Add new version
      const newVersion = { content: newContent, timestamp: Date.now(), model: messageToEdit.model };
      const updatedVersions = [...versions, newVersion];
      
      setChats(currentChats => 
        currentChats.map(chat => 
          chat.id === chatState.currentChatId
            ? {
                ...chat,
                messages: chat.messages.map(msg => 
                  msg.id === messageId
                    ? {
                        ...msg,
                        content: newContent,
                        isEdited: true,
                        editedAt: Date.now(),
                        versions: updatedVersions,
                        currentVersionIndex: updatedVersions.length - 1
                      }
                    : msg
                ),
                lastUpdated: Date.now()
              }
            : chat
        )
      );
    }
  }, [chatState.currentChatId, chatState.selectedModel, chats, setChats, setLoading]);

  const switchMessageVersion = useCallback((messageId: string, versionIndex: number) => {
    if (!chatState.currentChatId) return;

    setChats(currentChats => 
      currentChats.map(chat => 
        chat.id === chatState.currentChatId
          ? {
              ...chat,
              messages: chat.messages.map(msg => {
                if (msg.id === messageId && msg.versions && msg.versions[versionIndex]) {
                  const version = msg.versions[versionIndex];
                  return {
                    ...msg,
                    content: version.content,
                    currentVersionIndex: versionIndex,
                    model: version.model
                  };
                }
                return msg;
              }),
              lastUpdated: Date.now()
            }
          : chat
      )
    );
  }, [chatState.currentChatId, setChats]);

  const sendMessage = useCallback(async (content: string, imageUrl?: string, fileData?: { name: string; url: string; type: string }) => {
    if (!content.trim() && !imageUrl && !fileData) return;
    
    // Check if the selected model is available
    const isModelAvailable = availableModels.some(model => model.id === chatState.selectedModel);
    let targetModel = chatState.selectedModel;
    
    if (!isModelAvailable) {
      // Fallback to first available model
      if (availableModels.length > 0) {
        targetModel = availableModels[0].id as AIModel;
        setChatState(prev => ({
          ...prev,
          selectedModel: targetModel
        }));
      } else {
        // Absolute fallback
        targetModel = 'gpt-4o';
        setChatState(prev => ({
          ...prev,
          selectedModel: targetModel
        }));
      }
    }
    
    // Ensure we have a current chat
    let targetChatId = chatState.currentChatId;
    if (!targetChatId) {
      const newChat: Chat = {
        id: `chat-${Date.now()}`,
        title: 'New Chat',
        messages: [],
        createdAt: Date.now(),
        lastUpdated: Date.now()
      };

      setChats(currentChats => [...currentChats, newChat]);
      setChatState(prev => ({
        ...prev,
        currentChatId: newChat.id
      }));
      targetChatId = newChat.id;
    }

    setLoading(true);

    try {
      // Add user message
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        content,
        role: 'user',
        timestamp: Date.now(),
        imageUrl,
        fileData,
        model: targetModel
      };

      setChats(currentChats => 
        currentChats.map(chat => 
          chat.id === targetChatId
            ? {
                ...chat,
                messages: [...chat.messages, userMessage],
                lastUpdated: Date.now(),
                title: chat.title === 'New Chat' && chat.messages.length === 0 
                  ? content.slice(0, 100) + (content.length > 100 ? '...' : '')
                  : chat.title
              }
            : chat
        )
      );

      // Generate AI response using GitHub Models API
      try {
        // Construct prompt with file context if available
        let promptContent = content;
        
        if (imageUrl) {
          promptContent += '\n\n[Image provided - please analyze the image in your response]';
        }
        
        if (fileData) {
          promptContent += `\n\nFile attached: ${fileData.name} (${fileData.type})`;
          if (fileData.type.includes('text') || fileData.type.includes('json') || fileData.type.includes('csv')) {
            promptContent += '\nPlease analyze this file if needed.';
          }
        }

        // Add GitHub context if authenticated
        if (authState?.isAuthenticated && authState.user) {
          promptContent += `\n\n[User: ${authState.user.login} on GitHub]`;
        }
        
        // Get current chat for conversation history
        const currentChatData = chats.find(chat => chat.id === targetChatId);
        const conversationMessages = currentChatData?.messages || [];
        
        // Build conversation history for API - include last 10 messages to maintain context
        const apiMessages = conversationMessages
          .slice(-10) // Keep last 10 messages for context
          .map(msg => ({
            role: msg.role,
            content: msg.content
          }))
          .concat([{ role: 'user', content: promptContent }]); // Add current message
          
        console.log('🔍 Sending messages to API:', apiMessages.length, 'messages'); // Debug log
        
        // Call GitHub Models API with proper token limits and conversation history
        const response = await fetch('https://models.github.ai/inference/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState?.accessToken}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          },
          body: JSON.stringify({
            model: targetModel,
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 32000, // Increased to allow for full 33k token responses
            stream: false
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('GitHub Models API error:', response.status, errorText);
          throw new Error(`GitHub Models API error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('🔍 Full API Response:', result); // Debug log
        console.log('🔍 Response choices:', result.choices); // Debug log
        
        const aiContent = result.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
        console.log('🔍 AI Content length:', aiContent.length); // Debug log
        console.log('🔍 AI Content preview:', aiContent.substring(0, 200) + '...'); // Debug log
        
        // Add AI response
        const aiMessage: Message = {
          id: `msg-${Date.now()}-ai`,
          content: aiContent,
          role: 'assistant',
          timestamp: Date.now(),
          model: targetModel
        };

        setChats(currentChats => 
          currentChats.map(chat => 
            chat.id === targetChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, aiMessage],
                  lastUpdated: Date.now()
                }
              : chat
          )
        );
      } catch (modelError) {
        console.error('Error calling GitHub Models API:', modelError);
        
        // Add error message
        const errorMessage: Message = {
          id: `msg-${Date.now()}-error`,
          content: 'Sorry, I encountered an error processing your request. Please try again.',
          role: 'assistant',
          timestamp: Date.now(),
          model: targetModel
        };

        setChats(currentChats => 
          currentChats.map(chat => 
            chat.id === targetChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, errorMessage],
                  lastUpdated: Date.now()
                }
              : chat
          )
        );
      }
    } catch (error) {
      console.error('Error in sendMessage:', error);
      // Add error message
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        role: 'assistant',
        timestamp: Date.now(),
        model: targetModel
      };

      setChats(currentChats => 
        currentChats.map(chat => 
          chat.id === targetChatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage],
                lastUpdated: Date.now()
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  }, [chatState.currentChatId, chatState.selectedModel, authState.isAuthenticated, authState.user, availableModels, chats, setChats, setChatState, setLoading]);

  return {
    chats,
    currentChat,
    chatState,
    createNewChat,
    selectChat,
    setModel,
    addMessage,
    editMessage,
    switchMessageVersion,
    deleteChat,
    sendMessage
  };
}