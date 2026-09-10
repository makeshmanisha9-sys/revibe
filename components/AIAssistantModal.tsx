'use client';

import React, { useState, useRef, useEffect } from 'react';
import { askReVIBEAssistant, ChatMessage } from '@/services/ai/assistant';
import { Bot, Sparkles, X, Send, User, CornerDownLeft, RefreshCw, Layers, DollarSign, Wrench, ShieldAlert } from 'lucide-react';

export function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your **ReVIBE AI Upcycling Assistant**. Ask me about material safety, creative DIY instructions, cost/selling calculations, or multi-waste combinations.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'I have 5 plastic bottles. What can I make under ₹100?',
    'I want to sell something made from cardboard.',
    'I have a glass bottle but no heavy tools.',
    'How do I safely cut and smooth glass bottles?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: query };
    const updated = [...messages, userMsg];
    setMessages(updated);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const reply = await askReVIBEAssistant(updated);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ ReVIBE AI is temporarily busy. Please check your internet connection or try a shorter question.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-soft-lg btn-press transition-all duration-200"
          aria-label="Open ReVIBE AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">AI Assistant</span>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-900/50 text-[10px] font-mono text-emerald-200">
            v2.4
          </span>
        </button>
      </div>

      {/* Assistant Modal Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] rounded-3xl bg-white border border-charcoal-200 shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-emerald-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-none">ReVIBE AI Copilot</h3>
                <p className="text-[11px] text-emerald-200/80 mt-1">Smart Waste-to-Wealth Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-charcoal-50/50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-charcoal-900 border border-charcoal-200 rounded-bl-none shadow-soft'
                  }`}
                >
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-charcoal-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-charcoal-500 text-xs">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                </div>
                <span className="italic font-medium">ReVIBE AI is formulating upcycling blueprints...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2.5 bg-white border-t border-charcoal-100 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-charcoal-100/70 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-charcoal-200/60 text-[10px] text-charcoal-700 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-charcoal-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about upcycling ideas, costs, safety..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition-colors btn-press"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
