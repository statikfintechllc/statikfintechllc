import { Button } from '@/components/ui/button';
import { Plus, Robot } from '@phosphor-icons/react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ModelPermissionStatus } from '@/components/ModelPermissionStatus';

interface ChatHeaderProps {
  onNewChat: () => void;
  isLoading: boolean;
}

export function ChatHeader({ onNewChat, isLoading }: ChatHeaderProps) {
  return (
    <div className="p-3 md:p-4 border-b bg-card/50 backdrop-blur-sm">
      <div className="flex items-center relative max-w-full">
        {/* Left spacing for mobile sidebar button */}
        <div className="w-12 md:w-0 flex-shrink-0" />
        
        {/* Centered Title with Status */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Robot className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
          <h1 className="text-base md:text-lg font-semibold text-center">Pilot Server</h1>
          <div className="hidden md:block">
            <ModelPermissionStatus />
          </div>
        </div>
        
        {/* Action buttons positioned on the right */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <ThemeToggle />
          <Button 
            onClick={onNewChat} 
            size="sm"
            disabled={isLoading}
            className="w-9 h-9 p-0 bg-primary/10 hover:bg-primary/20 border border-primary/20"
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}