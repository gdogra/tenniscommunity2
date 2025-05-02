function ProfileEdit({ userProfile, onSave, onCancel }) {
  const [displayName, setDisplayName] = React.useState(userProfile?.displayName || '');
  const [bio, setBio] = React.useState(userProfile?.bio || '');
  const [skillLevel, setSkillLevel] = React.useState(userProfile?.skillLevel || 'beginner');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      await onSave({
        displayName,
        bio,
        skillLevel
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6" data-id="h2tjv55xj" data-path="components/players/ProfileEdit.js">
      <h2 className="text-xl font-bold text-gray-800 mb-4" data-id="83scdie2h" data-path="components/players/ProfileEdit.js">Edit Profile</h2>
      
      {error &&
      <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md" data-id="ztw5me7h3" data-path="components/players/ProfileEdit.js">
          {error}
        </div>
      }
      
      <form onSubmit={handleSubmit} data-id="w0bhlu04t" data-path="components/players/ProfileEdit.js">
        <Input
          id="displayName"
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          icon={<i className="fas fa-user text-gray-400" data-id="yx8yc2a3i" data-path="components/players/ProfileEdit.js"></i>} />

        
        <div className="mb-4" data-id="2bosc6yd0" data-path="components/players/ProfileEdit.js">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1" data-id="jajahz4jx" data-path="components/players/ProfileEdit.js">

            Bio
          </label>
          <textarea
            id="bio"
            rows="4"
            className="block w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-primary focus:border-primary"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell other players about yourself and your tennis experience..." data-id="3bgzjoa29" data-path="components/players/ProfileEdit.js">
          </textarea>
          <p className="mt-1 text-sm text-gray-500" data-id="5hci0fmie" data-path="components/players/ProfileEdit.js">
            {bio ? bio.length : 0}/500 characters
          </p>
        </div>
        
        <SkillSelector
          value={skillLevel}
          onChange={setSkillLevel}
          required />

        
        <div className="flex justify-end space-x-3 mt-6" data-id="9iwlxanug" data-path="components/players/ProfileEdit.js">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={loading}>

            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={loading}>

            {loading ?
            <><LoadingSpinner size="sm" color="white" className="mr-2" /> Saving...</> :

            'Save Changes'
            }
          </Button>
        </div>
      </form>
    </div>);

}