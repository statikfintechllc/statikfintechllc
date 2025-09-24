import { Shield, Warning, CheckCircle, Lock } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/badge';
import { useAuth, AVAILABLE_GITHUB_MODELS } from '@/hooks/use-auth';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

export function ModelPermissionStatus() {
  const { authState, availableModels } = useAuth();
  
  const totalModels = AVAILABLE_GITHUB_MODELS.length;
  const availableCount = availableModels.length;
  const hasFullAccess = availableCount >= totalModels * 0.8; // 80% threshold for "full access"
  
  const getStatusInfo = () => {
    if (!authState.isAuthenticated) {
      return {
        icon: Lock,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 border-yellow-200',
        status: 'Limited Access',
        description: `${availableCount}/${totalModels} models available. Sign in for full access.`
      };
    }
    
    if (hasFullAccess) {
      return {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-100 border-green-200',
        status: 'Full Access',
        description: `${availableCount}/${totalModels} models available through GitHub.`
      };
    }
    
    return {
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 border-blue-200',
      status: 'Standard Access',
      description: `${availableCount}/${totalModels} models available. Some premium models may be restricted.`
    };
  };
  
  const statusInfo = getStatusInfo();
  const Icon = statusInfo.icon;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`${statusInfo.bgColor} ${statusInfo.color} border text-xs px-2 py-1 cursor-help`}
          >
            <Icon className="w-3 h-3 mr-1" />
            {statusInfo.status}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="text-sm">{statusInfo.description}</p>
          {!authState.isAuthenticated && (
            <p className="text-xs text-muted-foreground mt-1">
              Connect GitHub to unlock Claude, Llama, Gemini, and more.
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}