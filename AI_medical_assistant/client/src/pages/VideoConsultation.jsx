import React, { useState } from "react";

const VideoConsultation = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const roomName = "mediverse-video-room";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center mb-10">
        <img
          src="https://images.pexels.com/photos/8460158/pexels-photo-8460158.jpeg"
          alt="Video Consultation"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Instant Video Consultation
          </h1>
          <p className="max-w-3xl text-white/90 text-base md:text-md font-normal drop-shadow">
            Talk to our in-house medical professionals right away, or book a visit with an external specialist.
            <br className="hidden md:block" />
            <span className="text-green-200 font-semibold">Safe. Fast. Reliable.</span>
          </p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="flex flex-col justify-center items-center px-6 py-16 min-h-screen">
        <div className="w-full max-w-2xl flex flex-col bg-white border border-gray-100 rounded-3xl shadow-lg p-10 md:p-16 mb-10 space-y-10">
          <div className="text-center">
            <h2 className="text-md md:text-3xl font-bold text-green-700 mb-6 flex items-center justify-center gap-3">
              <span className="bg-green-100 rounded-full">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-600">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z" fill="currentColor" />
                </svg>
              </span>
              Video Consultation Options
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Choose to consult instantly, book via Practo, or schedule with our doctor using Calendly.
            </p>
          </div>

          {!showVideo && !showCalendly && (
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
              {/* Practo Button - Blue */}
              <a
                href="https://www.practo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#0091DA] text-white rounded-lg font-semibold hover:bg-[#007AC2] transition w-full sm:w-auto text-center"
              >
                Book via Practo
              </a>

              {/* Calendly Button - Blue */}
              <button
                onClick={() => setShowCalendly(true)}
                className="px-6 py-3 bg-[#006BFF] text-white rounded-lg font-semibold hover:bg-[#0057D8] transition w-full sm:w-auto"
              >
                Schedule with Calendly
              </button>

              {/* Jitsi Button - Green */}
              <button
                onClick={() => setShowVideo(true)}
                className="px-6 py-3 bg-[#00B386] text-white rounded-lg font-semibold hover:bg-[#009e73] transition w-full sm:w-auto"
              >
                Consult Our Doctor Now
              </button>
            </div>

          )}

          {/* Show Calendly Widget */}
          {showCalendly && (
            <div className="w-full h-[700px] shadow-lg rounded-lg overflow-hidden border-2 border-green-100 mt-6">
              <iframe
                src="https://calendly.com/mehvish-waheed-25/30min"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule Appointment"
              ></iframe>
              <p className="text-gray-600 mt-4 text-center">
                Pick a time that works for you — confirmation will be sent to your email.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowCalendly(false)}
                  className="text-green-700 underline hover:text-green-800 text-sm"
                >
                  ← Back to Options
                </button>
              </div>
            </div>
          )}

          {/* Show Jitsi Video Call */}
          {showVideo && (
            <div className="flex flex-col items-center">
              <div className="w-full h-[600px] shadow-lg rounded-lg overflow-hidden border-2 border-green-100 mt-6">
                <iframe
                  allow="camera; microphone; fullscreen; display-capture"
                  src={`https://meet.jit.si/${roomName}`}
                  style={{ width: "100%", height: "100%", border: "0" }}
                  title="Video Consultation"
                ></iframe>
              </div>
              <p className="text-gray-600 mt-4 text-center">
                Please ensure your <strong>camera</strong> and <strong>microphone</strong> are enabled.
              </p>
              <button
                onClick={() => setShowVideo(false)}
                className="mt-4 text-green-700 underline hover:text-green-800 text-sm"
              >
                ← Back to Options
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VideoConsultation;
