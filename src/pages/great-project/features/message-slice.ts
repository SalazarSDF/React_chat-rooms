import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessageList } from "../../../api/chat";

export type TMessage = {
  id: string;
  created_at: number;
  user: {
    id: string;
    name: string;
    surname: string;
    avatar: string;
    you: boolean;
  };
  message: string;
  is_new: boolean;
};

export type TMessageInitialState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  response: TMessage[];
  error: null;
};

const initialState: TMessageInitialState = {
  status: "idle",
  response: [],
  error: null,
};

export const fetchMessage = createAsyncThunk(
  "message/fetchMessage",
  async (chatId: string) => {
    try {
      const {response}= await getMessageList(chatId);
      if (response) {
        const chats: TMessage[] = response;
        return chats;
      }
      throw new Error(`Invalid response or data, ${chatId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchMessage.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export default messageSlice;

export const getMessageStatus = ({
  message,
}: {
  message: TMessageInitialState;
}) => message.status;
