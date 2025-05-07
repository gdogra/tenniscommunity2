function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white border-t border-gray-200 mt-auto"
      data-id="rngmf8e5d"
      data-path="components/layout/Footer.js"
    >
      <div
        className="container mx-auto px-4 py-6"
        data-id="c1a33knl6"
        data-path="components/layout/Footer.js"
      >
        <div
          className="flex flex-col md:flex-row justify-between items-center"
          data-id="28l045aht"
          data-path="components/layout/Footer.js"
        >
          <div className="mb-4 md:mb-0" data-id="k11vy58vh" data-path="components/layout/Footer.js">
            <div
              className="flex items-center"
              data-id="4xpfhh8r7"
              data-path="components/layout/Footer.js"
            >
              <div
                className="text-primary mr-2"
                data-id="5n6h3ixfp"
                data-path="components/layout/Footer.js"
              >
                <i
                  className="fas fa-tennis-ball"
                  data-id="yb3ak9870"
                  data-path="components/layout/Footer.js"
                ></i>
              </div>
              <span
                className="font-bold text-gray-800"
                data-id="wy1cwj9xr"
                data-path="components/layout/Footer.js"
              >
                Tennis Community
              </span>
            </div>
            <p
              className="text-gray-500 text-sm mt-1"
              data-id="3m0614xr1"
              data-path="components/layout/Footer.js"
            >
              Connect with local tennis players and improve your game
            </p>
          </div>

          <div
            className="flex flex-col items-center md:items-end"
            data-id="3x09an3a5"
            data-path="components/layout/Footer.js"
          >
            <div
              className="flex space-x-4 mb-2"
              data-id="ii7fiikyy"
              data-path="components/layout/Footer.js"
            >
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
                data-id="yjbhoibd3"
                data-path="components/layout/Footer.js"
              >
                <i
                  className="fab fa-facebook-f"
                  data-id="y4ndgdxom"
                  data-path="components/layout/Footer.js"
                ></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
                data-id="twtvsqsiw"
                data-path="components/layout/Footer.js"
              >
                <i
                  className="fab fa-twitter"
                  data-id="gc4n5d4fe"
                  data-path="components/layout/Footer.js"
                ></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
                data-id="1ueoeloks"
                data-path="components/layout/Footer.js"
              >
                <i
                  className="fab fa-instagram"
                  data-id="dssslvfw0"
                  data-path="components/layout/Footer.js"
                ></i>
              </a>
            </div>
            <p
              className="text-gray-500 text-sm"
              data-id="r48oc49l0"
              data-path="components/layout/Footer.js"
            >
              &copy; {currentYear} Tennis Community. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
