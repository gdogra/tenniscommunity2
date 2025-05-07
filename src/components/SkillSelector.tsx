'use client';

interface SkillSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SkillSelector({ value, onChange }: SkillSelectorProps) {
  return (
    <label className="block">
      Skill Level:
      <select
        className="w-full border p-2 rounded mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </label>
  );
}
