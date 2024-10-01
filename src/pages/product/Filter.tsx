import { SingleSlider } from "@/components/Slider";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface PROPS {
  price: number;
  location: number;
  quality: string;
  rating: number;
  setPrice: (value: unknown) => void;
  setLocation: (value: unknown) => void;
  setQuality: (value: unknown) => void;
  setRating: (value: unknown) => void;
  getPrice: () => void;
  getLocation: () => void;
  getQuality: () => void;
  getRating: () => void;
}

export default function Filter({
  price,
  location,
  quality,
  rating,
  setPrice,
  setLocation,
  setQuality,
  setRating,
  getPrice,
  getLocation,
  getQuality,
  getRating,
}: PROPS) {
  const { tag } = useParams();

  useEffect(() => {
    if (getPrice() === undefined) setPrice(10000);
    else setPrice(getPrice());
    if (getLocation() === undefined) setLocation(100);
    else setLocation(getLocation());
    if (getQuality() === undefined) setQuality("Working");
    else setQuality(getQuality());
    if (getRating() === undefined) setRating(1);
    else setRating(getRating());
  }, [tag]);

  const getRatingString = () => {
    if (rating === 1) return "1";
    else if (rating === 2) return "2";
    else if (rating === 3) return "3";
    else if (rating === 4) return "4";
    else return "5";
  };

  return (
    <>
      <div className="w-96 shadow-lg shadow-black dark:bg-zinc-900 h-screen p-8">
        <h1 className="font-bold text-2xl">Price</h1>
        <SingleSlider max={1000} min={0} value={price} setValue={setPrice} />

        <div className="my-4">
          <h1 className="font-bold text-2xl py-4">Quality</h1>
          <RadioGroup value={quality} onValueChange={setQuality}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Working" id="c1" />
              <Label htmlFor="c1">Working</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Comfortable" id="c2" />
              <Label htmlFor="c2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Excellent" id="c3" />
              <Label htmlFor="c3">Excellent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Just Bought" id="c4" />
              <Label htmlFor="c4">Just Bought</Label>
            </div>
          </RadioGroup>
        </div>

        <h1 className="font-bold text-2xl mt-16">Location</h1>
        <SingleSlider
          max={100}
          min={0}
          value={location}
          setValue={setLocation}
        />

        <div className="my-4">
          <h1 className="font-bold text-2xl py-4">Seller Confidence</h1>
          <RadioGroup value={getRatingString()}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="1"
                id="r1"
                onClick={() => {
                  setRating(1);
                }}
              />
              <Label htmlFor="r1">Above 1</Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                setRating(2);
              }}
            >
              <RadioGroupItem value="2" id="r2" />
              <Label htmlFor="r2">Above 2</Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                setRating(3);
              }}
            >
              <RadioGroupItem value="3" id="r3" />
              <Label htmlFor="r3">Above 3</Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                setRating(4);
              }}
            >
              <RadioGroupItem value="4" id="r4" />
              <Label htmlFor="r4">Above 4</Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                setRating(5);
              }}
            >
              <RadioGroupItem value="5" id="r5" />
              <Label htmlFor="r5">I want 5</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
}
