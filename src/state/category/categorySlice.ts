import { createSlice } from "@reduxjs/toolkit";

function checkLocalStorageForCategory(): string {
  const item = window.localStorage.getItem("category");
  return typeof item === "string" ? item : "Electronics";
}

const initialState: string = checkLocalStorageForCategory();

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state:String,payload){
      state;
        window.localStorage.setItem("category", payload.payload);
        return payload.payload;
    }
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
