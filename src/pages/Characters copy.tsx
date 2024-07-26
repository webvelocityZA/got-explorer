// import { Link } from "react-router-dom";
// import images from "@images";

// const keyCharacters = [
//   { id: 583, name: "Jon Snow" },
//   { id: 1303, name: "Daenerys Targaryen" },
//   { id: 148, name: "Arya Stark" },
//   { id: 238, name: "Cersei Lannister" },
//   { id: 529, name: "Jaime Lannister" },
//   { id: 957, name: "Sansa Stark" },
//   { id: 210, name: "Brandon Stark" },
//   { id: 1052, name: "Tyrion Lannister" },
// ];

// const getCharacterImage = (name) => {
//   const normalizedName = name.toLowerCase().replace(/\s+/g, "_");
//   const possibleKeys = Object.keys(images).filter(
//     (key) =>
//       key.toLowerCase().includes(normalizedName) ||
//       normalizedName.includes(key.toLowerCase())
//   );

//   if (possibleKeys.length > 0) {
//     return images[possibleKeys[0]];
//   }

//   return images.default_character || "path/to/default/image.jpg";
// };

// export default function Characters() {
//   return (
//     <div className="flex h-screen overflow-hidden text-gray-100">
//       {/* Side banner */}
//       <div className="w-1/4 relative">
//         <img
//           src={images.characters_bg}
//           alt="Game of Thrones Banner"
//           className="h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <h1 className="text-4xl thrones-font font-bold text-center text-gray-100 font-serif">
//             Characters
//           </h1>
//         </div>
//       </div>

//       {/* Character grid */}
//       <div className="w-3/4 p-8 overflow-y-auto">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {keyCharacters.map((char) => (
//             <Link
//               key={char.id}
//               to={`/character/${char.id}`}
//               className="group"
//             >
//               <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105">
//                 <img
//                   src={getCharacterImage(char.name)}
//                   alt={char.name}
//                   className="w-full h-64 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                   <h2 className="text-xl font-bold">{char.name}</h2>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }