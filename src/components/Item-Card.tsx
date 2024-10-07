import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { item } from "@/types/Item";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "@/state/tab/tabSlice";
import { addItem, updateQuantity } from "@/state/Cart/cartSlice";
import { RootState } from "@/state/store";
import toast, { Toaster } from "react-hot-toast";

export default function ItemCard({
  id,
  name,
  currentPrice,
  originalPrice,
  image,
  condition,
  sellerName,
  sellerAvatar,
  rating,
  timeListedAgo,
  distance,
}: item) {
  const [isHovered, setIsHovered] = useState(false);
  const discountPercentage = Math.round(
    (1 - currentPrice / originalPrice) * 100
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  function handleCart(id: number) {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      toast.success("Quantity Updated");
      dispatch(
        updateQuantity({
          id: id,
          newQuantity: existingItem.quantity + 1,
        })
      );
    } else {
      toast.success("Item Added");
      dispatch(
        addItem({
          quantity: 1,
          id,
          name,
          currentPrice,
          originalPrice,
          image,
          condition,
          sellerName,
          sellerAvatar,
          rating,
          timeListedAgo,
          distance,
        })
      );
    }
  }

  return (
    <>
      <Card
        className={`w-full max-w-sm transition-all duration-300 ease-in-out transform hover:shadow-2xl max-h-[600px] hover:shadow-black shadow-lg ${
          isHovered ? "scale-[102%]" : "scale-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={()=>{
          navigate(`/buy/product/${id}`)
        }}
      >
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
            />
            {discountPercentage >= 20 && (
              <Badge className="absolute top-2 left-2 bg-green-500">
                Good deal
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-2xl font-bold text-primary">
                ${currentPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm line-through text-gray-500">
                ${originalPrice.toFixed(2)}
              </span>
            </div>
            <Badge variant="secondary">{condition}</Badge>
          </div>
          <div className="flex items-center mb-2">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={sellerAvatar} alt={sellerName} />
              <AvatarFallback>{sellerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{sellerName}</span>
            <div className="ml-auto flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{rating}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Listed {timeListedAgo} || {distance} miles away
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Link
            to={`/message/${sellerName}`}
            onClick={() => {
              dispatch(setTab("message"));
            }}
          >
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" /> Message
            </Button>
          </Link>
          <Button onClick={() => handleCart(id)}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </>
  );
}
