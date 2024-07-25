import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="container mx-auto p-4 bg-red-300">
      <h1 className="text-4xl font-bold mb-4 text-">
        Welcome to Game of <br /> Thrones Explorer
      </h1>
      <p className="mb-12">
        Dive into the world of Ice and Fire. Explore the rich tapestry of
        characters and noble houses that make up the Game of Thrones universe.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/characters"
          className="block px-6 py-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2">Characters</h2>
          <p>Discover the complex characters that bring the story to life.</p>
        </Link>
        <Link
          to="/houses"
          className="block px-6 py-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2">Houses</h2>
          <p>Explore the great houses of Westeros and their rich histories.</p>
        </Link>
      </div>
    </div>
  );
}
