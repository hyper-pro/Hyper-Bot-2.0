
import React from 'react';
import type { ChatMessage } from '../types';
import { LOGO_URL } from '../constants';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-4 my-4 ${isModel ? '' : 'flex-row-reverse'}`}>
      <div
        className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white
          ${isModel ? 'bg-slate-900' : 'bg-slate-700'}`}
      >
        {isModel ? <img src={LOGO_URL} alt="AI Avatar" className="w-full h-full rounded-full object-cover" /> : 'You'}
      </div>
      <div
        className={`p-4 rounded-xl max-w-2xl prose prose-invert prose-p:my-0
          ${isModel ? 'bg-slate-800' : 'bg-cyan-500/20'}`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessageComponent;