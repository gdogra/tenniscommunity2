function NotFound() {
  const navigate = ReactRouterDOM.useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12" data-id="2v14o1gbx" data-path="pages/NotFound.js">
      <div className="text-primary text-9xl mb-4" data-id="jxhfks6tk" data-path="pages/NotFound.js">
        <i className="fas fa-tennis-ball" data-id="fhta5y76v" data-path="pages/NotFound.js"></i>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2" data-id="avzzxmnrv" data-path="pages/NotFound.js">404</h1>
      <h2 className="text-2xl font-medium text-gray-700 mb-6" data-id="6zydwk8ce" data-path="pages/NotFound.js">Page Not Found</h2>
      <p className="text-gray-500 max-w-md text-center mb-8" data-id="gpr004794" data-path="pages/NotFound.js">
        Sorry, we couldn't find the page you're looking for. The ball seems to have gone out of bounds!
      </p>
      <div className="flex space-x-4" data-id="a8it3bcfs" data-path="pages/NotFound.js">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          icon={<i className="fas fa-arrow-left" data-id="7xsyruptw" data-path="pages/NotFound.js"></i>}>

          Go Back
        </Button>
        <Button
          onClick={() => navigate('/')}
          icon={<i className="fas fa-home" data-id="yaqmygbt0" data-path="pages/NotFound.js"></i>}>

          Go Home
        </Button>
      </div>
    </div>);

}