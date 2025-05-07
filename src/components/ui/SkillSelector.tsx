function SkillSelector({
  value,
  onChange,
  label = 'Skill Level',
  required = false,
  error = null,
  className = '',
  disabled = false,
}) {
  const skillLevels = [
    { id: 'beginner', label: 'Beginner', description: 'New to the game' },
    { id: 'intermediate', label: 'Intermediate', description: 'Comfortable with basic strokes' },
    { id: 'advanced', label: 'Advanced', description: 'Consistent play and strategy' },
    { id: 'expert', label: 'Expert', description: 'Competitive tournament level' },
  ];

  return (
    <div
      className={`mb-4 ${className}`}
      data-id="iqnik23j4"
      data-path="components/ui/SkillSelector.js"
    >
      {label && (
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          data-id="v4hof7vfk"
          data-path="components/ui/SkillSelector.js"
        >
          {label}
          {required && (
            <span
              className="text-red-500 ml-1"
              data-id="5ga47idqn"
              data-path="components/ui/SkillSelector.js"
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        data-id="i9wfkg706"
        data-path="components/ui/SkillSelector.js"
      >
        {skillLevels.map((skill) => (
          <div
            key={skill.id}
            onClick={() => {
              if (!disabled) {
                onChange(skill.id);
              }
            }}
            className={`
              p-3 border rounded-md cursor-pointer transition-all
              ${
                value === skill.id
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/50'
                  : 'border-gray-300 hover:border-primary/50'
              }
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            data-id="m3z1jisxq"
            data-path="components/ui/SkillSelector.js"
          >
            <div
              className="font-medium text-sm"
              data-id="ylmm5iyt9"
              data-path="components/ui/SkillSelector.js"
            >
              {skill.label}
            </div>
            <div
              className="text-xs text-gray-500"
              data-id="8c1c8hk41"
              data-path="components/ui/SkillSelector.js"
            >
              {skill.description}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p
          className="mt-1 text-sm text-red-500"
          data-id="1bnjt6nen"
          data-path="components/ui/SkillSelector.js"
        >
          {error}
        </p>
      )}
    </div>
  );
}
