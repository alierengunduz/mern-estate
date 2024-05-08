import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link,useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice";
import { useState } from "react";
const SignIn = () => {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
   try {
    e.preventDefault();
    dispatch(signInStart());
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return
    }
    dispatch(signInSuccess(data));
    navigate("/");
   } catch (error) {
      dispatch(signInFailure(error.message));
   }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-3 max-w-lg  mx-auto">
      <h1 className="font-bold text-4xl tracking-wide text-center my-5">
        Sign in
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-5 border-2 p-10 w-full rounded-md shadow-sm shadow-white"
      >
        <Input
          text="email"
          placeholder="Enter your email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          text="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <Button disabled={loading} type="submit" className="bg-blue-600 text-white py-2">
          {loading ? "Loading..." : "Sign in"}
        </Button>
      </form>
      <div>
        <p className="text-center mt-5">
          Don`t have an account?{" "}
          <Link to="/sign-up" className="text-blue-600">
            Sign up
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

export default SignIn