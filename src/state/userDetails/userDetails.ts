import { LoginDetails } from '@/types/UserProfile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Function to load user from local storage
const loadUserFromLocalStorage = (): LoginDetails | null => {
  const userFromLocalStorage = localStorage.getItem('user');
  return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
};

// Define the initial state of the user slice
const initialState: {
  user: LoginDetails | null;  // user details can be null if not logged in
  isLoggedIn: boolean; // to track login status
} = {
  user: loadUserFromLocalStorage(), // Load user from local storage
  isLoggedIn: !!loadUserFromLocalStorage(), // Check if user exists to determine login status
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user details on login
    setUser: (state, action: PayloadAction<LoginDetails>) => {
      state.user = action.payload; // Set user details
      state.isLoggedIn = true;      // Set login status to true
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store in local storage
    },
    // Action to clear user details on logout
    clearUser: (state) => {
      state.user = null;            // Clear user details
      state.isLoggedIn = false;     // Set login status to false
      localStorage.removeItem('user'); // Remove from local storage
    },
  },
});

// Export the actions for use in components
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer to be used in the Redux store
export default userSlice.reducer;
