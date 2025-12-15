import React from "react";
import { Link } from "react-router-dom";
import "../../styles/insurehub.css";

export default function Landing() {
  return (
    <>
      {/* Header */}
      <header className="insure-header">
        <div className="brand">
          <div className="logo" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 5v6c0 5.523 3.582 10.74 8 11 4.418-.26 8-5.477 8-11V5l-8-3z" fill="#2563EB" opacity="0.18"/>
              <path d="M12 3.25l6 2.25v5.5c0 4.5-2.92 8.7-6 8.95-3.08-.25-6-4.45-6-8.95V5.5l6-2.25z" fill="#2563EB"/>
              <path d="M9.8 11.8l1.9 1.9 3.8-4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-name">InsureHub</div>
        </div>

        <nav className="nav-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="landing-hero">
        <section className="hero-left">
          <h1>Insurance. Simplified.</h1>
          <p className="hero-sub">Compare policies, get recommendations, and manage claims effortlessly</p>

          <div className="hero-cta-row">
            <Link to="/signup" className="cta-primary">Get Started</Link>
            <Link to="/login" className="cta-ghost">Login</Link>
          </div>
        </section>

        <aside className="hero-right">
          <div className="hero-illustration" aria-hidden>
            <svg width="380" height="300" viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg">
              <circle cx="190" cy="150" r="110" fill="#EAF2FF"/>
              <path d="M140 90 L190 70 L240 90 L230 150 L190 180 L150 150 Z" fill="#2563EB"/>
              <path d="M175 135 L190 150 L215 120" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round"/>
              <circle cx="275" cy="120" r="12" fill="#FACC15"/>
              <text x="269" y="125" fill="#9A3412" fontWeight="700" fontSize="12">₹</text>
            </svg>
          </div>
        </aside>
      </main>

      {/* Big CTA */}
      <section className="cta-wide">
        <div className="cta-inner">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who have simplified their insurance journey.</p>
          <Link to="/signup" className="cta-button">Create Your Account</Link>
        </div>
      </section>

      {/* Features */}
      <section className="features-wrapper">
        <h3 className="section-title">Everything You Need</h3>
        <p className="section-desc">Powerful tools to help you make the right insurance decisions</p>

        <div className="features-row">
          <div className="feature-card">
            <div className="feature-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#2563EB" strokeWidth="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#2563EB" strokeWidth="2"/>
              </svg>
            </div>
            <div className="feature-title">Compare Policies</div>
            <div className="feature-desc">Find and compare insurance plans from multiple providers in one place</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M14 9V5a3 3 0 0 0-6 0v4" stroke="#F59E0B" strokeWidth="2"/>
                <path d="M5 15h11l3-6v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4z" stroke="#F59E0B" strokeWidth="2"/>
              </svg>
            </div>
            <div className="feature-title">Smart Recommendations</div>
            <div className="feature-desc">Get personalized policy recommendations based on needs and budget</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6z" stroke="#10B981" strokeWidth="2"/>
              </svg>
            </div>
            <div className="feature-title">Easy Claims</div>
            <div className="feature-desc">File and track claims effortlessly with our streamlined process</div>
          </div>
        </div>
      </section>
    </>
  );
}
