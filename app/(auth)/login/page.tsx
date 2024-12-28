'use client'

import { useState, ChangeEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Validate form inputs
  const validateForm = (): boolean => {
    if (!email || !password) {
      setError('All fields are required!');
      return false;
    }

    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address!');
      return false;
    }

    setError('');
    return true;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return;

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
    } else {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  // Handle input changes
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => setter(e.target.value);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="lg:text-4xl text-3xl font-bold text-blue-600 mb-8">
        Gurunanak Bookstore
      </div>

      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange(setEmail)}
          className="mb-4"
        />

        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleChange(setPassword)}
          className="mb-4"
        />

        <Button onClick={handleLogin} className="w-full mt-4">
          Login
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
