function PlayerList({
  players = [],
  loading = false,
  error = null,
  showChallengeButton = false,
  onChallengeClick,
  activePlayerId = null,
  compact = false
}) {
  const { currentUser } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10" data-id="8m6v57o7t" data-path="components/players/PlayerList.js">
        <LoadingSpinner size="lg" />
      </div>);
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600" data-id="cgwouha3l" data-path="components/players/PlayerList.js">
        <div className="font-medium" data-id="x4h9l7sje" data-path="components/players/PlayerList.js">Error loading players</div>
        <div className="text-sm" data-id="4arhcvn60" data-path="components/players/PlayerList.js">{error}</div>
      </div>);
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-8" data-id="ppaarpv78" data-path="components/players/PlayerList.js">
        <div className="text-gray-400 text-6xl mb-4" data-id="z1o12u3r8" data-path="components/players/PlayerList.js">
          <i className="fas fa-users-slash" data-id="fpuc4t0si" data-path="components/players/PlayerList.js"></i>
        </div>
        <h3 className="text-xl font-medium text-gray-600 mb-1" data-id="liko89lv4" data-path="components/players/PlayerList.js">No players found</h3>
        <p className="text-gray-500" data-id="inhr12pup" data-path="components/players/PlayerList.js">Check back later for more players.</p>
      </div>);
  }

  return (
    <div data-id="oufok21t8" data-path="components/players/PlayerList.js">
      {compact ?
      <div className="space-y-3" data-id="ngfs1y4yf" data-path="components/players/PlayerList.js">
          {players.map((player) =>
        <PlayerCard
          key={player.ID}
          player={player}
          showChallengeButton={showChallengeButton && player.user_id !== currentUser?.id}
          onChallengeClick={onChallengeClick}
          isActivePlayer={player.user_id === activePlayerId}
          compact={true} />
        )}
        </div> :

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-id="20u0a4zr7" data-path="components/players/PlayerList.js">
          {players.map((player) =>
        <PlayerCard
          key={player.ID}
          player={player}
          showChallengeButton={showChallengeButton && player.user_id !== currentUser?.id}
          onChallengeClick={onChallengeClick}
          isActivePlayer={player.user_id === activePlayerId} />
        )}
        </div>
      }
    </div>);
}