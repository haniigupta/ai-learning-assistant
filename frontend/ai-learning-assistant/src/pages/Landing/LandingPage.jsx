import React from 'react';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import Footer from '../../components/landing/Footer';
import Features from '../../components/landing/Feature';
import HowItWorks from '../../components/landing/HowItWork';
import FAQ from '../../components/landing/FAQ';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">

      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />

    </div>
  );
};

export default LandingPage;