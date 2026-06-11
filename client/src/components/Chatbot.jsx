import React, { useRef, useState } from 'react';

const initialMessages = [
    {
        role: 'bot',
        text: 'Hello! I am the INDIGOST assistant. How can I help you today?',
    },
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToLatest = () => {
        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
    };

    const sendMessage = async (event) => {
        event.preventDefault();

        const cleanMessage = message.trim();
        if (!cleanMessage || isLoading) {
            return;
        }

        setMessage('');
        setIsLoading(true);
        setMessages((current) => [...current, { role: 'user', text: cleanMessage }]);
        scrollToLatest();

        try {
            const conversationHistory = messages
                .filter((item) => item.text && item.role !== 'system')
                .slice(-8);
            const response = await fetch('/chatbot/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: cleanMessage,
                    history: conversationHistory,
                }),
            });
            const data = await response.json();

            setMessages((current) => [
                ...current,
                {
                    role: 'bot',
                    text: data.reply || 'Chatbot is temporarily unavailable. Please contact our team for more details.',
                },
            ]);
        } catch {
            setMessages((current) => [
                ...current,
                {
                    role: 'bot',
                    text: 'Chatbot is temporarily unavailable. Please try again later or contact our team for more details.',
                },
            ]);
        } finally {
            setIsLoading(false);
            scrollToLatest();
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[60] font-body">
            {isOpen && (
                <div className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-900/20">
                    <div className="flex items-center justify-between bg-deep-indigo px-4 py-3 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-white shadow-md">
                                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold leading-tight">INDIGOST Assistant</p>
                                <p className="text-xs text-indigo-100">Company support</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="flex size-9 items-center justify-center rounded-lg text-indigo-100 transition-colors hover:bg-white/10 hover:text-white"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chatbot"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>

                    <div className="flex h-80 flex-col gap-3 overflow-y-auto bg-background-light p-4">
                        {messages.map((item, index) => (
                            <div
                                key={`${item.role}-${index}`}
                                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed shadow-sm ${item.role === 'user'
                                    ? 'ml-auto bg-primary text-white'
                                    : 'mr-auto border border-indigo-100 bg-white text-text-main'
                                    }`}
                            >
                                {item.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="mr-auto rounded-xl border border-indigo-100 bg-white px-3 py-2 text-sm text-text-muted shadow-sm">
                                Typing...
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <form className="flex gap-2 border-t border-indigo-100 bg-white p-3" onSubmit={sendMessage}>
                        <input
                            className="min-w-0 flex-1 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm text-deep-indigo placeholder-gray-400 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            placeholder="Ask a question"
                            aria-label="Chat message"
                        />
                        <button
                            type="submit"
                            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-deep-indigo text-white shadow-md transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isLoading || !message.trim()}
                            aria-label="Send message"
                        >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </form>
                </div>
            )}

            <button
                type="button"
                className="ml-auto flex size-14 items-center justify-center rounded-full bg-deep-indigo text-white shadow-lg shadow-indigo-900/20 transition-all hover:bg-primary hover:shadow-xl"
                onClick={() => setIsOpen((current) => !current)}
                aria-label="Open chatbot"
            >
                <span className="material-symbols-outlined text-[28px]">{isOpen ? 'close' : 'chat'}</span>
            </button>
        </div>
    );
};

export default Chatbot;
