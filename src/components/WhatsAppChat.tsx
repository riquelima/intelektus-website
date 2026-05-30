
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Paperclip, Send, Brain } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface WhatsAppChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppChat = ({ isOpen, onClose }: WhatsAppChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! 👋 Como posso te ajudar hoje?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse: Message = {
        text: 'Obrigado por sua mensagem! Nossa equipe entrará em contato em breve.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-5 z-50 w-[calc(100vw-32px)] sm:w-80 h-[360px] sm:h-[450px] bg-white rounded-lg shadow-2xl flex flex-col font-sans border border-slate-300">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-slate-800 text-white rounded-t-lg">
        <div className='flex items-center gap-3'>
          <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center">
            <Brain className="w-8 h-8 text-intelektus-600" />
          </div>
          <div>
            <h3 className="font-bold">Intelektus</h3>
            <p className='text-xs'>Online</p>
          </div>
        </div>
        <button onClick={onClose} className="font-bold text-xl hover:opacity-80 transition-opacity">&times;</button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[url('/tech-bg.png')] bg-opacity-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-3 py-2 max-w-[85%] shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-100'
                  : 'bg-white'
              }`}
            >
              <p className="text-sm text-gray-800">{msg.text}</p>
              <p className="text-right text-xs text-gray-400 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-2 bg-slate-100 flex items-center gap-2 border-t border-slate-200">
         <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-slate-200">
            <Paperclip className="w-5 h-5" />
          </Button>
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 rounded-full border-slate-300 focus:ring-2 focus:ring-slate-600 bg-white"
        />
        <Button onClick={handleSendMessage} className="bg-slate-700 hover:bg-slate-600 rounded-full w-10 h-10 p-2">
          <Send className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppChat;
