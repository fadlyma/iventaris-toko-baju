import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white p-4 shadow-sm text-center">
        <h1 className="font-semibold text-lg text-indigo-600">Clothing Assistant</h1>
      </header>
      <main className="flex-1 max-w-md mx-auto w-full shadow-lg bg-white overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
