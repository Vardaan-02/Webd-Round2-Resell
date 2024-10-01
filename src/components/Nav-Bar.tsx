import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Link } from "react-router-dom";
import DarkLightToggleButton from "./Dark-Light-Toggle-Button";
import { locations } from "@/lib/locations";
import MobileNavBar from "./Mobile-Nav-Bar";
import SearchProduct from "./SearchProduct";
import ItemPicker from "./Item-Picker";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "@/state/tab/tabSlice";
import { CartItem } from "@/types/Item";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState("Delhi");

  const tab = useSelector((state: RootState) => state.tab);

  const cart = useSelector((state: RootState) => state.cart);

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  const dispatch = useDispatch();

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow-md z-10 fixed w-screen">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              GEEKHEAVEN
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4 w-[80%] justify-between">
            <div className="flex gap-12 items-center justify-between">
              <Popover>
                <div className="w-36">
                  <ItemPicker
                    itemList={locations}
                    value={location}
                    setValue={setLocation}
                  />
                </div>
              </Popover>
              <SearchProduct />
              <Link
                to="/"
                className={`text-gray-700 dark:text-white transition-all underline-offset-8 ${
                  tab === "home" && "font-bold underline text-violet-700"
                }`}
                onClick={() => dispatch(setTab("home"))}
              >
                Home
              </Link>
              <Link
                to="/product"
                className={`text-gray-700 dark:text-white transition-all underline-offset-8 ${
                  tab === "product" && "font-bold underline text-violet-700"
                }`}
                onClick={() => dispatch(setTab("product"))}
              >
                Product
              </Link>
              <Link
                to="/message"
                className={`text-gray-700 dark:text-white transition-all underline-offset-8 ${
                  tab === "message" && "font-bold underline text-violet-700"
                }`}
                onClick={() => dispatch(setTab("message"))}
              >
                Message
              </Link>
            </div>

            <div className="flex gap-4">
              <DarkLightToggleButton />

              <Link to="/cart">
                <Button variant="ghost" className="relative">
                  <ShoppingCart size={20} />
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {subtotal}
                  </span>
                </Button>
              </Link>
              <div className="flex justify-between items-center gap-4">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/SignUp">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>

          <MobileNavBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            location={location}
            setLocation={setLocation}
            setTab={setTab}
            tab={tab}
          />
        </div>
      </div>
    </nav>
  );
}
