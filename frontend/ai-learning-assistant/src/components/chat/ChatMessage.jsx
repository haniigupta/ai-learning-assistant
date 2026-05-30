import React from 'react';

const ChatMessage = ({ message }) => {

  const isUser = message.role === 'user';

  return (
    <div
      className={`flex mb-4 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-emerald-500 text-white'
            : 'bg-white border border-gray-200 text-gray-800'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;