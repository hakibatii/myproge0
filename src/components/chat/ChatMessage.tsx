
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message, ChatUser } from "./types";
import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

interface ChatMessageProps {
  message: Message;
  chatUser: Pick<ChatUser, 'name' | 'avatar'>;
}

const ChatMessage = ({ message, chatUser }: ChatMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const toggleAudioPlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle audio ended event
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Format audio duration
  const formattedAudioDuration = typeof message.audioDuration === 'number' 
    ? `${Math.floor(message.audioDuration / 60)}:${(message.audioDuration % 60).toString().padStart(2, '0')}` 
    : message.audioDuration || '0:00';
    
  // Check if message contains only emojis to style it differently
  const isOnlyEmoji = (text: string) => {
    const emojiRegex = /^(\p{Emoji}|\s)+$/u;
    return emojiRegex.test(text);
  };
  
  // Determine if this is an emoji-only message
  const isEmojiMessage = !message.isAudioMessage && isOnlyEmoji(message.text);

  return (
    <div 
      className={`flex ${message.sentByMe ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {!message.sentByMe && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={chatUser.avatar} alt={chatUser.name} />
          <AvatarFallback>{chatUser.name[0]}</AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={`
          ${message.sentByMe 
            ? isEmojiMessage 
              ? 'bg-transparent' 
              : (message.isPaymentOption ? 'bg-morocco-gold' : 'bg-morocco-turquoise') 
            : 'bg-white dark:bg-gray-800'} 
          ${isEmojiMessage ? '' : 'rounded-2xl px-4 py-2 shadow-sm'}
          max-w-[80%]
        `}
      >
        {message.isPaymentOption && (
          <div className="bg-white/20 p-1 mb-2 rounded text-white text-center text-xs font-bold">
            طريقة الدفع المختارة
          </div>
        )}
        
        {message.isAudioMessage ? (
          <div className="flex items-center">
            {message.audioUrl && (
              <>
                <button 
                  onClick={toggleAudioPlayback}
                  className={`${message.sentByMe ? 'bg-white/20' : 'bg-morocco-turquoise/20'} p-2 rounded-full mr-2`}
                >
                  {isPlaying ? (
                    <Pause size={16} className={message.sentByMe ? 'text-white' : 'text-morocco-turquoise'} />
                  ) : (
                    <Play size={16} className={message.sentByMe ? 'text-white' : 'text-morocco-turquoise'} />
                  )}
                </button>
                
                <div className="flex-1">
                  <div 
                    className={`h-1 rounded-full ${message.sentByMe ? 'bg-white/30' : 'bg-morocco-turquoise/30'}`}
                  >
                    <div 
                      className={`h-1 rounded-full ${message.sentByMe ? 'bg-white' : 'bg-morocco-turquoise'}`}
                      style={{ width: isPlaying ? '50%' : '0%' }}
                    />
                  </div>
                  
                  <audio 
                    ref={audioRef}
                    src={message.audioUrl}
                    className="hidden"
                    onEnded={handleAudioEnded}
                  />
                </div>
                
                <span className={`text-xs ml-2 ${message.sentByMe ? 'text-white/70' : 'text-gray-500'}`}>
                  {formattedAudioDuration}
                </span>
              </>
            )}
          </div>
        ) : isEmojiMessage ? (
          <p className={`text-4xl ${message.sentByMe ? 'text-right' : 'text-left'}`}>
            {message.text}
          </p>
        ) : (
          <p className={message.sentByMe ? 'text-right text-white' : 'text-left'}>
            {message.text}
          </p>
        )}
        
        {!isEmojiMessage && (
          <p className={`text-xs mt-1 ${message.sentByMe ? 'text-right text-blue-100 dark:text-blue-200' : 'text-left text-gray-500'}`}>
            {message.timestamp}
          </p>
        )}
      </div>
      
      {message.sentByMe && isEmojiMessage && (
        <span className="text-xs text-gray-500 self-end ml-1">
          {message.timestamp}
        </span>
      )}
    </div>
  );
};

export default ChatMessage;
