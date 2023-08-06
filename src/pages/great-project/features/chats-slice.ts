import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getChatList } from "../../../api/chat";

export type TChat = {
  id: string;
  created_at: number;
  title: string;
  avatar: string;
  private: boolean;
  last_message: {
    created_at: 0;
    user_id: string;
    user_name: string;
    user_surname: string;
    you: boolean;
    message: string;
  };
  users: [
    {
      id: string;
      name: string;
      surname: string;
      avatar: string;
    }
  ];
  count_unread: number;
};

type TChatsInitalState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  response: TChat[];
  error: null;
  activeMessageId: null | string;
};

const initialState: TChatsInitalState = {
  status: "idle",
  response: [],
  error: null,

  activeMessageId: null,
};

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
  try {
    const { response } = await getChatList();
    if (response) {
      const chats: TChat[] = response;
      return chats;
    }
    throw new Error("Invalid response or data");
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveMessage(state, action: PayloadAction<{ messageId: string }>) {
      const { messageId } = action.payload;
      state.activeMessageId = messageId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        if (state.activeMessageId === null) {
          const firstChatId = action.payload[0].id;
          state.activeMessageId = firstChatId;
        }
      })
      .addCase(fetchChats.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export default chatsSlice;

export const { setActiveMessage } = chatsSlice.actions;

export const getAllChats = ({ chats }: { chats: TChatsInitalState }) => {
  return chats.response;
};

export const getChatsStatus = ({ chats }: { chats: TChatsInitalState }) =>
  chats.status;

export const getActiveMessageId = ({ chats }: { chats: TChatsInitalState }) =>
  chats.activeMessageId;
