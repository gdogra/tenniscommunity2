'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    division: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, firstName, lastName, division } = form;

    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: firstName });

    await setDoc(doc(db, 'users', userCred.user.uid), {
      uid: userCred.user.uid,
      email,
      firstName,
      lastName,
      division,
      createdAt: new Date().toISOString(),
    });

    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" required />
      <input name="division" placeholder="Division (e.g. 4.0)" onChange={handleChange} className="input" required />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}

