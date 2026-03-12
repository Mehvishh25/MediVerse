import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    height: '',
    weight: '',
    dietaryChoice: '',
    allergies: [''],
    chronicDiseases: [''],
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListChange = (listName, index, value) => {
    const updatedList = [...formData[listName]];
    updatedList[index] = value;
    setFormData((prev) => ({
      ...prev,
      [listName]: updatedList,
    }));
  };

  const addToList = (listName) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], ''],
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/))
      newErrors.email = 'Enter a valid email';
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const validateStep2 = () => {
  const newErrors = {};

  if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 0)
    newErrors.age = 'Age must be a positive number';

  if (!formData.height.trim())
    newErrors.height = 'Height is required';

  if (!formData.weight.trim())
    newErrors.weight = 'Weight is required';

  if (!formData.dietaryChoice)
    newErrors.dietaryChoice = 'Please select a dietary choice';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log('Submitted JSON:', JSON.stringify(formData, null, 2));
      localStorage.setItem('user',JSON.stringify(formData));
      localStorage.setItem('isLoggedIn','true')
      alert('Account Created Successfully!');
      navigate('/LoginPage');
      
    }
  };
  
  const inputStyle = (field) =>
    `w-full px-4 py-2 border rounded-lg outline-none ${
      errors[field] ? 'border-red-500' : ''
    }`;

  return (
    <div className="-my-20 lg:-my-25 h-screen overflow-y-auto flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-900 via-teal-600 to-blue-900">

      <h2 className='text-white font-bold text-xl mt-25 md:text-3xl mb-8'>Join Logo & access our AI Powered Services</h2>
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-3xl font-extrabold text-center text-blue-900"><span>Sign Up</span></h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {step === 1 && (
            <>
              <div>
                <label className="block mb-1 font-semibold text-blue-900">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputStyle('fullName')}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-blue-900">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyle('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-blue-900">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputStyle('password')}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div className='mb-5'>
                <label className="block mb-1 font-semibold text-blue-900">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={inputStyle('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2 bg-teal-600! cursor-pointer text-white font-bold rounded-lg"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <select
                name="dietaryChoice"
                value={formData.dietaryChoice}
                onChange={handleChange}
                className={`w-full px-4 py-2 mt-1 border rounded-lg select select-neutral outline-none ${errors.dietaryChoice ? 'border-red-500' : ''}`}
              >
                <option value="">Select Dietary Choice</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="keto">Keto</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="low-carb">Low Carb</option>
              </select>
              {errors.dietaryChoice && (
                <p className="text-xs text-red-600 mt-1">{errors.dietaryChoice}</p>
                )}

              <div>
                <label className="font-semibold text-blue-900">Allergies</label>
                <div className='flex  items-center gap-1 overflow-hidden'>
                    {formData.allergies.map((val, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={val}
                    onChange={(e) =>
                      handleListChange('allergies', idx, e.target.value)
                    }
                    className="w-full my-1 px-4 py-2 border rounded-lg outline-none"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const last = formData.allergies[formData.allergies.length - 1];
                    if (last.trim() !== '') addToList('allergies');
                 }}
                  className="text-white bg-teal-600! font-medium border-2 my-1 rounded-xl  cursor-pointer px-2 py-2">
                  Add
                </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-blue-900">Chronic Diseases</label>
                <div className='flex gap-1 overflow-hidden'>
                    {formData.chronicDiseases.map((val, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={val}
                    onChange={(e) =>
                      handleListChange('chronicDiseases', idx, e.target.value)
                    }
                    className="w-full my-1 px-4 py-2 border rounded-lg outline-none"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const last = formData.chronicDiseases[formData.chronicDiseases.length - 1];
                    if (last.trim() !== '') addToList('chronicDiseases');
                }}

                  className="text-white bg-teal-600! font-medium border-2 my-1 rounded-xl  cursor-pointer px-2 py-2"
                >
                  Add
                </button>
                </div>
              </div>

                            <div className="flex gap-3">
  {/* Age */}
  <div className="flex-1">
    <label className="block mb-1 font-semibold text-blue-900">Age</label>
    <input
      type="number"
      name="age"
      placeholder="e.g. 20"
      value={formData.age}
      onChange={handleChange}
      className={`w-full px-3 py-2 border rounded-lg outline-none ${errors.age ? 'border-red-500' : ''}`}
    />
    {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
  </div>

  {/* Height */}
  <div className="flex-1">
    <label className="block mb-1 font-semibold text-blue-900">Height</label>
    <input
      type="text"
      name="height"
      placeholder="e.g. 5'7''"
      value={formData.height}
      onChange={handleChange}
      className={`w-full px-3 py-2 border rounded-lg outline-none ${errors.height ? 'border-red-500' : ''}`}
    />
    {errors.height && <p className="text-xs text-red-600 mt-1">{errors.height}</p>}
  </div>

  {/* Weight */}
  <div className="flex-1">
    <label className="block mb-1 font-semibold text-blue-900">Weight</label>
    <input
      type="text"
      name="weight"
      placeholder="e.g. 60kg"
      value={formData.weight}
      onChange={handleChange}
      className={`w-full px-3 py-2 border rounded-lg outline-none ${errors.weight ? 'border-red-500' : ''}`}
    />
    {errors.weight && <p className="text-xs text-red-600 mt-1">{errors.weight}</p>}
  </div>
</div>

              <div className="flex justify-between gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 bg-teal-500! text-white cursor-pointer font-semibold rounded-lg "
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="w-full py-2 bg-teal-600! text-white font-bold cursor-pointer rounded-lg"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
