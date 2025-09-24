import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, PencilSimple, X, FloppyDisk, CaretLeft, CaretRight, File as FileIcon } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useRef, useEffect } from 'react';
import { useThemeContext } from '@/components/ThemeProvider';

interface MessageBubbleProps {
  message: Message;
  onEdit?: (messageId: string, newContent: string) => Promise<void> | void;
  onSwitchVersion?: (messageId: string, versionIndex: number) => void;
}

export function MessageBubble({ message, onEdit, onSwitchVersion }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const { theme } = useThemeContext();
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const [isEditingLoading, setIsEditingLoading] = useState(false);

  const handleEdit = async () => {
    if (!onEdit) return;
    
    if (editContent.trim() && editContent !== message.content) {
      setIsEditingLoading(true);
      try {
        await onEdit(message.id, editContent.trim());
        toast.success('Message updated - generating new response...');
        setIsEditing(false);
      } catch (error) {
        toast.error('Failed to update message');
        console.error('Edit error:', error);
      } finally {
        setIsEditingLoading(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };
  
  const copyToClipboard = async (text: string, codeId?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (codeId) {
        setCopiedCodeId(codeId);
        setTimeout(() => setCopiedCodeId(null), 2000);
      } else {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      }
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatEditTimestamp = (timestamp: number, editedAt?: number) => {
    const time = formatTimestamp(timestamp);
    if (editedAt) {
      const editTime = formatTimestamp(editedAt);
      return `${time} (edited ${editTime})`;
    }
    return time;
  };

  const handleVersionSwitch = (direction: 'prev' | 'next') => {
    if (!onSwitchVersion || !message.versions) return;
    
    const currentIndex = message.currentVersionIndex ?? 0;
    const maxIndex = message.versions.length - 1;
    
    if (direction === 'prev' && currentIndex > 0) {
      onSwitchVersion(message.id, currentIndex - 1);
    } else if (direction === 'next' && currentIndex < maxIndex) {
      onSwitchVersion(message.id, currentIndex + 1);
    }
  };

  const renderVersionSelector = () => {
    if (!message.versions || message.versions.length <= 1) return null;
    
    const currentIndex = message.currentVersionIndex ?? 0;
    const totalVersions = message.versions.length;
    
    return (
      <div className="flex items-center gap-1 text-xs opacity-70">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVersionSwitch('prev')}
          disabled={currentIndex === 0}
          className="h-4 w-4 p-0 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 disabled:opacity-30"
          title="Previous version"
        >
          <CaretLeft className="w-2.5 h-2.5" />
        </Button>
        <span className="text-xs font-medium min-w-[24px] text-center">
          {currentIndex + 1}/{totalVersions}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVersionSwitch('next')}
          disabled={currentIndex === totalVersions - 1}
          className="h-4 w-4 p-0 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 disabled:opacity-30"
          title="Next version"
        >
          <CaretRight className="w-2.5 h-2.5" />
        </Button>
      </div>
    );
  };

  const renderContent = (content: string) => {
    // NEVER truncate content - render everything regardless of length
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    
    let processedContent = content;
    const codeBlocks: { match: string; language: string; code: string; id: string }[] = [];
    
    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const id = `code-${Date.now()}-${Math.random()}`;
      const language = match[1] || 'text';
      const code = match[2]; // Don't trim - preserve all whitespace
      codeBlocks.push({ match: match[0], language, code, id });
    }
    
    // Split content into code blocks and text
    const parts = processedContent.split(codeBlockRegex);
    const result: React.ReactNode[] = [];
    
    for (let i = 0; i < parts.length; i += 3) {
      if (parts[i]) {
        const textPart = parts[i];
        if (textPart) {
          result.push(
            <div key={`text-${i}`} className="formatted-content w-full overflow-visible" style={{
              maxWidth: 'none',
              maxHeight: 'none',
              width: '100%',
              overflow: 'visible'
            }}>
              {formatTextContent(textPart)}
            </div>
          );
        }
      }
      
      if (parts[i + 1] !== undefined && parts[i + 2] !== undefined) {
        const language = parts[i + 1] || 'text';
        const code = parts[i + 2];
        const codeId = `code-${i}-${Date.now()}`;
        const syntaxTheme = theme === 'dark' ? oneDark : oneLight;
        
        result.push(
          <div key={`code-${i}`} className="my-2 md:my-4 rounded-md md:rounded-lg border bg-muted/30 w-full" style={{
            maxWidth: 'none',
            overflow: 'visible'
          }}>
            <div className="flex items-center justify-between px-2 md:px-3 py-1.5 md:py-2 bg-muted/50 border-b">
              <span className="text-xs font-medium text-muted-foreground uppercase">
                {language}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(code, codeId)}
                className="h-5 md:h-6 px-1.5 md:px-2 text-xs hover:bg-muted/60"
              >
                {copiedCodeId === codeId ? (
                  <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" />
                ) : (
                  <Copy className="w-2.5 h-2.5 md:w-3 md:h-3" />
                )}
              </Button>
            </div>
            <div className="w-full" style={{ maxWidth: 'none', overflow: 'visible' }}>
              <SyntaxHighlighter
                language={language.toLowerCase()}
                style={syntaxTheme}
                customStyle={{
                  margin: 0,
                  padding: '8px 12px',
                  background: 'transparent',
                  fontSize: '11px',
                  lineHeight: '1.3',
                  maxWidth: 'none',
                  width: '100%',
                  overflow: 'visible',
                  maxHeight: 'none'
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxWidth: 'none',
                    width: '100%'
                  }
                }}
                showLineNumbers={false}
                wrapLines={true}
                wrapLongLines={true}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      }
    }
    
    return result.length > 0 ? result : <div className="formatted-content w-full overflow-visible" style={{
      maxWidth: 'none',
      maxHeight: 'none',
      width: '100%',
      overflow: 'visible'
    }}>{formatTextContent(content)}</div>;
  };

  const formatTextContent = (text: string) => {
    // Split by double newlines to create paragraphs - no content limits
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map((paragraph, pIndex) => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) return null;

      // Check for headers (lines starting with #)
      if (trimmedParagraph.startsWith('#')) {
        const headerMatch = trimmedParagraph.match(/^(#{1,6})\s*(.+)/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const headerText = headerMatch[2];
          const HeaderTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
          return (
            <HeaderTag key={pIndex} className={cn(
              "font-semibold mt-4 mb-2 first:mt-0 w-full",
              level === 1 && "text-lg md:text-xl",
              level === 2 && "text-base md:text-lg",
              level >= 3 && "text-sm md:text-base"
            )} style={{ maxWidth: 'none', overflow: 'visible' }}>
              {formatInlineText(headerText)}
            </HeaderTag>
          );
        }
      }

      // Check for bullet points (lines starting with - or *)
      const lines = trimmedParagraph.split('\n');
      const isList = lines.every(line => line.trim().match(/^[-*]\s+/) || line.trim() === '');
      
      if (isList) {
        const listItems = lines
          .filter(line => line.trim().match(/^[-*]\s+/))
          .map((line, index) => {
            const content = line.replace(/^[-*]\s+/, '').trim();
            return (
              <li key={index} className="mb-1 leading-relaxed w-full" style={{ maxWidth: 'none', overflow: 'visible' }}>
                {formatInlineText(content)}
              </li>
            );
          });
        
        return (
          <ul key={pIndex} className="list-disc list-inside space-y-1 my-2 pl-2 w-full" style={{ maxWidth: 'none', overflow: 'visible' }}>
            {listItems}
          </ul>
        );
      }

      // Check for numbered lists
      const isNumberedList = lines.every(line => line.trim().match(/^\d+\.\s+/) || line.trim() === '');
      
      if (isNumberedList) {
        const listItems = lines
          .filter(line => line.trim().match(/^\d+\.\s+/))
          .map((line, index) => {
            const content = line.replace(/^\d+\.\s+/, '').trim();
            return (
              <li key={index} className="mb-1 leading-relaxed w-full" style={{ maxWidth: 'none', overflow: 'visible' }}>
                {formatInlineText(content)}
              </li>
            );
          });
        
        return (
          <ol key={pIndex} className="list-decimal list-inside space-y-1 my-2 pl-2 w-full" style={{ maxWidth: 'none', overflow: 'visible' }}>
            {listItems}
          </ol>
        );
      }

      // Regular paragraph - no length constraints
      return (
        <p key={pIndex} className="mb-3 leading-relaxed last:mb-0 w-full" style={{ maxWidth: 'none', overflow: 'visible' }}>
          {formatInlineText(trimmedParagraph)}
        </p>
      );
    }).filter(Boolean);
  };

  const formatInlineText = (text: string) => {
    const inlineCodeRegex = /`([^`]+)`/g;
    const parts = text.split(inlineCodeRegex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is inline code
        return (
          <code key={index} className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">
            {part}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className={cn(
      "py-3 md:py-4 px-2 md:px-4 min-h-0 w-full border-b border-border/10",
      isUser ? "flex justify-end" : ""
    )} style={!isUser ? {
      maxWidth: 'none',
      maxHeight: 'none',
      overflow: 'visible',
      width: '100%'
    } : undefined}>
      {isUser ? (
        // User message with bubble
        <div className={cn(
          "max-w-[90%] md:max-w-[75%] lg:max-w-[65%] rounded-lg md:rounded-2xl px-3 md:px-4 py-2 md:py-3 relative group",
          "bg-primary text-primary-foreground"
        )}>
          {message.imageUrl && (
            <div className="mb-2 md:mb-3">
              <img 
                src={message.imageUrl} 
                alt="Uploaded content"
                className="max-w-full h-auto rounded-lg border"
              />
            </div>
          )}
          
          {message.fileData && (
            <div className="mb-2 md:mb-3">
              <div className="flex items-center gap-2 bg-primary-foreground/10 p-2 md:p-3 rounded-lg border border-primary-foreground/20">
                <FileIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium truncate">{message.fileData.name}</p>
                  <p className="text-xs opacity-70">{message.fileData.type}</p>
                </div>
              </div>
            </div>
          )}
          
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                ref={textareaRef}
                value={editContent}
                onChange={(e) => {
                  setEditContent(e.target.value);
                  if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                  }
                }}
                className="min-h-[60px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 resize-none text-xs md:text-sm"
                placeholder="Edit your message..."
              />
              <div className="flex justify-end gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleCancelEdit}
                  className="h-6 px-2 text-xs"
                >
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleEdit}
                  disabled={isEditingLoading}
                  className="h-6 px-2 text-xs bg-primary-foreground text-primary hover:bg-primary-foreground/90 disabled:opacity-50"
                >
                  {isEditingLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <FloppyDisk className="w-3 h-3 mr-1" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-xs md:text-sm leading-relaxed break-words whitespace-pre-wrap w-full" style={{
              maxWidth: 'none',
              maxHeight: 'none',
              overflow: 'visible',
              wordWrap: 'break-word',
              overflowWrap: 'anywhere'
            }}>
              {renderContent(message.content)}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary-foreground/20 text-xs opacity-60">
            <span className="truncate">
              {formatEditTimestamp(message.timestamp, message.editedAt)}
            </span>
            <div className="flex items-center gap-2">
              {renderVersionSelector()}
              {!isEditing && onEdit && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(message.content)}
                    className="h-4 w-4 p-0 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    {copiedMessage ? (
                      <Check className="w-2.5 h-2.5 text-green-400" />
                    ) : (
                      <Copy className="w-2.5 h-2.5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-4 w-4 p-0 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <PencilSimple className="w-2.5 h-2.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // AI message without bubble, part of background - completely unconstrained
        <div className="w-full relative group desktop-chat-container">
          {message.imageUrl && (
            <div className="mb-3 md:mb-4">
              <img 
                src={message.imageUrl} 
                alt="Uploaded content"
                className="max-w-full h-auto rounded-lg border"
              />
            </div>
          )}
          
          {/* Completely unconstrained AI message content with no limits */}
          <div className="text-sm md:text-base leading-relaxed text-foreground w-full overflow-visible" style={{
            maxWidth: 'none',
            maxHeight: 'none',
            height: 'auto',
            width: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'anywhere',
            whiteSpace: 'pre-wrap',
            overflow: 'visible'
          }}>
            {renderContent(message.content)}
          </div>
          
          <div className="flex items-center justify-between mt-3 md:mt-4 pt-2 border-t border-border/30 text-xs opacity-60">
            <span className="truncate">{formatTimestamp(message.timestamp)}</span>
            {message.model && (
              <span className="font-medium hidden sm:inline text-xs">{message.model}</span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(message.content)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
          >
            {copiedMessage ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}