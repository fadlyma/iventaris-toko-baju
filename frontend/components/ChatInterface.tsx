'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { fetchProductByCode } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LogoutButton from '@/components/LogoutButton';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'system';
  product?: {
    id: number;
    code: string;
    name: string;
    price: number;
    stock: number;
  };
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '👋 Halo! Ketik kode produk untuk cek harga.', sender: 'system' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const product = await fetchProductByCode(userMsg.text);
      if (product) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: `✨ ${product.name}\n💰 Rp ${product.price.toLocaleString('id-ID')}\n📦 Stok: ${product.stock_quantity}`,
          sender: 'system',
          product: {
            id: product.id,
            code: product.code,
            name: product.name,
            price: product.price,
            stock: product.stock_quantity
          }
        }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: '❌ Produk tidak ditemukan.', sender: 'system' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: '⚠️ Terjadi kesalahan.', sender: 'system' }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Asisten Cek Harga
                </h1>
                <p className="text-xs text-gray-600">Cek harga produk dengan cepat</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%]`}>
              <div className={`p-4 rounded-2xl shadow-md ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white ml-auto' 
                  : 'bg-white/90 backdrop-blur text-gray-800 border border-gray-200'
              }`}>
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-lg">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ketik kode produk (contoh: KF-01)..."
            className="flex-1 border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-sm"
          />
          <Button 
            onClick={handleSend} 
            size="icon" 
            className="bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all rounded-xl h-10 w-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
