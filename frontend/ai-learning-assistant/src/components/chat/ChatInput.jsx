import React from 'react';

const ChatInput = ({
  value,
  onChange,
  onSend,
  loading
}) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-3">

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about this document..."
        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <button
        onClick={onSend}
        disabled={loading}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 rounded-xl transition disabled:opacity-50"
      >
        Send
      </button>

    </div>
  );
};

export default ChatInput;