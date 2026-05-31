import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: 'What file formats are supported?',
    answer:
      'Currently you can upload PDF documents and process them using AI.'
  },
  {
    question: 'How does AI answer questions?',
    answer:
      'The AI retrieves relevant information from your uploaded documents and generates context-aware responses.'
  },
  {
    question: 'Can I generate flashcards automatically?',
    answer:
      'Yes. Flashcards are generated directly from the content of your uploaded documents.'
  },
  {
    question: 'Can I create quizzes?',
    answer:
      'Yes. AI can generate quizzes to help test your understanding of the material.'
  }
];

const FAQ = () => {

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      className="py-24"
    >

      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">

          

          <h2 className="text-5xl font-bold text-white mt-4">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-4">

          {faqData.map((item, index) => (

            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpenIndex(
                    openIndex === index ? null : index
                  )
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >

                <span className="text-white font-medium">
                  {item.question}
                </span>

                <ChevronDown
                  className={`text-slate-400 transition-transform ${
                    openIndex === index
                      ? 'rotate-180'
                      : ''
                  }`}
                />

              </button>

              {openIndex === index && (

                <div className="px-6 pb-6 text-slate-400">

                  {item.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQ;