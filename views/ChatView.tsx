
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { createChat } from '../services/geminiService';
import type { ChatMessage } from '../types';
import ChatMessageComponent from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const ChatView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current = createChat();
        setMessages([{
            role: 'model',
            content: "Hello! I'm Hyper Bot 2.0. How can I help you today?"
        }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: input });

            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage.role === 'model') {
                        const updatedMessages = [...prev];
                        updatedMessages[prev.length - 1] = {
                            ...lastMessage,
                            content: lastMessage.content + chunkText,
                        };
                        return updatedMessages;
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', content: 'Sorry, something went wrong. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                {messages.map((msg, index) => (
                    <ChatMessageComponent key={index} message={msg} />
                ))}
                {isLoading && messages[messages.length-1].role === 'user' && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white bg-gradient-to-br from-cyan-500 to-violet-600">AI</div>
                            <div className="p-4 bg-slate-800 rounded-xl">
                                <LoadingSpinner className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
                <form onSubmit={handleSendMessage} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-16 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow"
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatView;