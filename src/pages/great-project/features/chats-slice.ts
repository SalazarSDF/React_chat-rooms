import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
};

const initialState: TChatsInitalState = {
  status: "idle",
  response: [],
  error: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export default chatsSlice;

export const getAllChats = ({ chats }: { chats: TChatsInitalState }) => {
  return chats.response;
};

export const getChatsStatus = ({ chats }: { chats: TChatsInitalState }) =>
  chats.status;
