import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function checkLocalStorageForCurrentConversation(): number {
  const item = window.localStorage.getItem("currentConversation");
  return item ? JSON.parse(item) : -1;
}

const initialState: number = checkLocalStorageForCurrentConversation();

const currentConversationSlice = createSlice({
  name: "currentConversation",
  initialState,
  reducers: {
    setCurrentConversation(state: number, action: PayloadAction<number>) {
      state;
      const conversationId = action.payload;
      window.localStorage.setItem(
        "currentConversation",
        JSON.stringify(conversationId)
      );
      return conversationId;
    },
  },
});

export const { setCurrentConversation } = currentConversationSlice.actions;
export default currentConversationSlice.reducer;
