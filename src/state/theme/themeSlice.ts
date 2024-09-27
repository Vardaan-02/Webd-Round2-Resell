import { Theme } from "@/types/Theme";
import { createSlice } from "@reduxjs/toolkit";

// Helper function to get theme from localStorage
function checkLocalStorageForTheme(): Theme {
  const item = window.localStorage.getItem("theme");
  // Return item if found and valid, otherwise return default theme 'dark'
  return item === "light" || item === "dark" ? (item as Theme) : "dark";
}

// Set initial state from localStorage or default to 'dark'
const initialState: Theme = checkLocalStorageForTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Reducer to set the theme to 'dark'
    setDark: (state) => {
      window.localStorage.setItem("theme", "dark");
      return "dark";  // Ensure we return 'dark' which matches the Theme type
    },
    // Reducer to set the theme to 'light'
    setLight: (state) => {
      window.localStorage.setItem("theme", "light");
      return "light";  // Ensure we return 'light' which matches the Theme type
    },
  },
});

// Export the actions for use in components
export const { setDark, setLight } = themeSlice.actions;

// Export the reducer to be used in the Redux store
export default themeSlice.reducer;
