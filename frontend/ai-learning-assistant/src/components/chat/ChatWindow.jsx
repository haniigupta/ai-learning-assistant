import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({
  messages,
  loading
}) => {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className="border border-gray-200 rounded-2xl bg-gray-50 h-[450px] overflow-y-auto p-4">

      {messages.length === 0 && !loading && (
        <div className="text-gray-500">
          Ask anything about this document.
        </div>
      )}

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
        />
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-500">
            AI is thinking...
          </div>
        </div>
      )}

      <div ref={bottomRef} />

    </div>
  );
};

export default ChatWindow;