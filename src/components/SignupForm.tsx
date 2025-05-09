'use client';
import Image from 'next/image';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCred.user.uid;

      let avatarUrl = '';
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${userId}`);
        await uploadBytes(avatarRef, avatar);
        avatarUrl = await getDownloadURL(avatarRef);
      }

      await addDoc(collection(db, 'players'), {
        uid: userId,
        name,
        email,
        avatar: avatarUrl,
        role: 'player',
        createdAt: new Date(),
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Create Your Account</h1>
      <input
        type="text"
        placeholder="Name"
        className="w-full border px-4 py-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border px-4 py-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <div>
        <label className="block text-sm font-medium mb-1">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            className="mt-2 w-24 h-24 object-cover rounded-full border"
            width="40"
            height="40"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Creating...' : 'Sign Up'}
      </button>
    </form>
  );
}
