import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Popover } from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { locations } from "@/lib/locations";
import ItemPicker from "./Item-Picker";
import SearchProduct from "./SearchProduct";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CartItem } from "@/types/Item";
import { setTab } from "@/state/tab/tabSlice";

interface PROPS {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setTab: (value: unknown) => void;
  tab: string;
}

export default function MobileNavBar({
  isMenuOpen,
  setIsMenuOpen,
  setLocation,
  location,
}: PROPS) {
  const cart = useSelector((state: RootState) => state.cart);

  const tab = useSelector((state: RootState) => state.tab);
  const dispatch = useDispatch();

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  return (
    <div className="md:hidden">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <div
          className={`fixed top-0 right-0 h-full bg-white dark:bg-zinc-900 shadow-md w-[300px] sm:w-[400px] transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <div className="flex flex-col space-y-4 mt-4">
            <Popover>
              <div className="ml-7 w-[86%]">
                <ItemPicker
                  itemList={locations}
                  value={location}
                  setValue={setLocation}
                />
              </div>
            </Popover>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 w-[80%] ml-7"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 translate-x-4">
                <SearchProduct />
              </div>
            </div>

            <div className="flex flex-col gap-4 py-8 justify-center items-center">
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

            <div className="flex justify-center items-center flex-col gap-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/SignUp">
                <Button>Sign Up</Button>
              </Link>
              <Button variant="ghost" className="justify-start mt-8">
                <ShoppingCart size={20} className="mr-2" />
                Cart ({subtotal})
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </Sheet>
    </div>
  );
}
