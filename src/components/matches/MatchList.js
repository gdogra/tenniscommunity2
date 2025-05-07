function MatchList({
  matches = [],
  loading = false,
  error = null,
  currentUserId,
  onMatchAction,
  emptyMessage = 'No matches found',
  emptyIcon = 'fa-calendar-times',
  isCompletedMatches = false,
}) {
  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-10"
        data-id="toqemmper"
        data-path="components/matches/MatchList.js"
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600"
        data-id="lwfvhujls"
        data-path="components/matches/MatchList.js"
      >
        <div
          className="font-medium"
          data-id="lj8rrc37f"
          data-path="components/matches/MatchList.js"
        >
          Error loading matches
        </div>
        <div className="text-sm" data-id="movwzsj0n" data-path="components/matches/MatchList.js">
          {error}
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div
        className="text-center py-8"
        data-id="vnn10hhy6"
        data-path="components/matches/MatchList.js"
      >
        <div
          className="text-gray-400 text-6xl mb-4"
          data-id="2rba18tyo"
          data-path="components/matches/MatchList.js"
        >
          <i
            className={`fas ${emptyIcon}`}
            data-id="bnv7uuswv"
            data-path="components/matches/MatchList.js"
          ></i>
        </div>
        <h3
          className="text-xl font-medium text-gray-600 mb-1"
          data-id="z4o5cl06z"
          data-path="components/matches/MatchList.js"
        >
          {emptyMessage}
        </h3>
        <p
          className="text-gray-500"
          data-id="zr462vyk7"
          data-path="components/matches/MatchList.js"
        >
          {emptyMessage === 'No matches found'
            ? 'Start challenging other players to see matches here.'
            : 'Check back later.'}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      data-id="xd61kbnvn"
      data-path="components/matches/MatchList.js"
    >
      {matches.map((match) => (
        <MatchCard
          key={match.ID}
          match={match}
          currentUserId={currentUserId}
          onAction={onMatchAction}
          isCompletedMatch={isCompletedMatches}
        />
      ))}
    </div>
  );
}
