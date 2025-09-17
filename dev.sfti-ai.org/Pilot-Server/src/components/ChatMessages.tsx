import { useEffect, useRef, useCallback } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { Message } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onEditMessage?: (messageId: string, newContent: string) => Promise<void> | void;
  onSwitchVersion?: (messageId: string, versionIndex: number) => void;
}

export function ChatMessages({ messages, isLoading, onEditMessage, onSwitchVersion }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        try {
          messagesEndRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
          });
        } catch (error) {
          // Silently handle scroll errors including ResizeObserver
          if (!(error instanceof Error && error.message.includes('ResizeObserver'))) {
            console.debug('Scroll error (non-critical):', error);
          }
        }
      });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [messages, isLoading, scrollToBottom]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 pt-20 md:pt-24 min-h-0">
        <div className="text-center space-y-3 md:space-y-4 max-w-md">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-2xl md:text-3xl">🚀</span>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Start a conversation</h3>
            <p className="text-muted-foreground text-sm md:text-base mt-1 px-2 md:px-4">
              Ask me anything! I can help with code, analysis, explanations, and more.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center px-2 md:px-4">
            <span className="px-3 py-1 bg-muted rounded-full text-xs md:text-sm">Write code</span>
            <span className="px-3 py-1 bg-muted rounded-full text-xs md:text-sm">Debug issues</span>
            <span className="px-3 py-1 bg-muted rounded-full text-xs md:text-sm">Explain concepts</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <ScrollArea className="flex-1 h-full scroll-container" ref={scrollAreaRef}>
        <div className="space-y-0 p-2 md:p-4 pt-16 md:pt-20 pb-4 w-full" style={{
          maxWidth: 'none',
          maxHeight: 'none',
          overflow: 'visible'
        }}>
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              onEdit={message.role === 'user' ? onEditMessage : undefined}
              onSwitchVersion={onSwitchVersion}
            />
          ))}
          
          {isLoading && (
            <div className="p-2 md:p-6">
              <div className="w-full relative">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-primary animate-spin" />
                  <span className="text-sm md:text-base">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
}