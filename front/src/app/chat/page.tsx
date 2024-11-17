"use client"

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import Documents from '@/components/documents';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function MistralChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const streamingMessageRef = useRef('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError('');
        streamingMessageRef.current = '';

        try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            messages: [...messages, userMessage]
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to get response');
        }

        if (!response.body) {
            throw new Error('No response body');
        }

        // Create a temporary assistant message for streaming
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        // Create a reader to read the stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            
            if (done) {
            break;
            }

            // Decode the stream chunk and update the last message
            const chunk = decoder.decode(value);
            streamingMessageRef.current += chunk;
            setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
                role: 'assistant',
                content: streamingMessageRef.current
            };
            return newMessages;
            });
        }
        } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="flex flex-row items-center justify-center text-center w-full min-w-full">
            <Documents />
            <div className="flex flex-col h-screen mx-auto p-4 w-full min-w-full">
                <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="w-6 h-6" />
                    <h1 className="text-2xl font-bold">Paralegal Chat</h1>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-auto mb-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                    {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                        className={`max-w-full rounded-lg p-4 ${
                            message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                        >
                        <div className="flex items-center space-x-2 mb-2">
                            {message.role === 'user' ? (
                            <User className="w-4 h-4" />
                            ) : (
                            <MessageCircle className="w-4 h-4" />
                            )}
                            <span className="font-medium capitalize">{message.role}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                    </div>
                    ))}
                    {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[80%]">
                        <div className="animate-pulse">▊</div>
                        </div>
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                    </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                    />
                    <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending...' : 'Send'}</span>
                    </button>
                </form>
            </div>
        </div>
    )
}