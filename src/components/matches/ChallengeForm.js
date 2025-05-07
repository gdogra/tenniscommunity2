function ChallengeForm({ opponent, onSubmit, onCancel }) {
  const { currentUser, userProfile } = useAuth();
  const { challenges } = useFirestore();
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Get tomorrow's date as the default minimum date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !location) {
      setError('Please fill in all required fields.');
      return;
    }

    // Combine date and time
    const dateTimeString = `${date}T${time}:00`;
    const dateTime = new Date(dateTimeString);

    // Validate that the date is in the future
    if (dateTime < new Date()) {
      setError('Challenge date must be in the future.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const challengeData = {
        opponent_id: opponent.user_id,
        proposed_date: dateTime.toISOString(),
        proposed_location: location,
        message: message || 'Looking forward to our match!',
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      await challenges.create(challengeData);
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error('Error creating challenge:', err);
      setError('Failed to send challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6"
      data-id="pehx40aez"
      data-path="components/matches/ChallengeForm.js"
    >
      <div
        className="flex items-center mb-6"
        data-id="jia3fw1t9"
        data-path="components/matches/ChallengeForm.js"
      >
        <img
          src={
            userProfile?.photoURL ||
            `https://ui-avatars.com/api/?name=${userProfile?.displayName}&background=16a34a&color=fff`
          }
          alt={userProfile?.displayName}
          className="w-12 h-12 rounded-full object-cover"
          data-id="ax6n7wfl9"
          data-path="components/matches/ChallengeForm.js"
        />

        <div
          className="mx-4 text-gray-400"
          data-id="ryndul60v"
          data-path="components/matches/ChallengeForm.js"
        >
          vs
        </div>
        <img
          src={
            opponent?.profile_image ||
            `https://ui-avatars.com/api/?name=${opponent?.display_name}&background=0f766e&color=fff`
          }
          alt={opponent?.display_name}
          className="w-12 h-12 rounded-full object-cover"
          data-id="oxzdg9uey"
          data-path="components/matches/ChallengeForm.js"
        />

        <div className="ml-4" data-id="kb69k4fod" data-path="components/matches/ChallengeForm.js">
          <h3
            className="font-medium"
            data-id="rsv2d9k3a"
            data-path="components/matches/ChallengeForm.js"
          >
            {opponent?.display_name}
          </h3>
          <p
            className="text-sm text-gray-500"
            data-id="z8pdu7nay"
            data-path="components/matches/ChallengeForm.js"
          >
            Skill Level: {opponent?.skill_level}
          </p>
        </div>
      </div>

      {error && (
        <div
          className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md"
          data-id="orxagon3h"
          data-path="components/matches/ChallengeForm.js"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        data-id="xwv0wxsak"
        data-path="components/matches/ChallengeForm.js"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
          data-id="f436jj9e8"
          data-path="components/matches/ChallengeForm.js"
        >
          <Input
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={getTomorrowDate()}
            icon={
              <i
                className="fas fa-calendar text-gray-400"
                data-id="98jxoavjw"
                data-path="components/matches/ChallengeForm.js"
              ></i>
            }
          />

          <Input
            id="time"
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            icon={
              <i
                className="fas fa-clock text-gray-400"
                data-id="qmkjhksir"
                data-path="components/matches/ChallengeForm.js"
              ></i>
            }
          />
        </div>

        <Input
          id="location"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder="e.g. Central Park Tennis Courts"
          icon={
            <i
              className="fas fa-map-marker-alt text-gray-400"
              data-id="lac7nwcfm"
              data-path="components/matches/ChallengeForm.js"
            ></i>
          }
        />

        <div className="mb-4" data-id="06x6juur6" data-path="components/matches/ChallengeForm.js">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
            data-id="jjaz29uws"
            data-path="components/matches/ChallengeForm.js"
          >
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows="3"
            className="block w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-primary focus:border-primary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message to your challenge..."
            data-id="6ias7mpr6"
            data-path="components/matches/ChallengeForm.js"
          ></textarea>
        </div>

        <div
          className="flex justify-end space-x-3 mt-6"
          data-id="fj96myasu"
          data-path="components/matches/ChallengeForm.js"
        >
          <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            icon={
              <i
                className="fas fa-paper-plane"
                data-id="3p438vnac"
                data-path="components/matches/ChallengeForm.js"
              ></i>
            }
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" className="mr-2" /> Sending...
              </>
            ) : (
              'Send Challenge'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
