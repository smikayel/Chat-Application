import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomError from '../components/error';
import CustomInput from '../components/input';
import CustomButton from '../components/button';
import authService from '../services/auth/auth.service';
import { AxiosError } from 'axios';
import { requestError } from './pages.types';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function isLogedIn() {
      const user = await authService.getCurrentUser();
      if (user) navigate("/");
    }
    isLogedIn()
  }, [navigate]);

  const handleSignUp = async () => {
    try {
      if (password !== rePass) {
        setError('Password and re-entered password do not match');
        return;
      }
      const registeredUser = await authService.register(username, password);
      if (registeredUser) {
        navigate('/sign-in');
      }
    } catch (err) {
      const data = (err as AxiosError).response?.data as requestError;
      setError(data.message);
    }
  };

  return (
    <div className="bg-white border rounded-lg border-gray-300 p-6 w-1/3 mx-auto mt-16">
      <h3 className="text-2xl font-semibold mb-4">SignUp</h3>
      {error && <CustomError errorMessage={error} />}
      <div className="space-y-4">
        <CustomInput
          placeholder="Username"
          value={username}
          onChange={setUsername}
        />
        <CustomInput
          placeholder="example@gmail.com"
          value={email}
          onChange={setEmail}
        />
        <CustomInput
          placeholder="*********"
          value={password}
          type="password"
          onChange={setPassword}
        />
        <CustomInput
          placeholder="Reenter password"
          value={rePass}
          type="password"
          onChange={setRePass}
        />
      </div>
      <CustomButton text="Sign Up" onClick={handleSignUp} />
      <Link to="/login" className="text-gray-700 text-sm font-medium mt-4">
        Have an Account? Login
      </Link>
    </div>
  );
}
