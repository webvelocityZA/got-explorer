import images from "@images";
import { Link } from "react-router-dom";

interface NavigationButtonProps {
  to: string;
  text: string;
}

const BackgroundImage = () => (
  <div className="absolute inset-0 z-0">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${images.homepage_bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
    <div className="absolute inset-0 bg-black opacity-55" />
  </div>
);

const Logo = () => (
  <div className="mb-8">
    <h1 className="text-6xl font-bold text-center text-gray-200 thrones-font tracking-wider">
      Game of Thrones
    </h1>
    <p className="text-2xl text-center text-gray-300 mt-2 uppercase">Explorer</p>
  </div>
);

const NavButton: React.FC<NavigationButtonProps> = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="w-10/12 md:w-auto flex items-center justify-center px-6 py-4 
                 bg-black bg-opacity-100 rounded-lg 
                 hover:bg-opacity-95 hover:shadow-md
                 transition-all duration-300 ease-in-out group"
    >
      <span className="ml-3 text-xl font-semibold group-hover:text-yellow-400 
                       transition-colors duration-300 uppercase">
        {text}
      </span>
    </Link>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundImage />

      <div className="relative z-10 text-white text-center p-8">
        <Logo />

        <p className="mb-16 text-2xl text-gray-300 max-w-2xl mx-auto tracking-wider">
          Dive into the world of Ice and Fire. Explore the rich tapestry of
          characters and noble houses that make up the Game of Thrones universe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <NavButton to="/houses" text="Houses" />
          <NavButton to="/characters" text="Characters" />
        </div>
      </div>
    </div>
  );
}
