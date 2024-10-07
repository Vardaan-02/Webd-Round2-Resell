import { Button } from "@/components/ui/button";
import Navbar from "@/components/Nav-Bar";
import { Link } from "react-router-dom";
import { tags } from "@/lib/tags";
import ItemCard from "@/components/Item-Card";
import { featuredProducts } from "@/lib/products";

export default function HomePage() {
  const categories = tags.filter((_, index) => index < 8);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col pt-20">
        <main className="flex-grow container mx-auto p-4">
          <section className="mb-8">
            <div className="relative h-[70vh] bg-gray-300 rounded-lg overflow-hidden">
              <img
                src="https://images.morecustomersapp.com/uploads/2020/08/banner-and-eCommerce.jpg"
                alt="Featured products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-4xl font-bold text-center">
                  Welcome to GeekHeaven
                </h2>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  to={`/product/${category}`}
                  className="flex h-full w-full"
                >
                  <Button
                    key={category}
                    variant="outline"
                    className="h-24 text-lg w-full"
                  >
                    {category}
                  </Button>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  currentPrice={item.currentPrice}
                  originalPrice={item.originalPrice}
                  image={item.image}
                  sellerName={item.sellerName}
                  sellerAvatar={item.sellerAvatar}
                  condition={item.condition}
                  rating={item.rating}
                  timeListedAgo={item.timeListedAgo}
                  distance={item.distance}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Investor Relations
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Make Money with Us
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Sell products on GeekHeaven
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Become an Affiliate
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Advertise Your Products
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  GeekHeaven Payment Products
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      GeekHeaven Rewards Visa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      GeekHeaven Store Card
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      GeekHeaven Business Card
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Your Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Your Orders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Shipping Rates & Policies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Returns & Replacements
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Help
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p>&copy; 2024 GeekHeaven. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
