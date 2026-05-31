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
        <div>
          {message.content}
        </div>

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (

            <div className="mt-4 pt-3 border-t border-gray-200">

              <p className="text-xs font-semibold text-emerald-600 mb-2">
    📚 Sources Used
</p>

              <div className="space-y-2">

                {message.sources.map(
                  (source, index) => (

                    <div
                      key={index}
                      className="bg-emerald-50 border border-emerald-100 rounded-lg p-2"
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