import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CaretDown, Cpu, Warning, Lock } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/badge';
import { AIModel } from '@/lib/types';
import { useAuth, AVAILABLE_GITHUB_MODELS } from '@/hooks/use-auth';
import { memo, useCallback, useRef, useEffect } from 'react';

interface ModelBubbleProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  isLoading: boolean;
  isSidebarCollapsed: boolean;
}

export const ModelBubble = memo(function ModelBubble({ selectedModel, onModelChange, isLoading, isSidebarCollapsed }: ModelBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { authState, availableModels } = useAuth();
  
  const modelDisplayNames: Record<string, string> = {
    // OpenAI Models
    'gpt-4o': 'GPT-4o',
    'gpt-4o-mini': 'GPT-4o Mini',
    'gpt-4': 'GPT-4',
    'gpt-3.5-turbo': 'GPT-3.5 Turbo',
    // Anthropic Models
    'claude-3-5-sonnet-20241022': 'Claude 3.5 Sonnet',
    'claude-3-opus-20240229': 'Claude 3 Opus',
    'claude-3-sonnet-20240229': 'Claude 3 Sonnet',
    'claude-3-haiku-20240307': 'Claude 3 Haiku',
    // Meta Models
    'llama-3.1-405b-instruct': 'Llama 3.1 405B',
    'llama-3.1-70b-instruct': 'Llama 3.1 70B',
    'llama-3.1-8b-instruct': 'Llama 3.1 8B',
    // Google Models
    'gemini-1.5-pro': 'Gemini 1.5 Pro',
    'gemini-1.5-flash': 'Gemini 1.5 Flash',
    // Microsoft Models
    'phi-3-medium-4k-instruct': 'Phi-3 Medium',
    'phi-3-mini-4k-instruct': 'Phi-3 Mini',
    // Cohere Models
    'command-r': 'Command R',
    'command-r-plus': 'Command R+',
    // Mistral Models
    'mistral-large': 'Mistral Large',
    'mistral-small': 'Mistral Small'
  };

  // Debounce resize observer to prevent loops
  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    let timeoutId: NodeJS.Timeout;
    let isObserving = false;
    
    const resizeObserver = new ResizeObserver((entries) => {
      if (isObserving) return; // Prevent nested calls
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isObserving = true;
        try {
          // Process resize entries here if needed
          // Minimal processing to prevent loops
        } catch (error) {
          // Silently handle any errors
        } finally {
          isObserving = false;
        }
      }, 32); // Debounce to prevent rapid firing
    });

    try {
      resizeObserver.observe(element);
    } catch (error) {
      // Silently handle observation errors
    }

    return () => {
      clearTimeout(timeoutId);
      isObserving = false;
      try {
        resizeObserver.disconnect();
      } catch (error) {
        // Silently handle disconnection errors
      }
    };
  }, []);

  // Use callback to prevent unnecessary re-renders
  const handleModelChange = useCallback((value: string) => {
    onModelChange(value as AIModel);
  }, [onModelChange]);

  // Get available models based on auth state and properly filter
  const getAvailableModelOptions = () => {
    if (availableModels.length === 0) {
      // Use GitHub Models from the auth hook as fallback
      return AVAILABLE_GITHUB_MODELS;
    }
    return availableModels;
  };

  const availableModelOptions = getAvailableModelOptions();
  const currentModel = availableModelOptions.find(model => model.id === selectedModel);
  const isCurrentModelAvailable = !!currentModel;

  return (
    <div 
      ref={containerRef}
      className={`
        absolute top-20 z-50 model-bubble-container resize-stable
        inset-x-0 flex justify-center
        md:left-[47%] md:transform md:-translate-x-1/2 md:right-auto md:inset-x-auto
      `}
      style={{ 
        contain: 'layout size style',
        willChange: 'auto',
        isolation: 'isolate',
        transform: 'translateZ(0)'
      }}
    >
      <div className="w-fit" style={{ contain: 'layout' }}>
      <Select 
        value={selectedModel} 
        onValueChange={handleModelChange}
        disabled={isLoading}
      >
        <SelectTrigger 
          className={`
            bg-card/95 backdrop-blur-xl border border-border/30 rounded-full
            shadow-lg hover:shadow-xl transition-all duration-200
            px-4 py-2 min-w-[180px] h-9
            ${isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}
            hover:bg-card active:scale-[0.98] group focus:ring-2 focus:ring-primary/50 focus:ring-offset-0
          `}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <Cpu className={`w-4 h-4 text-primary transition-colors duration-200 ${
                isLoading ? 'animate-pulse' : 'group-hover:text-primary/80'
              }`} />
              {isLoading && (
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              )}
            </div>
            
            <span className="text-sm font-medium text-foreground/90 whitespace-nowrap flex-1 truncate">
              {modelDisplayNames[selectedModel] || selectedModel}
              {!isCurrentModelAvailable && (
                <span className="text-orange-500 ml-1">(Unavailable)</span>
              )}
            </span>

            {!isCurrentModelAvailable && (
              <Warning className="w-3 h-3 text-orange-500" />
            )}

            {!authState.isAuthenticated && availableModelOptions.length < 6 && (
              <Lock className="w-3 h-3 text-muted-foreground" />
            )}
            
            <CaretDown 
              className="w-3.5 h-3.5 text-muted-foreground transition-all duration-200 group-hover:text-foreground/70 group-data-[state=open]:rotate-180 flex-shrink-0" 
            />
          </div>
        </SelectTrigger>
        
        <SelectContent 
          className="min-w-[200px] rounded-xl border-border/50 bg-card/95 backdrop-blur-xl resize-stable"
          sideOffset={8}
          style={{ contain: 'layout style' }}
        >
          {availableModelOptions.map((model) => (
            <SelectItem 
              key={model.id} 
              value={model.id} 
              className="text-sm rounded-lg focus:bg-accent/50 p-3"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{model.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {model.provider}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {(model.context_length / 1000).toFixed(0)}k tokens
                    {model.supports_vision && " • Vision"}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
          
          {!authState.isAuthenticated && availableModelOptions.length < 10 && (
            <div className="p-3 border-t border-border/50 mt-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>Sign in to access {AVAILABLE_GITHUB_MODELS.length - availableModelOptions.length} more models</span>
              </div>
            </div>
          )}
        </SelectContent>
      </Select>
      </div>
    </div>
  );
});