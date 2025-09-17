import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SettingsDialog } from '@/components/SettingsDialog';
import { Chat } from '@/lib/types';
import { ChatText, Trash, List, X, CaretLeft, CaretRight, Gear } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
  onSidebarCollapse?: (isCollapsed: boolean) => void;
}

export function ChatSidebar({ 
  chats, 
  currentChatId, 
  onSelectChat, 
  onDeleteChat, 
  onNewChat,
  onSidebarCollapse
}: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const handleDesktopCollapse = (collapsed: boolean) => {
    setIsDesktopCollapsed(collapsed);
    onSidebarCollapse?.(collapsed);
  };

  const sortedChats = [...chats].sort((a, b) => b.lastUpdated - a.lastUpdated);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const handleSelectChat = (chatId: string) => {
    onSelectChat(chatId);
    setIsOpen(false);
  };

  const ChatList = () => (
    <>
      {sortedChats.length === 0 ? (
        <div className="text-center py-8 px-4 text-muted-foreground">
          <ChatText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium mb-1">No conversations yet</p>
          <p className="text-xs opacity-70">Start a new chat to begin</p>
        </div>
      ) : (
        <div className="space-y-1">
          {sortedChats.map((chat) => (
            <div key={chat.id} className="group relative">
              <Button
                variant={currentChatId === chat.id ? "secondary" : "ghost"}
                onClick={() => handleSelectChat(chat.id)}
                className={cn(
                  "w-full justify-start text-left h-auto p-2.5 group-hover:pr-10 transition-all",
                  "min-h-[44px]",
                  currentChatId === chat.id && "bg-secondary/80 border border-secondary"
                )}
                title={chat.title}
              >
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="font-medium text-sm leading-tight truncate pr-2">
                    {chat.title}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {formatDate(chat.lastUpdated)} • {chat.messages.length} msg{chat.messages.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 hover:bg-destructive hover:text-destructive-foreground"
                title="Delete chat"
              >
                <Trash className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn("flex flex-col h-full", isMobile ? "max-h-[100dvh]" : "max-h-full")}>
      {/* New Chat Button */}
      <div className={cn("flex-shrink-0 border-b bg-background/95", isMobile ? "p-4" : "p-3")}>
        <Button 
          onClick={() => {
            onNewChat();
            setIsOpen(false);
          }} 
          className={cn("w-full justify-start gap-2.5 text-sm font-medium", isMobile ? "h-11" : "h-9")}
        >
          <ChatText className="w-4 h-4" />
          New Chat
        </Button>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {isMobile ? (
          <div className="h-full overflow-auto p-3">
            <ChatList />
          </div>
        ) : (
          <div className="h-full overflow-auto p-2.5">
            <ChatList />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="fixed top-3 left-3 z-50 shadow-lg h-9 w-9 p-0 bg-background/95 backdrop-blur-sm border-border/50"
              aria-label="Open chat history"
            >
              <List className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[85vw] max-w-[350px] p-0 border-r-2 border-border/20 flex flex-col h-full overflow-hidden"
          >
            <SheetHeader className="flex-shrink-0 p-4 pb-3 border-b bg-background/95 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <SheetTitle className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">Chat History</SheetTitle>
                <div></div> {/* Empty space to balance layout */}
              </div>
            </SheetHeader>
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              <div className="flex-1 min-h-0 overflow-hidden">
                <SidebarContent isMobile={true} />
              </div>
              {/* Settings button at bottom left with proper padding */}
              <div className="flex-shrink-0 p-4 pt-3 border-t bg-background/95 backdrop-blur-sm">
                <SettingsDialog 
                  trigger={
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2.5 text-sm font-medium h-9"
                    >
                      <Gear className="w-4 h-4" />
                      Settings
                    </Button>
                  }
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:flex bg-card/50 backdrop-blur-sm flex-col border-r transition-all duration-300 fixed left-0 top-0 h-full z-10",
        isDesktopCollapsed ? "w-12" : "w-72"
      )}>
        {isDesktopCollapsed ? (
          // Collapsed Desktop Sidebar
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 p-3 border-b bg-background/95">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDesktopCollapse(false)}
                className="w-full h-9 p-0"
                title="Expand sidebar"
              >
                <CaretRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 p-2 overflow-y-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNewChat}
                className="w-8 h-8 p-0"
                title="New Chat"
              >
                <ChatText className="w-4 h-4" />
              </Button>
              {sortedChats.slice(0, 8).map((chat) => (
                <Button
                  key={chat.id}
                  variant={currentChatId === chat.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "w-8 h-8 p-0 text-xs",
                    currentChatId === chat.id && "bg-secondary"
                  )}
                  title={chat.title}
                >
                  {chat.title.slice(0, 2).toUpperCase()}
                </Button>
              ))}
            </div>
            
            {/* Settings button at bottom left */}
            <div className="flex-shrink-0 p-2 border-t bg-background/95">
              <SettingsDialog 
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                    title="Settings"
                  >
                    <Gear className="w-4 h-4" />
                  </Button>
                }
              />
            </div>
          </div>
        ) : (
          // Expanded Desktop Sidebar
          <div className="desktop-sidebar-content h-full flex flex-col">
            <div className="flex-shrink-0 p-3 border-b bg-background/95 flex items-center justify-between">
              <span className="text-sm font-semibold">Conversations</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDesktopCollapse(true)}
                className="h-7 w-7 p-0"
                title="Collapse sidebar"
              >
                <CaretLeft className="w-4 h-4" />
              </Button>
            </div>
            
            {/* New Chat Button */}
            <div className="flex-shrink-0 border-b bg-background/95 p-3">
              <Button 
                onClick={() => {
                  onNewChat();
                  setIsOpen(false);
                }} 
                className="w-full justify-start gap-2.5 text-sm font-medium h-9"
              >
                <ChatText className="w-4 h-4" />
                New Chat
              </Button>
            </div>
            
            {/* Chat List */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <div className="h-full overflow-auto p-2.5 desktop-sidebar-scroll">
                <ChatList />
              </div>
            </div>
            
            {/* Settings button at bottom left */}
            <div className="flex-shrink-0 border-t bg-background/95 p-3">
              <SettingsDialog 
                trigger={
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-2.5 text-sm font-medium h-9"
                  >
                    <Gear className="w-4 h-4" />
                    Settings
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}