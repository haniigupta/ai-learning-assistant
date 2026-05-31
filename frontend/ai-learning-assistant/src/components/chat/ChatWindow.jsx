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
    <div className="h-[550px] overflow-y-auto rounded-3xl border border-slate-200/60 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg">

      {messages.length === 0 && !loading && (
        <div className="h-full flex flex-col items-center justify-center text-center">

          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl mb-4">
            🤖
          </div>

          <h3 className="text-xl font-bold text-slate-800">
            Start a Conversation
          </h3>

          <p className="text-slate-500 mt-2 max-w-md">
            Ask questions, summarize content, extract insights,
            or chat with your uploaded document.
          </p>

        </div>
      )}

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
        />
      ))}

      {loading && (
        <div className="flex justify-start mb-4">

          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">

            <div className="flex items-center gap-2">

              <span className="text-emerald-600 font-medium">
                Thinking
              </span>

              <div className="flex gap-1">

                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>

                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                ></span>

                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                ></span>

              </div>

            </div>

          </div>

        </div>
      )}

      <div ref={bottomRef} />

    </div>
  );
};

export default ChatWindow;