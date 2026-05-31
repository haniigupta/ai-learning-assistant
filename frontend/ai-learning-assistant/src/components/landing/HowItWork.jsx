import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Upload Document',
    description: 'Upload PDFs, notes or study material.'
  },
  {
    number: '02',
    title: 'AI Processing',
    description: 'AI analyzes and indexes your content.'
  },
  {
    number: '03',
    title: 'Interact',
    description: 'Ask questions or generate learning resources.'
  },
  {
    number: '04',
    title: 'Learn Faster',
    description: 'Study smarter using AI-generated insights.'
  }
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-24"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          

          <h2 className="text-5xl font-bold text-white mt-4">
            Learning In Four Simple Steps
          </h2>

        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (

            <div
              key={index}
              className="relative"
            >

              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xl mx-auto">

                {step.number}

              </div>

              <h3 className="text-white text-xl font-semibold text-center mt-8">
                {step.title}
              </h3>

              <p className="text-slate-400 text-center mt-4">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;