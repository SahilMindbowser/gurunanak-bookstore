'use client'

import { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!name || !email || !password || !contact) {
      setError('All fields are required!');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address!');
      return false;
    }

    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
      setError('Please enter a valid 10-digit contact number!');
      return false;
    }

    setError('');
    return true;
  };

  const handleSignup = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
      const res = await axios.post('/api/user', { name, email, password, contact });

      if (res.status === 201) {
        router.push('/login');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError('User already exists. Please try login instead.');
      } else {
        setError('Signup failed. Please try again later.');
      }
    }
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => setter(e.target.value);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="lg:text-4xl text-3xl font-bold text-center text-blue-600 mb-8">
        Gurunanak Bookstore
      </div>

      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <Input
          placeholder="Enter your name"
          value={name}
          onChange={handleChange(setName)}
          className="mb-4"
        />

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

        <Input
          type="tel"
          placeholder="Enter your contact number"
          value={contact}
          onChange={handleChange(setContact)}
          className="mb-4"
        />

        <Button onClick={handleSignup} className="w-full mt-4">
          Sign Up
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
