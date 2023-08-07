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

export type TMessagesInitialState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  response: TMessage[];
  error: null;
};

const initialState: TMessagesInitialState = {
  status: "idle",
  response: [],
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
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

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export default messagesSlice;

export const getMessagesStatus = ({
  messages,
}: {
  messages: TMessagesInitialState;
}) => messages.status;

export const getMessages = ({ messages }: { messages: TMessagesInitialState }) => {
  return messages.response
};
