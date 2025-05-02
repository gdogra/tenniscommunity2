function PlayerCard({
  player,
  showChallengeButton = false,
  onChallengeClick,
  isActivePlayer = false,
  compact = false
}) {
  const navigate = ReactRouterDOM.useNavigate();

  // Skill level badge styles
  const getSkillBadgeClass = (skill) => {
    const skillValue = parseFloat(skill);
    if (skillValue <= 2.5) return 'bg-green-100 text-green-800 border-green-200';
    if (skillValue <= 4.0) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (skillValue <= 5.5) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (skillValue > 5.5) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Format skill level 
  const formatSkillLevel = (skill) => {
    return skill ? `Level ${skill}` : 'Unrated';
  };

  // Default avatar if no photo URL
  const defaultAvatar = `https://ui-avatars.com/api/?name=${player.display_name}&background=16a34a&color=fff`;

  // Calculate win rate
  const calculateWinRate = () => {
    const wins = parseInt(player.wins || 0);
    const losses = parseInt(player.losses || 0);
    const total = wins + losses;
    return total > 0 ? Math.round(wins / total * 100) : 0;
  };

  if (compact) {
    return (
      <div
        onClick={() => navigate(`/players/${player.ID}`)}
        className={`flex items-center p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${
        isActivePlayer ? 'border-primary bg-primary/5' : 'border-gray-200'}`
        } data-id="j2caxp99i" data-path="components/players/PlayerCard.js">

        <img
          src={player.profile_image || defaultAvatar}
          alt={player.display_name}
          className="w-10 h-10 rounded-full object-cover mr-3" data-id="oudf5troe" data-path="components/players/PlayerCard.js" />

        <div data-id="qyff7jemr" data-path="components/players/PlayerCard.js">
          <h3 className="font-medium text-gray-800" data-id="9zdek900g" data-path="components/players/PlayerCard.js">{player.display_name}</h3>
          <div className="flex items-center" data-id="pobb5plmp" data-path="components/players/PlayerCard.js">
            <span className={`inline-block px-2 py-0.5 text-xs rounded border ${getSkillBadgeClass(player.skill_level)}`} data-id="mz99ag0q6" data-path="components/players/PlayerCard.js">
              {formatSkillLevel(player.skill_level)}
            </span>
            <span className="ml-2 text-xs text-gray-500" data-id="jdgim857h" data-path="components/players/PlayerCard.js">
              {player.wins || 0} W / {player.losses || 0} L
            </span>
          </div>
        </div>
        
        {showChallengeButton && !isActivePlayer &&
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            onChallengeClick(player);
          }}
          icon={<i className="fas fa-trophy text-primary" data-id="rt9q671nf" data-path="components/players/PlayerCard.js"></i>}>

            Challenge
          </Button>
        }
      </div>);

  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${
    isActivePlayer ? 'ring-2 ring-primary' : ''}`
    } data-id="dqevbzxae" data-path="components/players/PlayerCard.js">
      <div className="relative" data-id="w4t56wx6c" data-path="components/players/PlayerCard.js">
        {/* Cover image */}
        <div className="h-20 bg-gradient-to-r from-primary to-secondary" data-id="gdz0rocre" data-path="components/players/PlayerCard.js"></div>
        
        {/* Profile image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2" data-id="y7keaka3f" data-path="components/players/PlayerCard.js">
          <img
            src={player.profile_image || defaultAvatar}
            alt={player.display_name}
            className="w-16 h-16 rounded-full border-4 border-white object-cover" data-id="rp7owotji" data-path="components/players/PlayerCard.js" />

        </div>
      </div>
      
      <div className="pt-10 pb-6 px-4 text-center" data-id="um73aqzmf" data-path="components/players/PlayerCard.js">
        <h3 className="font-bold text-lg text-gray-800 mb-1" data-id="6hev0y1qt" data-path="components/players/PlayerCard.js">{player.display_name}</h3>
        
        <div className="flex justify-center mb-4" data-id="vsybmljip" data-path="components/players/PlayerCard.js">
          <span className={`px-2 py-1 text-xs rounded border ${getSkillBadgeClass(player.skill_level)}`} data-id="ruf49up5u" data-path="components/players/PlayerCard.js">
            {formatSkillLevel(player.skill_level)}
          </span>
        </div>
        
        <div className="flex justify-center space-x-4 mb-4" data-id="7eqrx47aj" data-path="components/players/PlayerCard.js">
          <div className="text-center" data-id="j1tokx8jt" data-path="components/players/PlayerCard.js">
            <div className="text-lg font-semibold" data-id="a9zc0axje" data-path="components/players/PlayerCard.js">{player.wins || 0}</div>
            <div className="text-xs text-gray-500" data-id="ryvwefamm" data-path="components/players/PlayerCard.js">Wins</div>
          </div>
          <div className="text-center" data-id="nbu8nfish" data-path="components/players/PlayerCard.js">
            <div className="text-lg font-semibold" data-id="41cnkb7z1" data-path="components/players/PlayerCard.js">{player.losses || 0}</div>
            <div className="text-xs text-gray-500" data-id="a0nuzmtp3" data-path="components/players/PlayerCard.js">Losses</div>
          </div>
          <div className="text-center" data-id="wsrvwt6xw" data-path="components/players/PlayerCard.js">
            <div className="text-lg font-semibold" data-id="m3frjy65y" data-path="components/players/PlayerCard.js">{calculateWinRate()}%</div>
            <div className="text-xs text-gray-500" data-id="hjletrq84" data-path="components/players/PlayerCard.js">Win Rate</div>
          </div>
        </div>

        <div className="mb-4" data-id="tg664cejx" data-path="components/players/PlayerCard.js">
          <div className="text-center text-gray-600 text-sm" data-id="c017wsao4" data-path="components/players/PlayerCard.js">
            {player.bio || 'No bio available'}
          </div>
          {player.location &&
          <div className="text-center text-gray-500 text-xs mt-1" data-id="bsppl2p7p" data-path="components/players/PlayerCard.js">
              <i className="fas fa-map-marker-alt mr-1" data-id="7suprpy20" data-path="components/players/PlayerCard.js"></i> {player.location}
            </div>
          }
        </div>
        
        <div className="flex justify-center" data-id="cdarjo5d2" data-path="components/players/PlayerCard.js">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/players/${player.ID}`)}
            icon={<i className="fas fa-user" data-id="jjnjj88lb" data-path="components/players/PlayerCard.js"></i>}>

            View Profile
          </Button>
          
          {showChallengeButton && !isActivePlayer &&
          <Button
            variant="primary"
            size="sm"
            className="ml-2"
            onClick={() => onChallengeClick(player)}
            icon={<i className="fas fa-trophy" data-id="2e36splez" data-path="components/players/PlayerCard.js"></i>}>

              Challenge
            </Button>
          }
        </div>
      </div>
    </div>);
}