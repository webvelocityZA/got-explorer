import { Link } from "react-router-dom";
import images from "@images";

export default function Characters() {
  const keyCharacters = [
    { id: 583, name: "Jon Snow" },
    { id: 1303, name: "Daenerys Targaryen" },
    { id: 210, name: "Brandon Stark" },
  ];

  // Function to find the best matching image for the character
  const getCharacterImage = (name: string) => {
    const normalizedName = name.toLowerCase().replace(/\s+/g, "_");
    const possibleKeys = Object.keys(images).filter(
      (key) =>
        key.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(key.toLowerCase())
    );

    if (possibleKeys.length > 0) {
      // Use the first matching image found
      return images[possibleKeys[0]];
    }

    // If no matching image is found, return a default image
    return images.default_character || "jon snow";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-12">Character Explorer</h1>
      <nav aria-label="Character list">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {keyCharacters.map((char) => (
            <li key={char.id}>
              <Link
                to={`/character/${char.id}`}
                className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={getCharacterImage(char.name)}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  aria-hidden="true"
                />
                <span className="text-lg font-semibold text-blue-600 hover:underline">
                  {char.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}