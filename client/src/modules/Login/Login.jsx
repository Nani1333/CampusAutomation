import { useNavigate } from "react-router-dom";
import { useState } from "react";
import image from "../../Images/image.png";
import { FaUserTie, FaUserShield, FaUserGraduate, FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("Student"); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (userType) {
      navigate(`/${userType}/Dashboard`);
    } else {
      alert("Please select a user type!");
    }
  };

  const userTypes = [
    { name: "Student", icon: <FaUserGraduate />, color: "bg-white bg-opacity-20" },
    { name: "Faculty", icon: <FaUserTie />, color: "bg-white bg-opacity-20" },
    { name: "Admin", icon: <FaUserShield />, color: "bg-white bg-opacity-20" },
  ];

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center bg-black bg-opacity-40">
        <div className="backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-white border-opacity-20">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-2 text-white font-serif">
              VNR VJIET
            </h1>
            <div className="h-1 w-20 bg-white mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-white text-opacity-60" />
              </div>
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white placeholder-opacity-60"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-white text-opacity-60" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white placeholder-opacity-60"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-white text-center font-medium">
                Select User Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.name}
                    type="button"
                    onClick={() => setUserType(type.name)}
                    className={`p-4 rounded-xl flex flex-col items-center transition-all transform hover:scale-105 ${
                      userType === type.name
                        ? "bg-white bg-opacity-30 text-white scale-105"
                        : "bg-white bg-opacity-10 text-white text-opacity-60"
                    }`}
                  >
                    <span className="text-2xl mb-2">{type.icon}</span>
                    <span className="text-xs font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white bg-opacity-20 text-white py-3 rounded-lg font-medium shadow-lg hover:bg-opacity-30 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
