import React from 'react';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">

      <Navbar />

      <Hero />

    </div>
  );
};

export default LandingPage;