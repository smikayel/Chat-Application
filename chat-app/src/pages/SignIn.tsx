import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import CustomError from "../components/error";
import CustomInput from "../components/input";
import CustomButton from "../components/button";
import authService from "../services/auth/auth.service";
import { requestError } from "./pages.types";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function isLogedIn() {
      const user = await authService.getCurrentUser();
      if (user) navigate("/");
    }
    isLogedIn()
  }, []);

  const handleSignIn = async () => {
    try {
      const authResponse = await authService.login(username, password);
      if (authResponse) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      const data = (err as AxiosError).response?.data as requestError;
      setError(data.message);
    }
  };

  return (
    <div className="bg-white border rounded-lg border-gray-300 p-6 w-1/3 mx-auto mt-16">
      <h3 className="text-2xl font-semibold mb-4">Login</h3>
      {error && <CustomError errorMessage={error} />}
      <div className="space-y-4">
        <CustomInput
          placeholder="username"
          value={username}
          onChange={setUsername}
        />
        <CustomInput
          placeholder="*********"
          value={password}
          type="password"
          onChange={setPassword}
        />
      </div>
      <CustomButton text="Sign In" onClick={handleSignIn} />
      <Link to="/signup" className="text-gray-700 text-sm font-medium mt-4">
        New User? Register
      </Link>
    </div>
  );
}
