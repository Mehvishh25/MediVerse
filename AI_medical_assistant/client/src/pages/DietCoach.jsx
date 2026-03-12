import { useState } from "react";

function DietCoach() {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    lifestyle: "",
    goal: "",
    diseases: "",
    allergies: "",
    meal_pref: "None",
    cuisine: "None",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const required = ["age", "height", "weight", "gender", "lifestyle", "goal"];
    for (let field of required) {
      if (!form[field]) return alert(`Please enter/select ${field}`);
    }

    form.diseases = form.diseases.trim() || "None";
    form.allergies = form.allergies.trim() || "None";

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/diet/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(enhanceDietPlan(data.response || data.error || "Unexpected response."));
    } catch {
      setResult("Error occurred while generating your diet plan.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center mb-10">
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
          alt="Diet Coach"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60" />
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Diet Coach</h1>
          <p className="max-w-2xl mx-auto text-md md:text-lg">
            Customize your 1-day meal plan based on your health, lifestyle, and food preferences.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex flex-col justify-center items-center px-6 py-16 min-h-screen">
        <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-lg p-10 md:p-16 space-y-8">
          <h2 className="text-center text-green-700 text-2xl md:text-3xl font-bold">Personalized Diet Plan</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Age" name="age" value={form.age} onChange={handleChange} />
            <InputField label="Height (cm)" name="height" value={form.height} onChange={handleChange} />
            <InputField label="Weight (kg)" name="weight" value={form.weight} onChange={handleChange} />
            <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Select Gender", "Female", "Male", "Other"]} />
            <SelectField label="Lifestyle" name="lifestyle" value={form.lifestyle} onChange={handleChange} options={["Select Lifestyle", "Sedentary", "Lightly active", "Moderately active", "Very active", "Athlete"]} />
            <SelectField label="Goal" name="goal" value={form.goal} onChange={handleChange} options={["Select Goal", "Weight loss", "Muscle gain", "Healthy maintenance"]} />
            <InputField label="Diseases (if any)" name="diseases" placeholder="None" value={form.diseases} onChange={handleChange} />
            <InputField label="Allergies (if any)" name="allergies" placeholder="None" value={form.allergies} onChange={handleChange} />
            <SelectField
              label="Meal Preference"
              name="meal_pref"
              value={form.meal_pref}
              onChange={handleChange}
              options={[
                "None",
                "Vegetarian",
                "Non-Vegetarian",
                "Vegan",
                "Keto",
                "Paleo",
                "Mediterranean",
                "Low-Carb",
                "High-Protein",
                "Jain",
                "Gluten-Free",
              ]}
            />
            <SelectField
              label="Cuisine Preference"
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              options={[
                "None",
                "Indian",
                "Chinese",
                "Mediterranean",
                "Italian",
                "Mexican",
                "Thai",
                "Korean",
                "Middle Eastern",
              ]}
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:bg-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Plan..." : "Get Diet Plan"}
            </button>
          </div>
        </div>

        {result && (
          <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-10 md:p-16 shadow-lg mt-8 space-y-6">
            <h3 className="text-green-700 text-center text-2xl font-semibold lg:text-3xl">Your AI Diet Plan</h3>
            <div
              className="bg-gray-50 rounded-xl p-6 text-gray-800 text-lg whitespace-pre-line text-left"
              dangerouslySetInnerHTML={{ __html: result }}
            ></div>
          </div>
        )}
      </section>
    </div>
  );
}

export default DietCoach;

// Input Field
function InputField({ label, name, placeholder = "", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 text-gray-700"
      />
    </div>
  );
}

// Select Field
function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 text-gray-700"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.includes("Select") ? "" : opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// Diet Plan Formatter
function enhanceDietPlan(text) {
  if (!text) return "";

  let formatted = text;

  // Convert section headers to <h2>
  formatted = formatted.replace(
    /^(Breakfast|Mid-Morning Snack|Lunch|Evening Snack|Dinner|Hydration|Lifestyle Tips|Disclaimer|Important Notes):/gim,
    (match) => `<h2 style="color:#047857; font-weight:600;">${match.replace(":", "")}</h2>`
  );

  // Convert bullet points to <li>
  formatted = formatted.replace(/^- (.*)/gm, "<li>$1</li>");
  formatted = formatted.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

  // Wrap paragraphs with <p>
  formatted = formatted.replace(/\n{2,}/g, "</p><p>");
  formatted = `<p>${formatted}</p>`;

  return formatted;
}
