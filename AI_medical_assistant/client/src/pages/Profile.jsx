
import { useEffect,useState } from "react";

function Profile(){

    const [user,setUser] = useState(null);

    useEffect(()=>{
        const data =JSON.parse(localStorage.getItem('user'));
        setUser(data);
    },[]);

    if(!user)
        return(
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-teal-600 to-blue-900 text-white">
        <p className="text-xl text-center font-semibold">To create an account, join us today!</p>
      </div>
        );

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-600 to-blue-900 p-8 text-white">
            <h2 className="text-4xl font-bold text-center mb-6">Welcome back to Logo {user.fullName}</h2>
            <div className="bg-white text-md text-black rounded-xl shadow-lg max-w-xl mx-auto p-6 space-y-4">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Height:</strong> {user.height}</p>
                <p><strong>Weight:</strong> {user.weight}</p>
                <p><strong>Dietary Choice:</strong> {user.dietaryChoice}</p>
                <p><strong>Allergies:</strong> {Array.isArray(user.allergies)?user.allergies.filter(a=>a).join(", "):"None"}</p>
                <p><strong>Diseases:</strong> {Array.isArray(user.chronicDiseases)&&user.chronicDiseases[0]!==""?user.chronicDiseases.filter(d=>d).join(', '):"None"}</p>
            </div>
        <div className="max-w-xl mx-auto mt-6">
            <button
                onClick={()=>{
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('user');
                    window.location.href = '/LoginPage';
                }}
                className="w-full py-2 text-teal-600! cursor-pointer hover:text-blue-900! text-lg font-bold rounded-lg">
                    Logout
            </button>
        </div>
        </div>
    );

}
export default Profile;