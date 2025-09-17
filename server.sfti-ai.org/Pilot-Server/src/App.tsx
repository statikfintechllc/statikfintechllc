import { useChat } from '@/hooks/use-chat';
import { useAuth } from '@/hooks/use-auth';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatMessages } from '@/components/ChatMessages';
import { MessageInput } from '@/components/MessageInput';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ModelBubble } from '@/components/ModelBubble';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthGuard } from '@/components/AuthGuard';
import { GitHubCallback } from '@/components/GitHubCallback';
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function ChatApp() {
  const { authState, signIn } = useAuth();
  
  // Check for OAuth callback parameters on page load and redirect to callback route
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code) {
      console.log('OAuth callback detected on root route, redirecting to /auth/callback...');
      // Redirect to the proper callback route with parameters
      window.location.href = `/auth/callback${window.location.search}`;
      return;
    }
  }, []);

  const {
    chats,
    currentChat,
    chatState,
    createNewChat,
    selectChat,
    setModel,
    deleteChat,
    editMessage,
    switchMessageVersion,
    sendMessage
  } = useChat();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Enhanced ResizeObserver error suppression - comprehensive approach
  useEffect(() => {
    // Suppress ResizeObserver errors in console
    const originalConsoleError = window.console.error;
    window.console.error = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('ResizeObserver loop completed with undelivered notifications') ||
           message.includes('ResizeObserver loop limit exceeded') ||
           message.includes('ResizeObserver'))) {
        return; // Suppress these specific errors
      }
      originalConsoleError.apply(console, args);
    };

    // Handle error events - only suppress ResizeObserver errors
    const handleError = (event: ErrorEvent) => {
      if (event.message && 
          (event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
           event.message.includes('ResizeObserver loop limit exceeded') ||
           event.message.includes('ResizeObserver'))) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    // Handle unhandled promise rejections - only suppress ResizeObserver errors
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && typeof event.reason === 'string' && 
          (event.reason.includes('ResizeObserver loop completed with undelivered notifications') ||
           event.reason.includes('ResizeObserver loop limit exceeded') ||
           event.reason.includes('ResizeObserver'))) {
        event.preventDefault();
        return false;
      }
    };

    // Debounce ResizeObserver globally to prevent loops
    const originalResizeObserver = window.ResizeObserver;
    const resizeObserverMap = new WeakMap();
    
    window.ResizeObserver = class extends originalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        const wrappedCallback: ResizeObserverCallback = (entries, observer) => {
          const element = entries[0]?.target;
          if (element && resizeObserverMap.has(element)) {
            clearTimeout(resizeObserverMap.get(element));
          }
          
          const timeoutId = setTimeout(() => {
            try {
              callback(entries, observer);
            } catch (error) {
              // Suppress ResizeObserver callback errors
              if (error instanceof Error && error.message.includes('ResizeObserver')) {
                return;
              }
              throw error;
            }
          }, 0);
          
          if (element) {
            resizeObserverMap.set(element, timeoutId);
          }
        };
        
        super(wrappedCallback);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.console.error = originalConsoleError;
      window.ResizeObserver = originalResizeObserver;
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const handleNewChat = () => {
    createNewChat();
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AuthGuard>
          <div className="h-screen flex bg-background overflow-hidden">
            <ChatSidebar
              chats={chats}
              currentChatId={chatState.currentChatId}
              onSelectChat={selectChat}
              onDeleteChat={deleteChat}
              onNewChat={handleNewChat}
              onSidebarCollapse={handleSidebarCollapse}
            />
            
            {/* Desktop main content with proper spacing */}
            <div className={cn(
              "flex-1 flex flex-col min-w-0 min-h-0 relative max-h-screen overflow-hidden transition-all duration-300",
              "md:ml-72", // Default sidebar width
              isSidebarCollapsed && "md:ml-12" // Collapsed sidebar width
            )}>
              <ChatHeader
                onNewChat={handleNewChat}
                isLoading={chatState.isLoading}
              />
              
              {/* Floating Model Selector Bubble */}
              <ModelBubble
                selectedModel={chatState.selectedModel}
                onModelChange={setModel}
                isLoading={chatState.isLoading}
                isSidebarCollapsed={isSidebarCollapsed}
              />
              
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <ChatMessages
                  messages={currentChat?.messages || []}
                  isLoading={chatState.isLoading}
                  onEditMessage={editMessage}
                  onSwitchVersion={switchMessageVersion}
                />
                
                <MessageInput
                  onSendMessage={sendMessage}
                  isLoading={chatState.isLoading}
                />
              </div>
            </div>
            
            <Toaster position="top-right" />
          </div>
        </AuthGuard>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<GitHubCallback />} />
        <Route path="/*" element={<ChatApp />} />
      </Routes>
    </Router>
  );
}

export default App;