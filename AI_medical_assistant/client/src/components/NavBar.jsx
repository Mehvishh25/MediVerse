import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownOpen && !event.target.closest('.services-dropdown')) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setServicesDropdownOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  const serviceLinks = [
    { name: "Visual Diagnosis", href: "/VisualDiagnosis" },
    { name: "X-Ray/ Scan Analysis", href: "/XRayScan" },
    { name: "Lab Report Analysis", href: "/LabReportAnalysis" },
    { name: "Doctor Consultation", href: "/VideoConsultation" },
    { name: "MediBot", href: "/ExpertConsultation" },
    { name: "Disease Predictor", href: "/DiseasePredictor" },
    { name: "Diet & Lifestyle Coach", href: "/DietLifeStyleCoach" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <nav className={`fixed z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link to="/" className="group flex shrink-0 items-center">
              <div className={`relative flex w-10 h-10 items-center justify-center overflow-hidden rounded-full transition-all duration-300 group-hover:bg-green-700 ${scrolled ? 'bg-green-600' : 'bg-white/20'}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <div className="absolute -inset-1 rounded-full bg-green-400 opacity-30 blur transition-opacity duration-300 group-hover:opacity-40"></div>
              </div>
              <div className="ml-3">
              <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-green-700' : 'text-white'}`}>
                Medi<span className={`${scrolled ? 'text-green-500' : 'text-white'}`}>Verse</span>
              </span>
                <p className={`-mt-1 text-xs font-medium transition-colors duration-300 ${scrolled ? 'text-green-600' : 'text-white/80'}`}>AI Medical Assistant</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link to="/" className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-green-700 hover:text-green-500' : 'text-white hover:text-gray-300'}`}>Home</Link>
            <button onClick={() => scrollToSection('about')} className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-green-700 hover:text-green-500' : 'text-white hover:text-gray-300'}`}>About Us</button>

            {/* Services Dropdown */}
            <div className="relative services-dropdown">
              <button
                type="button"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 flex items-center ${scrolled ? 'text-green-700 hover:text-green-500' : 'text-white hover:text-gray-300'}`}
                onClick={handleServicesClick}
              >
                Services
                <svg className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-30 border border-gray-200">
                  <ul className="py-2">
                    {serviceLinks.map((service, idx) => (
                      <li key={idx}>
                        <Link
                          to={service.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-emerald-50 hover:text-green-700 text-sm transition"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ✅ Desktop Contact Button */}
            <Link to="/contact" className="group relative overflow-hidden">
              <span className={`relative z-10 inline-flex items-center justify-center rounded-md border border-transparent px-3 py-1 text-sm font-medium transition-all duration-300 ${scrolled ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white/20 text-white hover:bg-black/10 hover:text-white'}`}>
                Contact
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${scrolled ? 'text-green-700 hover:bg-green-600 hover:text-white' : 'text-white hover:bg-emerald-600 hover:text-white'}`}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} w-6 h-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} w-6 h-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={closeMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-1 px-6 pb-3">
          <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-green-700 transition-colors duration-200" onClick={closeMenu}>Home</Link>
          <button onClick={() => scrollToSection('about')} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-green-700 transition-colors duration-200">About Us</button>
          <div className="relative">
            <button
              type="button"
              className="block w-full rounded-md px-3 py-2 text-base font-medium text-green-700 text-left transition-colors duration-200 focus:outline-none flex items-center justify-between"
              onClick={handleServicesClick}
            >
              Services
              <svg className={`w-4 h-4 transform transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesDropdownOpen && (
              <div className="mt-2 ml-4 space-y-1">
                {serviceLinks.map((service, idx) => (
                  <Link
                    key={idx}
                    to={service.href}
                    className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-green-700 text-sm transition rounded-md"
                    onClick={closeMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Mobile Contact Button */}
          <Link
            to="/contact"
            className="block w-full rounded-md border border-transparent bg-green-600 px-2 py-3 text-center text-base font-medium text-white shadow-sm transition-colors duration-200 hover:bg-green-700"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;
