function MatchCard({ match, currentUserId, onAction, isCompletedMatch = false }) {
  const isPending = match.status === 'pending';
  const isCompleted = match.status === 'completed' || isCompletedMatch;
  const isAccepted = match.status === 'accepted';

  // For challenges
  const matchDate = match.proposed_date
    ? new Date(match.proposed_date)
    : new Date(match.match_date || Date.now());
  const isUpcoming = isAccepted && matchDate > new Date();
  const isPast = isAccepted && matchDate <= new Date();

  const isChallenged = match.opponent_id === currentUserId;
  const isChallenger = match.challenger_id === currentUserId;

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  // Determine the status color
  const getStatusColor = () => {
    switch (match.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format status text
  const formatStatus = () => {
    switch (match.status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
      case 'completed':
        return 'Completed';
      default:
        return match.status;
    }
  };

  const [challengerProfile, setChallengerProfile] = React.useState(null);
  const [opponentProfile, setOpponentProfile] = React.useState(null);

  // Fetch player profiles if needed
  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // For challenges or matches, use the appropriate endpoint
        const { data: challengerData, error: challengerError } = await window.ezsite.apis.tablePage(
          3304,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [
              {
                name: 'user_id',
                op: 'Equal',
                value: match.challenger_id,
              },
            ],
          },
        );

        if (!challengerError && challengerData.List.length > 0) {
          setChallengerProfile(challengerData.List[0]);
        }

        const { data: opponentData, error: opponentError } = await window.ezsite.apis.tablePage(
          3304,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [
              {
                name: 'user_id',
                op: 'Equal',
                value: match.opponent_id,
              },
            ],
          },
        );

        if (!opponentError && opponentData.List.length > 0) {
          setOpponentProfile(opponentData.List[0]);
        }
      } catch (error) {
        console.error('Error fetching player profiles:', error);
      }
    };

    fetchProfiles();
  }, [match.challenger_id, match.opponent_id]);

  return (
    <div
      className="bg-white border rounded-lg shadow-sm overflow-hidden"
      data-id="4sn27ye8n"
      data-path="components/matches/MatchCard.js"
    >
      <div className="p-4" data-id="vzt3ehlmy" data-path="components/matches/MatchCard.js">
        <div
          className="flex justify-between items-start mb-3"
          data-id="xhp58obuf"
          data-path="components/matches/MatchCard.js"
        >
          <span
            className={`px-2 py-1 text-xs rounded border ${getStatusColor()}`}
            data-id="fn6mwdt4x"
            data-path="components/matches/MatchCard.js"
          >
            {formatStatus()}
          </span>
          <div
            className="text-sm text-gray-500"
            data-id="6qdjfafl1"
            data-path="components/matches/MatchCard.js"
          >
            {formatDate(matchDate)} at {formatTime(matchDate)}
          </div>
        </div>

        <div
          className="flex items-center justify-center mb-4"
          data-id="bqc95uenh"
          data-path="components/matches/MatchCard.js"
        >
          <div
            className="text-center"
            data-id="b6wylcm80"
            data-path="components/matches/MatchCard.js"
          >
            <img
              src={
                challengerProfile?.profile_image ||
                `https://ui-avatars.com/api/?name=Player&background=16a34a&color=fff`
              }
              alt={challengerProfile?.display_name || 'Challenger'}
              className="w-12 h-12 mx-auto rounded-full object-cover border-2 border-white shadow"
              data-id="7l0xpzoms"
              data-path="components/matches/MatchCard.js"
            />

            <div
              className="mt-1 font-medium"
              data-id="ehy0yqpov"
              data-path="components/matches/MatchCard.js"
            >
              {challengerProfile?.display_name || 'Player'}
              {isChallenger && (
                <span
                  className="ml-1 text-xs text-gray-500"
                  data-id="xdv85irj5"
                  data-path="components/matches/MatchCard.js"
                >
                  (You)
                </span>
              )}
            </div>
            <div
              className="text-xs text-gray-500"
              data-id="omvesni0l"
              data-path="components/matches/MatchCard.js"
            >
              {challengerProfile?.skill_level ? `Level ${challengerProfile.skill_level}` : ''}
            </div>
            {isCompleted && (
              <div
                className={`text-sm font-medium mt-1 ${match.winner_id === match.challenger_id ? 'text-green-600' : ''}`}
                data-id="nb1vg3ujv"
                data-path="components/matches/MatchCard.js"
              >
                {match.winner_id === match.challenger_id ? 'Winner' : ''}
              </div>
            )}
          </div>

          <div
            className="mx-4 text-xl font-bold text-gray-300"
            data-id="q5qi3m8i1"
            data-path="components/matches/MatchCard.js"
          >
            VS
          </div>

          <div
            className="text-center"
            data-id="zwzsdqy4w"
            data-path="components/matches/MatchCard.js"
          >
            <img
              src={
                opponentProfile?.profile_image ||
                `https://ui-avatars.com/api/?name=Opponent&background=0f766e&color=fff`
              }
              alt={opponentProfile?.display_name || 'Opponent'}
              className="w-12 h-12 mx-auto rounded-full object-cover border-2 border-white shadow"
              data-id="xpfyuwg2m"
              data-path="components/matches/MatchCard.js"
            />

            <div
              className="mt-1 font-medium"
              data-id="mqphv8ivm"
              data-path="components/matches/MatchCard.js"
            >
              {opponentProfile?.display_name || 'Opponent'}
              {isChallenged && (
                <span
                  className="ml-1 text-xs text-gray-500"
                  data-id="f1iks0mm9"
                  data-path="components/matches/MatchCard.js"
                >
                  (You)
                </span>
              )}
            </div>
            <div
              className="text-xs text-gray-500"
              data-id="hfiq7a1g6"
              data-path="components/matches/MatchCard.js"
            >
              {opponentProfile?.skill_level ? `Level ${opponentProfile.skill_level}` : ''}
            </div>
            {isCompleted && (
              <div
                className={`text-sm font-medium mt-1 ${match.winner_id === match.opponent_id ? 'text-green-600' : ''}`}
                data-id="g7up3zqon"
                data-path="components/matches/MatchCard.js"
              >
                {match.winner_id === match.opponent_id ? 'Winner' : ''}
              </div>
            )}
          </div>
        </div>

        <div
          className="text-sm text-gray-600 mb-3"
          data-id="u7ei9f08o"
          data-path="components/matches/MatchCard.js"
        >
          <div
            className="flex items-start"
            data-id="ae502o8vt"
            data-path="components/matches/MatchCard.js"
          >
            <i
              className="fas fa-map-marker-alt text-primary mt-1 mr-2"
              data-id="u5hi55osp"
              data-path="components/matches/MatchCard.js"
            ></i>
            <span data-id="d0iu07pe7" data-path="components/matches/MatchCard.js">
              {match.proposed_location || match.location || 'Location not specified'}
            </span>
          </div>

          {match.message && (
            <div
              className="flex items-start mt-2"
              data-id="73l9y5pv6"
              data-path="components/matches/MatchCard.js"
            >
              <i
                className="fas fa-comment-alt text-primary mt-1 mr-2"
                data-id="wpuoxevpy"
                data-path="components/matches/MatchCard.js"
              ></i>
              <span data-id="wvn6strx3" data-path="components/matches/MatchCard.js">
                {match.message}
              </span>
            </div>
          )}

          {match.response_message && (
            <div
              className="flex items-start mt-2"
              data-id="8o7dltsw9"
              data-path="components/matches/MatchCard.js"
            >
              <i
                className="fas fa-reply text-secondary mt-1 mr-2"
                data-id="gj9atz02b"
                data-path="components/matches/MatchCard.js"
              ></i>
              <span data-id="flumawx5r" data-path="components/matches/MatchCard.js">
                {match.response_message}
              </span>
            </div>
          )}
        </div>

        {isPending && isChallenged && onAction && (
          <div
            className="flex space-x-2 mt-4"
            data-id="pscapu55c"
            data-path="components/matches/MatchCard.js"
          >
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => onAction(match, 'decline')}
            >
              Decline
            </Button>
            <Button variant="primary" size="sm" fullWidth onClick={() => onAction(match, 'accept')}>
              Accept Challenge
            </Button>
          </div>
        )}

        {isPast && !isCompleted && onAction && (
          <div className="mt-4" data-id="9hi5i9pw0" data-path="components/matches/MatchCard.js">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => onAction(match, 'complete')}
            >
              Record Result
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
