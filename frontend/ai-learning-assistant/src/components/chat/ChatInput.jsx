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
   <div className="sticky bottom-0 flex items-center gap-2 p-3 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-lg">

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about this document..."
        className="flex-1 min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />

      <button
        onClick={onSend}
        disabled={loading}
        className="shrink-0 px-4 sm:px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50"
      >
        Send
      </button>

    </div>
  );
};

export default ChatInput;