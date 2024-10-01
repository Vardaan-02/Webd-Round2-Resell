export type item = {
  id: number;
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
  condition: "Working"|"Comfortable"|"Excellent"|"Just Bought";
  sellerName: string;
  sellerAvatar: string;
  rating: number;
  timeListedAgo: string;
  distance:number;
};

export interface CartItem extends item {
  quantity: number;
}