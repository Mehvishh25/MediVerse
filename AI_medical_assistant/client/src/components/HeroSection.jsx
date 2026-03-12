import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    img: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg",
    title: "Doctor Consultation",
    desc: "Consult live with doctors instantly or schedule an appointment via Calendly or Practo.",
    link: "/VideoConsultation",
  },
  {
    img: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
    title: "Visual Diagnosis",
    desc: "Upload images or audio for instant diagnosis using our advanced RAG-Enhanced Visual & Audio AI Assistant.",
    link: "/VisualDiagnosis",
  },
  {
    img: "https://images.pexels.com/photos/6011611/pexels-photo-6011611.jpeg",
    title: "Disease Predictor",
    desc: "Predict possible diseases in seconds through intelligent analysis of your health data and symptoms.",
    link: "/DiseasePredictor",
  },
  {
    img: "https://images.pexels.com/photos/8376285/pexels-photo-8376285.jpeg",
    title: "X-Ray/ Scan Analysis",
    desc: "AI-powered tool to deeply scan and interpret your X-ray reports for faster medical insights.",
    link: "/XRayScan",
  },
  {
    img: "https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg",
    title: "Lab Report Analysis",
    desc: "Upload your medical test results and let AI provide a detailed analysis with easy-to-understand insights.",
    link: "/LabReportAnalysis",
  },
  {
    img: "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg",
    title: "Diet & Lifestyle Coach",
    desc: "Receive personalized diet plans and lifestyle guidance tailored to your unique health needs and goals.",
    link: "/DietLifeStyleCoach",
  },
  {
    img: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
    title: "MediBot",
    desc: "Get accurate, text-based medical consultations powered by our Fine-Tuned Medical LLM for faster, smarter diagnosis.",
    link: "/ExpertConsultation",
  },
];


const Homepage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6153343/pexels-photo-6153343.jpeg')",
            filter: "brightness(0.7)",
          }}
          aria-hidden="true"
        ></div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            MediVerse
          </h1>
          <h2 className="mb-4 text-xl">Medical Specialist</h2>
          <p className="mb-8 max-w-2xl text-md text-gray-300">
            Revolutionizing healthcare with advanced AI-powered medical
            services, offering accurate diagnostics, personalized insights, and
            preventive care solutions.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* <button className="rounded-lg border-2 border-white px-6 py-3 font-bold text-white transition hover:bg-white/20">
              Explore
            </button> */}
           <a href="#about" className="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-bold text-white transition hover:bg-white/20">
  Learn More
</a>

          </div>
        </div>
      </div>
      <div className="px-4 py-16 bg-gray-50" id="about">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">About Us</h2>
          <p className="text-gray-700 text-md max-w-md md:max-w-2xl mx-auto">
            AI Medical Assistant is a pioneering platform developed to revolutionize healthcare through advanced AI technology. Our mission is to provide accessible, accurate, and personalized medical support to everyone, everywhere.
          </p>
        </div>
        <h1 className="text-black font-bold text-3xl mb-10 text-center">Team</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 justify-items-center items-center gap-x-4 gap-y-8">
          <div></div>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-xs w-full hover:translate-y-[-4px] transition-all cursor-default">
            <img src="https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc" alt="Mehvish Waheed" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-200 object-cover" />
            <h3 className="text-xl font-semibold text-green-800 mb-1">Mehvish Waheed</h3>
            <p className="text-gray-600 mb-2">Co-Inventor & Developer</p>
            <p className="text-gray-500 text-sm">Passionate about leveraging AI to make healthcare smarter and more accessible for all.</p>
            {/* Social Links */}
            <div className="flex justify-start gap-4 mt-6">
              <a href="https://www.linkedin.com/in/mehvish-waheed-88b9b5277/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" fill="currentColor" className="text-green-800 hover:text-green-900" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              </a>
              <a href="https://github.com/Mehvishh25" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" fill="currentColor" className="text-green-800 hover:text-green-900" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-xs w-full hover:translate-y-[-4px] transition-all cursor-default">
            <img src="https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc" alt="Rabia Mansoor" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-200 object-cover" />
            <h3 className="text-xl font-semibold text-green-800 mb-1">Rabia Mansoor</h3>
            <p className="text-gray-600 mb-2">Co-Inventor & Developer</p>
            <p className="text-gray-500 text-sm">Dedicated to building innovative solutions that bridge technology and healthcare for a better future.</p>
            {/* Social Links */}
            <div className="flex justify-start gap-4 mt-6">
              <a href="https://www.linkedin.com/in/rabiamansoor" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" fill="currentColor" className="text-green-800 hover:text-green-900" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              </a>
              <a href="https://github.com/Rabia4M" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" fill="currentColor" className="text-green-800 hover:text-green-900" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="px-4 py-16" id="services">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
            Medical Services
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {services.map((service, idx) => (
              <Link
                to={service.link}
                key={idx}
                className="overflow-hidden rounded-lg bg-white shadow-lg p-6 text-center transition-transform transform hover:shadow-2xl focus:outline-none"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-20 h-20 object-cover rounded-full shadow-md border-2 border-emerald-100"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-black">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
