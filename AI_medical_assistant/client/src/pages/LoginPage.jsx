import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';

const dummyEmail='rabia@gmail.com';
const dummyPwd='123456';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if ((email === dummyEmail && password === dummyPwd)
        ||(storedUser && email === storedUser.email && password === storedUser.password)) {
    console.log('Login successful');
    if (email === dummyEmail && password === dummyPwd)
      localStorage.setItem('user',JSON.stringify({
        fullName: 'Rabia',
          email: dummyEmail,
          age: '20',
          height: "5'7''",
          weight: '60kg',
          dietaryChoice: 'Vegetarian',
          allergies: ['Pollen'],
          chronicDiseases: ['None']
      }));
    localStorage.setItem('isLoggedIn','true');
    alert("Login successful!");
    navigate('/'); 
    } 
    else if ((email === dummyEmail && password !== dummyPwd)
      ||(storedUser && email === storedUser.email)) {
    alert("Incorrect password."); 
    } 
    else {
    alert("Invalid credentials.");
        }
    };

  

  return (
    <div className="-my-20 lg:-my-25 h-screen overflow-y-auto flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 via-teal-600 to-blue-900">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-900"><span>Login</span></h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-semibold text-blue-900">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-semibold text-blue-900">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-teal-600! shadow hover:bg-teal-700 text-white font-bold rounded-lg transition duration-200">
                Login
        </button>
        </form>

        
        <div className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-teal-600 hover:text-blue-900 hover:underline font-medium">
            Sign up
           </Link>

        </div>
      </div>
    </div>
  );
}

export default Login;
