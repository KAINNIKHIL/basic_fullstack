import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const InternForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    
    const data = {
    username: formData.username,
    email: formData.email,
    phone: formData.phone,
    password: formData.password

  };

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`,
 {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Server Response:", result);

      if (response.ok) {
        console.log("Registration successful:", data);
        navigate("/home"); 
      } else {
        console.error("Registration failed:", data.message);
      }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-blue-400 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Intern Registration</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default InternForm;
