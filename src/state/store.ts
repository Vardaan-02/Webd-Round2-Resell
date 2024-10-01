import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme/themeSlice";
import categorySlice from "./category/categorySlice";
import userSlice from "./userDetails/userDetails";
import currentConversationSlice from "./currentConversation/currentConversationSlice";
import tabSlice from "./tab/tabSlice";
import cartSlice from "./Cart/cartSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    category: categorySlice,
    user: userSlice,
    currentConversation: currentConversationSlice,
    tab: tabSlice,
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
