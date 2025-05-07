'use client';

import { useRouter } from 'next/navigation';

const divisions = ['5.0', '4.5', '4.0', '3.6'];

export default function DivisionSwitcher({ current }: { current: string }) {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-3">
      {divisions.map((div) => (
        <button
          key={div}
          onClick={() => router.push(`/dashboard?division=${div}`)}
          className={`px-3 py-1 border rounded ${
            div === current ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'
          }`}
        >
          {div}
        </button>
      ))}
    </div>
  );
}
