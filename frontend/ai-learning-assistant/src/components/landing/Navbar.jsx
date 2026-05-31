import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">

              <BrainCircuit
                className="text-white"
                size={22}
              />

            </div>

            <div>

              <h2 className="font-bold text-white">
                AI Learning Assistant
              </h2>

              <p className="text-xs text-slate-400">
                Learn Smarter
              </p>

            </div>

          </Link>

          {/* Nav */}

          <nav className="hidden md:flex items-center gap-8 text-slate-300">

            <a href="#features" className="hover:text-white transition">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>

            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>

          </nav>

          {/* Buttons */}

          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate('/register')}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:scale-105 transition-all"
            >
              Get Started
            </button>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;