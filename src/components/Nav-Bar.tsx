import { useState } from "react";
import { Menu, Search, ShoppingCart, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import DarkLightToggleButton from "./Dark-Light-Toggle-Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { locations } from "@/lib/locations";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState("Delhi");
  const {setItem: setTab, getItem:getTab} = useLocalStorage("nav-tab");

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow-md">
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
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {location}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="grid gap-4">
                    <h4 className="font-medium leading-none">
                      Select Location
                    </h4>
                    {locations.map((loc) => (
                      <Button
                        key={loc}
                        variant="ghost"
                        className={`justify-start ${location===loc && "bg-gray-300 dark:bg-zinc-700"}`}
                        onClick={() => setLocation(loc)}
                      >
                        {loc}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <div className="relative flex">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 w-64"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
              <Link
                to="/"
                className={`text-gray-700 dark:text-white transition-all underline-offset-8 ${getTab()==='home' && "font-bold underline text-violet-700"}`}
                onClick={()=>setTab("home")}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-gray-700 dark:text-white transition-all underline-offset-8 ${getTab()==='product' && "font-bold underline text-violet-700"}`}
                onClick={()=>setTab("product")}
              >
                Products
              </Link>
            </div>

            <div className="flex gap-4">
              <DarkLightToggleButton />

              <Button variant="ghost" className="relative">
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
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

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center justify-start"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        {location}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                      <div className="grid gap-4">
                        <h4 className="font-medium leading-none">
                          Select Location
                        </h4>
                        {locations.map((loc) => (
                          <Button
                            key={loc}
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              setLocation(loc);
                              setIsMenuOpen(false);
                            }}
                          >
                            {loc}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10 pr-4"
                    />
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>

                  <div className="flex flex-col gap-4 py-8 justify-center items-center">
                    <Link
                      to="/"
                      className={`text-gray-700 dark:text-white transition-all underline-offset-8 ${getTab()==='home' && "font-bold underline text-violet-700"}`}
                      onClick={()=>setTab("home")}
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      className={`text-gray-700 dark:text-white transition-all underline-offset-8 ${getTab()==='product' && "font-bold underline text-violet-700"}`} 
                      onClick={()=>setTab("product")}
                    >
                      Products
                    </Link>
                  </div>

                  <Button variant="ghost">Login</Button>
                  <Button>Sign Up</Button>
                  <Button variant="ghost" className="justify-start">
                    <ShoppingCart size={20} className="mr-2" />
                    Cart (3)
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
