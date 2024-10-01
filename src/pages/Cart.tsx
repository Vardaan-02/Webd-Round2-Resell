import { Minus, Plus, X, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Nav-Bar";
import { CartItem } from "@/types/Item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { removeItem, updateQuantity } from "@/state/Cart/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.currentPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {cartItems.map((item: CartItem, index: number) => (
                    <div key={item.id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full md:w-40 h-40 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-xl font-semibold">
                                {item.name}
                              </h2>
                              <Badge variant="secondary" className="mt-1">
                                {item.condition}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => dispatch(removeItem(item.id))}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className="text-2xl font-bold text-primary">
                              ${item.currentPrice.toFixed(2)}
                            </span>
                            {item.currentPrice < item.originalPrice && (
                              <span className="ml-2 text-sm line-through text-gray-500">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-2">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={item.sellerAvatar}
                                alt={item.sellerName}
                              />
                              <AvatarFallback>
                                {item.sellerName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">
                              {item.sellerName}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span>{item.rating.toFixed(1)}</span>
                            <span className="mx-2">•</span>
                            <span>{item.timeListedAgo}</span>
                            <span className="mx-2">•</span>
                            <span>{item.distance.toFixed(1)} miles away</span>
                          </div>
                          <div className="flex items-center mt-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    newQuantity: item.quantity - 1,
                                  })
                                )
                              }
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="0"
                              value={item.quantity}
                              onChange={(e) =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    newQuantity: parseInt(e.target.value),
                                  })
                                )
                              }
                              className="w-16 mx-2 text-center"
                              aria-label={`Quantity of ${item.name}`}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    newQuantity: item.quantity + 1,
                                  })
                                )
                              }
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && (
                        <Separator className="my-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6" size="lg">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
