import { Star, Truck, ArrowLeft, Heart, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import toast, { Toaster } from "react-hot-toast";
import { addItem, updateQuantity } from "@/state/Cart/cartSlice";
import { item } from "@/types/Item";
import { useParams } from "react-router-dom";

export default function IndividualPage() {
  const { id } = useParams();
  const ID: number = Number(id);

  const dispatch = useDispatch();

  const [item, setItem] = useState<item>(products[0]);
  useEffect(() => {
    const foundItem = products.find((item) => item.id === ID)!;
    setItem(foundItem);
  }, []);

  const cart = useSelector((state: RootState) => state.cart);

  function handleCart(id: number) {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      toast.success("Quantity Updated");
      dispatch(
        updateQuantity({
          id: ID,
          newQuantity: existingItem.quantity + 1,
        })
      );
    } else {
      toast.success("Item Added");
      dispatch(
        addItem({
          quantity: 1,
          id: item.id,
          name: item.name,
          currentPrice: item.currentPrice,
          originalPrice: item.originalPrice,
          image: item.image,
          condition: item.condition,
          sellerName: item.sellerName,
          sellerAvatar: item.sellerAvatar,
          rating: item.rating,
          timeListedAgo: item.timeListedAgo,
          distance: item.distance,
        })
      );
    }
  }

  const images = [
    "https://img.freepik.com/free-photo/freshness-beauty-nature-wet-drops-generated-by-ai_188544-42230.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727913600&semt=ais_hybrid",
    "https://c4.wallpaperflare.com/wallpaper/947/750/355/high-quality-backgrounds-nature-1920x1200-wallpaper-preview.jpg",
    "https://t3.ftcdn.net/jpg/08/05/77/36/360_F_805773651_sMo7ahYEeHpgwAY2oLZF9YYD7T9ge2fm.jpg",
    "https://c4.wallpaperflare.com/wallpaper/409/466/456/sunset-4k-1080p-high-quality-wallpaper-preview.jpg",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4 text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
      </Button>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={item.image}
              alt="Product Image"
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-4 left-4" variant="secondary">
              {item.condition}
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((item) => (
              <div
                key={item}
                className="aspect-square rounded-md overflow-hidden bg-gray-100"
              >
                <img src={item} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Name</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(Math.ceil(item.rating))].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({item.rating} Rating)
              </span>
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-primary">
              {item.currentPrice}
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              {item.originalPrice}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="flex-1" onClick={() => handleCart(ID)}>
              Add to Cart
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              <Heart className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center text-green-600 mb-2">
              <Truck className="h-5 w-5 mr-2" />
              Free delivery
            </div>
            <p className="text-sm text-gray-600">
              Listed <span className="font-semibold">{item.timeListedAgo}</span>{" "}
              •<span className="font-semibold"> {item.distance}</span> miles
              away
            </p>
          </div>
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-gray-600">
              <p>
                This is a detailed description of the product. It highlights the
                key features, benefits, and any other relevant information that
                would help a potential buyer make an informed decision.
              </p>
            </TabsContent>
            <TabsContent value="details" className="text-gray-600">
              <ul className="list-disc list-inside">
                <li>Quantity: random number</li>
                <li>Condition: {item.condition}</li>
                <li>Brand: BrandName</li>
                <li>Model: ModelNumber</li>
              </ul>
            </TabsContent>
            <TabsContent value="seller" className="text-gray-600">
              <p>
                Seller Name:{" "}
                <span className="font-semibold">{item.sellerName}</span>
                <br />
                Seller Rating: {item.rating}/5
                <br />
                Items Sold: 100+
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
