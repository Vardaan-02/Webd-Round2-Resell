import { defaultValue } from "@/lib/cart";
import { CartItem } from "@/types/Item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function checkLocalStorageForCart(): CartItem[] {
  const item = window.localStorage.getItem("cart");
  return item ? JSON.parse(item) : defaultValue;
}

const initialState: CartItem[] = checkLocalStorageForCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newState = [...state, action.payload];
      window.localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    removeItem(state, action: PayloadAction<number>) {
      const newState = state.filter((item) => item.id !== action.payload);
      window.localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: number; newQuantity: number }>
    ) {
      const { id, newQuantity } = action.payload;
      const newState = state.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      );
      window.localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state;
      window.localStorage.setItem("cart", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, setCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
