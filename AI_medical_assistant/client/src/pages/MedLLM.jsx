import { useState, useRef, useEffect } from "react";
import axios from "axios";

function MedLLM() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hi, I'm your AI doctor. How can I help you today?" },
  ]);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/chatbot/chat", {
        message: input,
      });

      const botMsg = {
        sender: "ai",
        text: res.data.reply || "Sorry, I couldn't understand.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Something went wrong. Please try again." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center mb-10">
        <img
          src="https://images.pexels.com/photos/17887854/pexels-photo-17887854.jpeg"
          alt="AI Medical Assistant"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">MedLLM: Your AI Medical Assistant</h1>
          <p className="max-w-4xl text-white/90 text-base md:text-md font-normal drop-shadow">
            MedLLM is an advanced AI-powered chatbot designed to provide instant, reliable, and confidential medical guidance. Describe your symptoms, ask health questions, and get expert-level responses—anytime, anywhere. <br className="hidden md:block" />
            <span className="text-green-200 font-semibold">Note:</span> This tool is for informational purposes and does not replace professional medical advice.
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center px-2 py-8">
        <div className="w-full max-w-lg flex items-center gap-2 mb-4 p-2 border-b border-green-200">
          <span className="bg-green-100 rounded-full p-1">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-green-600"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-13h2v6h-2V7Zm0 8h2v2h-2v-2Z" fill="currentColor"/></svg>
          </span>
          <h2 className="text-lg font-semibold text-green-800 tracking-tight">MedLLM AI Medical Chatbot</h2>
        </div>
        <div className="w-full max-w-lg flex-1 flex flex-col bg-white border border-green-100 rounded-xl shadow p-2 md:p-4 mb-2 min-h-[400px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-1`}
            >
              <div
                className={`max-w-[80%] px-3 py-1.5 rounded-lg text-sm whitespace-pre-wrap shadow-sm
                  ${msg.sender === "user"
                    ? "bg-green-600 text-white rounded-br-md"
                    : "bg-green-50 text-green-900 rounded-bl-md border border-green-100"}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form
          className="w-full max-w-lg flex flex-row gap-2 mt-1"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
        >
          <textarea
            rows="1"
            placeholder="Describe your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow p-2 bg-white rounded-lg outline-none resize-none shadow-sm transition text-sm text-black"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1.5 rounded-lg font-medium shadow hover:bg-green-700 transition-all text-sm"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

export default MedLLM;
