import React from 'react';
import {
  BrainCircuit,
  Github,
  Mail,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">

                <BrainCircuit
                  className="text-white"
                  size={24}
                />

              </div>

              <div>

                <h3 className="text-white font-bold text-lg">
                  AI Learning Assistant
                </h3>

                <p className="text-slate-400 text-sm">
                  Learn Smarter
                </p>

              </div>

            </div>

            <p className="text-slate-400 mt-6 max-w-md leading-relaxed">

              Transform documents into interactive learning experiences.
              Upload PDFs, chat with AI, generate flashcards,
              create quizzes and accelerate your learning journey.

            </p>

          </div>

          {/* Product */}

          <div>

            <h4 className="text-white font-semibold mb-5">
              Product
            </h4>

            <div className="space-y-3">

              <a
                href="#features"
                className="block text-slate-400 hover:text-emerald-400 transition"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="block text-slate-400 hover:text-emerald-400 transition"
              >
                How It Works
              </a>

              <a
                href="#faq"
                className="block text-slate-400 hover:text-emerald-400 transition"
              >
                FAQ
              </a>

            </div>

          </div>

          {/* Get Started */}

          <div>

            <h4 className="text-white font-semibold mb-5">
              Get Started
            </h4>

            <div className="space-y-3">

              <Link
                to="/register"
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
              >
                Create Account
                <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
              >
                Sign In
                <ArrowUpRight size={14} />
              </Link>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="h-px bg-white/10 my-10" />

        {/* Bottom */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div>

  <p className="text-slate-500 text-sm">

    © 2026 AI Learning Assistant

  </p>

  <p className="text-slate-600 text-xs mt-1">

    Designed & Developed by Hani Gupta

  </p>

</div>

          <div className="flex items-center gap-4">

           
            <div className="flex items-center gap-4">

  {/* GitHub */}

  <a
    href="https://github.com/haniigupta"
    target="_blank"
    rel="noopener noreferrer"
    title="GitHub"
    className="w-10 h-10 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition"
  >
    <Github size={18} />
  </a>

  {/* LinkedIn */}

  <a
    href="https://www.linkedin.com/in/hani-gupta-3916b931b/"
    target="_blank"
    rel="noopener noreferrer"
    title="LinkedIn"
    className="w-10 h-10 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition"
  >
    <Linkedin size={18} />
  </a>

  {/* Email */}

  <a
    href="mailto:hanigupta1505@gmail.com"
    title="hanigupta1505@gmail.com"
    className="w-10 h-10 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition"
  >
    <Mail size={18} />
  </a>

</div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;