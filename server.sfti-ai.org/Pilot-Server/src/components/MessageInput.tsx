import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PaperPlaneTilt, Image as ImageIcon, X, File as FileIcon, Microphone, MicrophoneSlash } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MessageInputProps {
  onSendMessage: (content: string, imageUrl?: string, fileData?: { name: string; url: string; type: string }) => void;
  isLoading: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string; type: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  const handleSubmit = () => {
    if ((!message.trim() && !uploadedImage && !uploadedFile) || isLoading) return;
    
    onSendMessage(message, uploadedImage || undefined, uploadedFile || undefined);
    setMessage('');
    setUploadedImage(null);
    setUploadedFile(null);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '40px'; // Reset to min height
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea and container
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, window.innerWidth < 768 ? 200 : 300);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  // Check if the message contains complete code blocks
  const hasCompleteCodeBlocks = (text: string) => {
    const codeBlockMatches = text.match(/```/g);
    return codeBlockMatches && codeBlockMatches.length >= 2 && codeBlockMatches.length % 2 === 0;
  };

  // Check if we're currently inside a code block
  const isInCodeBlock = (text: string, cursorPosition: number) => {
    const beforeCursor = text.substring(0, cursorPosition);
    const codeBlockMatches = beforeCursor.match(/```/g);
    return codeBlockMatches && codeBlockMatches.length % 2 === 1;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      toast.error('File must be less than 25MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedFile({
        name: file.name,
        url: e.target?.result as string,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Voice-to-text functionality
  const startVoiceRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice recognition not supported in this browser');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.success('Voice recognition started');
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setMessage(prev => prev + (prev ? ' ' : '') + finalTranscript);
          // Auto-resize textarea
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const newHeight = Math.min(textareaRef.current.scrollHeight, window.innerWidth < 768 ? 200 : 300);
            textareaRef.current.style.height = `${newHeight}px`;
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error(`Voice recognition error: ${event.error}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      toast.error('Failed to start voice recognition');
      setIsListening(false);
    }
  }, []);

  const stopVoiceRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    toast.info('Voice recognition stopped');
  }, []);

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  // Cleanup voice recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="border-t bg-background/95 backdrop-blur-sm input-container">
      {(uploadedImage || uploadedFile) && (
        <div className="p-2 md:p-4 border-b space-y-2">
          {uploadedImage && (
            <div className="relative inline-block">
              <img 
                src={uploadedImage} 
                alt="Upload preview" 
                className="max-w-xs max-h-16 md:max-h-32 rounded-md md:rounded-lg border object-cover"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={removeImage}
                className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-4 w-4 md:h-6 md:w-6 rounded-full p-0"
              >
                <X className="w-2 h-2 md:w-3 md:h-3" />
              </Button>
            </div>
          )}
          
          {uploadedFile && (
            <div className="relative inline-flex items-center gap-2 bg-muted p-2 md:p-3 rounded-md md:rounded-lg border max-w-xs">
              <FileIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium truncate">{uploadedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="h-4 w-4 md:h-5 md:w-5 rounded-full p-0 ml-auto flex-shrink-0"
              >
                <X className="w-2 h-2 md:w-3 md:h-3" />
              </Button>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col gap-2 p-3 md:p-4">
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.7z"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        {/* Full width text input area */}
        <div className="relative w-full">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message... (Use ``` for code blocks)"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className={cn(
              "resize-none min-h-[40px] max-h-48 md:max-h-72 text-sm border-transparent focus:border-transparent focus:ring-0 bg-transparent transition-all w-full",
              hasCompleteCodeBlocks(message) ? "font-mono" : ""
            )}
            rows={1}
            style={{
              fontFamily: hasCompleteCodeBlocks(message) 
                ? "'JetBrains Mono', 'Courier New', monospace" 
                : "'Inter', system-ui, -apple-system, sans-serif"
            }}
          />
        </div>
        
        {/* Upload buttons and controls in same row */}
        <div className="flex items-center gap-2 md:gap-3 justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => imageInputRef.current?.click()}
              disabled={isLoading}
              className="flex-shrink-0 h-8 w-8 p-0"
              title="Upload Image"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="flex-shrink-0 h-8 w-8 p-0"
              title="Upload File"
            >
              <FileIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleVoiceRecognition}
              disabled={isLoading}
              className={cn(
                "flex-shrink-0 h-8 w-8 p-0 transition-all",
                isListening && "bg-red-500 text-white hover:bg-red-600"
              )}
              title={isListening ? "Stop Voice Recognition" : "Start Voice Recognition"}
            >
              {isListening ? (
                <MicrophoneSlash className="w-4 h-4" />
              ) : (
                <Microphone className="w-4 h-4" />
              )}
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={(!message.trim() && !uploadedImage && !uploadedFile) || isLoading}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 transition-all",
                (!message.trim() && !uploadedImage && !uploadedFile) || isLoading 
                  ? "opacity-50" 
                  : "opacity-100 hover:scale-105"
              )}
            >
              <PaperPlaneTilt className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}