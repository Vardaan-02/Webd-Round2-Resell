import Navbar from "@/components/Nav-Bar";
import Filter from "./product/Filter";
import ItemCard from "@/components/Item-Card";
import { products } from "@/lib/products";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductPage() {
  const { tag } = useParams();

  const {
    setItem: setPrice,
    value: price,
    getItem: getPrice,
  } = useLocalStorage(tag + "/price", 1000);

  const {
    setItem: setLocation,
    value: location,
    getItem: getLocation,
  } = useLocalStorage(tag + "/distanceFromLocation", 100);

  const {
    setItem: setQuality,
    value: quality,
    getItem: getQuality,
  } = useLocalStorage(tag + "/quality", "Working");
  const {
    setItem: setRating,
    value: rating,
    getItem: getRating,
  } = useLocalStorage(tag + "/sellerConfidence", 1);

  const debouncedPrice = useDebounce(price, 500);
  const debouncedLocation = useDebounce(location, 500);

  const [items, setItems] = useState(products);

  useEffect(() => {
    setItems(
      products.filter((item) => {
        const matchesPrice = item.currentPrice <= debouncedPrice;

        const matchesQuality = (() => {
          if (quality === "Working") return true;
          else if (quality === "Comfortable")
            return item.condition !== "Working";
          else if (quality === "Excellent")
            return (
              item.condition === "Excellent" || item.condition === "Just Bought"
            );
          else if (quality === "Just Bought")
            return item.condition === "Just Bought";
        })();

        const matchesRating = item.rating >= rating;

        const matchesLocation = item.distance <= debouncedLocation;

        return (
          matchesPrice && matchesQuality && matchesRating && matchesLocation
        );
      })
    );
  }, [debouncedPrice, quality, rating, debouncedLocation, products]);

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen overflow-hidden pt-16">
        <div className="flex">
          <Filter
            price={price}
            location={location}
            quality={quality}
            rating={rating}
            setPrice={setPrice}
            setLocation={setLocation}
            setQuality={setQuality}
            setRating={setRating}
            getPrice={getPrice}
            getLocation={getLocation}
            getQuality={getQuality}
            getRating={getRating}
          />
          <div className=" h-screen p-8 flex gap-12 flex-wrap max-w-[80%] overflow-y-scroll justify-center pb-24 no-scrollbar">
            {items.map((item) => {
              return (
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
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
