import { Header } from "../../components/Header";
import { Provider } from "react-redux";
import { store } from "../../store";
import { fetchChats } from "./features/chats-slice";
import { ChatItemList } from "../../components/ChatItemList";
import "./great-project.scss";

export default function GreatProject({ title }: { title: string }) {
  store.dispatch(fetchChats());
  return (
    <Provider store={store}>
      <div className="greate-project">
        <div className="greate-project__header">
          <Header title={title} />
        </div>
        <div className="greate-project__chat-item-list">
          <ChatItemList />
        </div>
        <div className="greate-project__chat-window"></div>
      </div>
    </Provider>
  );
}
