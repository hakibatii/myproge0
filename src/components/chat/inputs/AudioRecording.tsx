
import { useState, useRef, useEffect } from 'react';
import { Mic, X, Trash, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface AudioRecordingProps {
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  recordingTime: number;
  setRecordingTime: (time: number | ((prevTime: number) => number)) => void;
  audioBlob: Blob | null;
  setAudioBlob: (blob: Blob | null) => void;
  readyToSendAudio: boolean;
  setReadyToSendAudio: (ready: boolean) => void;
  handleSendAudio: (audioBlob: Blob, duration: number) => void;
}

export const AudioRecording = ({
  isRecording,
  setIsRecording,
  recordingTime,
  setRecordingTime,
  audioBlob,
  setAudioBlob,
  readyToSendAudio,
  setReadyToSendAudio,
  handleSendAudio
}: AudioRecordingProps) => {
  const { t } = useLanguage();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Clear timer when component unmounts
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const newAudioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        setAudioBlob(newAudioBlob);
        
        const url = URL.createObjectURL(newAudioBlob);
        setAudioUrl(url);
        
        setReadyToSendAudio(true);
        setRecordingTime(0);
        
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      
      toast({
        description: t("recording_started"),
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        description: "لا يمكن الوصول إلى الميكروفون. يرجى التحقق من أذونات المتصفح.",
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear timer
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleSendAudioFile = () => {
    if (audioBlob && readyToSendAudio) {
      handleSendAudio(audioBlob, recordingTime);
      setAudioBlob(null);
      setAudioUrl(null);
      setReadyToSendAudio(false);
      
      toast({
        description: t("recording_sent"),
      });
    }
  };
  
  const handleDeleteAudioFile = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setReadyToSendAudio(false);
    
    toast({
      description: t("delete_recording"),
    });
  };
  
  const handlePlayAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };
  
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isRecording) {
    return (
      <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 rounded-full p-2 px-4 mb-2">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-red-500 dark:text-red-400 text-sm">{t("recording")} {formatRecordingTime(recordingTime)}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full text-red-500 hover:text-red-700 dark:hover:text-red-300 p-2"
          onClick={handleStopRecording}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  if (readyToSendAudio && audioBlob) {
    return (
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-full p-2 px-4 mb-2">
        <div className="flex items-center cursor-pointer" onClick={handlePlayAudio}>
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-blue-500 dark:text-blue-400 text-sm">
            {formatRecordingTime(recordingTime)}
          </span>
          {audioUrl && (
            <audio ref={audioRef} src={audioUrl} className="hidden" />
          )}
        </div>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full text-red-500 hover:text-red-700 dark:hover:text-red-300 p-2"
            onClick={handleDeleteAudioFile}
          >
            <Trash className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full text-green-500 hover:text-green-700 dark:hover:text-green-300 p-2"
            onClick={handleSendAudioFile}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  // If we're not in either of the active states, we don't show this component
  // (the mic button is part of MessageInput component)
  if (!isRecording && !readyToSendAudio) {
    useEffect(() => {
      // Initialize recording if needed
      if (isRecording && !mediaRecorderRef.current) {
        handleStartRecording();
      }
    }, [isRecording]);
  }

  return null;
};

export default AudioRecording;
