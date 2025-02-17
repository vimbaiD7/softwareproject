import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/food-background.jpg')", // Ensure this path is correct
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold text-orange-600 mb-6">
          Welcome to Foodie Network!
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Discover delicious recipes, popular dishes, and share your own culinary creations!
        </p>
        <div className="mt-6">
          <Link
            to="/explore"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600"
          >
            Explore Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
