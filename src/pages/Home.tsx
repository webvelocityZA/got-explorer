import images from "@images";
import { Castle, Sword } from "lucide-react";
import { Link } from "react-router-dom";

const BackgroundImage = () => (
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{
      backgroundImage: `url(${images.homepage_bg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}
  />
);

const Logo = () => (
  <div className="mb-8">
    <h1 className="text-6xl font-bold text-center text-gray-200 thrones-font tracking-wider">
      Game of Thrones
    </h1>
    <p className="text-xl text-center text-gray-300 mt-2">Explorer</p>
  </div>
);

const NavButton = ({ to, text }: { to: string; text: string }) => (
  <Link
    to={to}
    className="flex items-center justify-center px-6 py-4 bg-gray-900 bg-opacity-100 rounded-lg hover:bg-opacity-90 transition-all duration-300 group"
  >
    <span className="ml-3 text-xl font-semibold group-hover:text-yellow-400 transition-colors duration-300 uppercase">
      {text}
    </span>
  </Link>
);

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundImage />

      <div className="relative z-10 text-white text-center p-8">
        <Logo />

        <p className="mb-12 text-lg text-gray-300 max-w-2xl mx-auto">
          Dive into the world of Ice and Fire. Explore the rich tapestry of
          characters and noble houses that make up the Game of Thrones universe.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <NavButton
            to="/houses"
            icon={<Castle size={24} className="text-yellow-500" />}
            text="Houses"
          />
          <NavButton
            to="/characters"
            icon={<Sword size={24} className="text-red-500" />}
            text="Characters"
          />
        </div>
      </div>
    </div>
  );
}
