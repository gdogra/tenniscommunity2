function Home() {
  const navigate = ReactRouterDOM.useNavigate();
  const { currentUser } = useAuth();
  const { playerProfiles } = useFirestore();
  const [topPlayers, setTopPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const players = await playerProfiles.getAll();
        // Sort players by points and take top 3
        const sortedPlayers = [...players].sort((a, b) => b.points - a.points).slice(0, 3);
        setTopPlayers(sortedPlayers);
      } catch (err) {
        console.error('Error fetching top players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlayers();
  }, []);

  return (
    <div data-id="c3uu3siqs" data-path="pages/Home.js">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4 rounded-lg shadow-md mb-8" data-id="7cw92lsm5" data-path="pages/Home.js">
        <div className="max-w-3xl mx-auto text-center" data-id="16wztcl0e" data-path="pages/Home.js">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-id="ytna1sou3" data-path="pages/Home.js">
            Welcome to Tennis Community
          </h1>
          <p className="text-lg md:text-xl mb-8" data-id="scpbmt46b" data-path="pages/Home.js">
            Connect with local tennis players, track matches, and improve your game
          </p>
          {currentUser ?
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="bg-white text-primary hover:bg-gray-100"
            icon={<i className="fas fa-tachometer-alt" data-id="e5hisveyl" data-path="pages/Home.js"></i>}>
              Go to Dashboard
            </Button> :

          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="rxovxjcvj" data-path="pages/Home.js">
              <Button
              size="lg"
              onClick={() => navigate('/login')}
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20">
                Sign In
              </Button>
              <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-white text-primary hover:bg-gray-100">
                Join Now
              </Button>
            </div>
          }
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mb-12" data-id="dw6b9reh6" data-path="pages/Home.js">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8" data-id="d1x6w4ucu" data-path="pages/Home.js">
          Why Join Our Tennis Community?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="r6mrw7deq" data-path="pages/Home.js">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" data-id="lj23xfk8q" data-path="pages/Home.js">
            <div className="text-primary text-3xl mb-4" data-id="o1fwtwlqa" data-path="pages/Home.js">
              <i className="fas fa-user-friends" data-id="g0ryqqfg0" data-path="pages/Home.js"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2" data-id="r1jrvw93m" data-path="pages/Home.js">Find Players</h3>
            <p className="text-gray-600" data-id="g67tlfvqj" data-path="pages/Home.js">
              Connect with tennis players of similar skill levels in your area.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" data-id="88urtu6zh" data-path="pages/Home.js">
            <div className="text-primary text-3xl mb-4" data-id="78vko0gg9" data-path="pages/Home.js">
              <i className="fas fa-trophy" data-id="niiywdftr" data-path="pages/Home.js"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2" data-id="h9j83lx9f" data-path="pages/Home.js">Challenge Matches</h3>
            <p className="text-gray-600" data-id="cvwxmenn7" data-path="pages/Home.js">
              Issue and accept challenges to play matches with other members.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" data-id="yqr8u19a1" data-path="pages/Home.js">
            <div className="text-primary text-3xl mb-4" data-id="fky4wm1wi" data-path="pages/Home.js">
              <i className="fas fa-chart-line" data-id="k21z2e29s" data-path="pages/Home.js"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2" data-id="rpdsxl2y1" data-path="pages/Home.js">Track Progress</h3>
            <p className="text-gray-600" data-id="yhogy46x9" data-path="pages/Home.js">
              Keep track of your match history and see how you rank among others.
            </p>
          </div>
        </div>
      </div>
      
      {/* Top Players Section */}
      <div className="mb-12" data-id="7ttp5og2r" data-path="pages/Home.js">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2" data-id="ypmzh0tgj" data-path="pages/Home.js">
          Top Players
        </h2>
        <p className="text-center text-gray-600 mb-8" data-id="48ah6kqsn" data-path="pages/Home.js">
          Our community's highest ranked players
        </p>
        
        {loading ?
        <div className="flex justify-center py-8" data-id="8kk6lij91" data-path="pages/Home.js">
            <LoadingSpinner size="lg" />
          </div> :

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="cezcv1l4m" data-path="pages/Home.js">
            {topPlayers.length > 0 ? topPlayers.map((player, index) =>
          <div key={player.ID} className="bg-white p-6 rounded-lg shadow-md border border-gray-200" data-id="zu809ww6w" data-path="pages/Home.js">
                <div className="text-center mb-4" data-id="iez6bjv2x" data-path="pages/Home.js">
                  {index === 0 &&
              <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-2" data-id="21nnyfsmd" data-path="pages/Home.js">
                      <i className="fas fa-crown mr-1" data-id="3z99bd891" data-path="pages/Home.js"></i> Top Player
                    </div>
              }
                  <div className="flex justify-center mb-4" data-id="fuch62lt0" data-path="pages/Home.js">
                    <img
                  src={player.profile_image || `https://ui-avatars.com/api/?name=${player.display_name}&background=16a34a&color=fff`}
                  alt={player.display_name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" data-id="oib01k0o0" data-path="pages/Home.js" />
                  </div>
                  <h3 className="text-lg font-semibold" data-id="sqdlzsrtv" data-path="pages/Home.js">{player.display_name}</h3>
                  <p className="text-gray-500" data-id="ox4mbmjn7" data-path="pages/Home.js">Level {player.skill_level} Player</p>
                </div>
                
                <div className="flex justify-around" data-id="qkf5s1qus" data-path="pages/Home.js">
                  <div className="text-center" data-id="5e20w3fwy" data-path="pages/Home.js">
                    <div className="text-2xl font-bold text-green-600" data-id="objvgmduw" data-path="pages/Home.js">{player.wins || 0}</div>
                    <div className="text-sm text-gray-500" data-id="6b0ccts73" data-path="pages/Home.js">Wins</div>
                  </div>
                  <div className="text-center" data-id="20px0agg3" data-path="pages/Home.js">
                    <div className="text-2xl font-bold text-red-600" data-id="v9yi1jku1" data-path="pages/Home.js">{player.losses || 0}</div>
                    <div className="text-sm text-gray-500" data-id="d2pv67ovt" data-path="pages/Home.js">Losses</div>
                  </div>
                  <div className="text-center" data-id="zod93hb2f" data-path="pages/Home.js">
                    <div className="text-2xl font-bold text-gray-800" data-id="0lkn2a25n" data-path="pages/Home.js">
                      {player.wins !== undefined && player.losses !== undefined &&
                  parseInt(player.wins) + parseInt(player.losses) > 0 ?
                  `${Math.round(parseInt(player.wins) / (parseInt(player.wins) + parseInt(player.losses)) * 100)}%` :
                  '0%'}
                    </div>
                    <div className="text-sm text-gray-500" data-id="xendrgs02" data-path="pages/Home.js">Win Rate</div>
                  </div>
                </div>
              </div>
          ) :
          <div className="col-span-3 text-center py-8" data-id="2nzbalg40" data-path="pages/Home.js">
            <div className="text-gray-400 text-4xl mb-4" data-id="f5taci3bk" data-path="pages/Home.js">
              <i className="fas fa-users" data-id="eqrzv7fwk" data-path="pages/Home.js"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-1" data-id="agcsdwum0" data-path="pages/Home.js">No players have joined yet</h3>
            <p className="text-gray-500" data-id="j9sq2t7co" data-path="pages/Home.js">Be the first to join our community!</p>
          </div>
          }
          </div>
        }
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center" data-id="z2o2xa5cn" data-path="pages/Home.js">
        <h2 className="text-2xl font-bold text-gray-800 mb-4" data-id="bxzykixob" data-path="pages/Home.js">
          Ready to join our community?
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto" data-id="l3kgq97ul" data-path="pages/Home.js">
          Sign up today and start connecting with tennis players in your area.
        </p>
        
        {currentUser ?
        <Button
          size="lg"
          onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button> :

        <Button
          size="lg"
          onClick={() => navigate('/register')}>
            Create Your Account
          </Button>
        }
      </div>
    </div>);
}