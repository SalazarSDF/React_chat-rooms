import { Header } from "../../components/Header";
import { MessagesList } from "../../components/MessagesList";
import { Provider } from "react-redux";
import { store } from "../../store";
import { fetchChats } from "./features/chats-slice";
import { ChatItemList } from "../../components/ChatItemList";
import style from "./great-project.module.scss";

export default function GreatProject({ title }: { title: string }) {
  const { status: chatsStatus } = store.getState().chats;
  if (chatsStatus === "idle") {
    store.dispatch(fetchChats());
  }
  return (
    <Provider store={store}>
      <div className={style.greateProject}>
        <div className={style.greateProjectHeader}>
          <Header title={title} />
        </div>
        <div className={style.greateProjectChatItemList}>
          <ChatItemList />
        </div>
        <div className={style.greateProjectChatWindow}>
          <MessagesList />
        </div>
      </div>
    </Provider>
  );
}

// Cannot find module './great-project.module.scss' or its corresponding type
// declarations. (tsserver 2307)
