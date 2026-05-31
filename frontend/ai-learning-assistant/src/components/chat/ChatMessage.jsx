import React from 'react';

const ChatMessage = ({ message }) => {

  const isUser = message.role === 'user';

  return (
    <div
      className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'
        }`}
    >
      <div
        className={`max-w-[80%] px-5 py-4 rounded-3xl shadow-md transition-all duration-300 ${isUser
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
            : 'bg-white border border-slate-200 text-slate-800 backdrop-blur-sm'
          }`}
      >
        <div className="text-xs font-semibold mb-2 opacity-70">

  {isUser ? 'You' : 'AI Assistant'}

</div>
        <div>
          {message.content}
        </div>

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (

            <div className="mt-4 pt-3 border-t border-gray-200">

              <p className="text-xs font-semibold text-emerald-600 mb-2">
                🔍 Sources Retrieved
              </p>

              <div className="space-y-2">

                {message.sources.map(
                  (source, index) => (

                    <div
                      key={index}
                      className="bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 rounded-xl p-3 hover:shadow-md transition-all"
                    >

                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                        📄 Source {index + 1}
                        {source.pageNumber > 0 &&
                          ` • Page ${source.pageNumber}`}
                      </div>

                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {source.preview}
                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

      </div>
    </div>
  );
};

export default ChatMessage;