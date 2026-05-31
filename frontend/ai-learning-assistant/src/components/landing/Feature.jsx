import React from 'react';
import {
  Upload,
  MessageSquare,
  BookOpen,
  BrainCircuit
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Upload Documents',
    description:
      'Upload PDFs, notes and study material. AI automatically processes and understands your content.'
  },
  {
    icon: MessageSquare,
    title: 'AI Document Chat',
    description:
      'Ask questions directly from your documents and get context-aware answers instantly.'
  },
  {
    icon: BookOpen,
    title: 'Smart Flashcards',
    description:
      'Generate flashcards automatically and revise key concepts more efficiently.'
  },
  {
    icon: BrainCircuit,
    title: 'Quiz Generator',
    description:
      'Create quizzes from your study material and test your understanding instantly.'
  }
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          

          <h2 className="text-5xl font-bold text-white mt-4">
            Everything You Need To Learn Faster
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Powerful AI tools designed to help students
            understand, revise and retain knowledge.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-300"
              >

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6">

                  <Icon
                    className="text-white"
                    size={26}
                  />

                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Features;