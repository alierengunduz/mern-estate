import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
   try {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const data = await res.json();
      setLoading(false);
      setError(data.message || "An error occurred");
      return;
    }
     await res.json();
    setLoading(false);
    setError(null);
    navigate("/sign-in");
   } catch (error) {
      setLoading(false);
      setError(error.message);
   }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-3 max-w-lg  mx-auto mt-20">
      <h1 className="font-bold text-4xl tracking-wide text-center my-5">
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-5 border-2 p-10 w-full rounded-md shadow-sm shadow-white"
      >
        <Input
          type="text"
          placeholder="Enter your name"
          name="username"
          id="username"
          onChange={handleChange}
          value={formData.username}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <Button disabled={loading} type="submit" className="bg-blue-600 text-white py-2">
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <OAuth />
      </form>
      <div>
        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      {error && (
        <div className="bg-red-200 text-red-600 p-3 mt-5 rounded-md text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default SignUp;
