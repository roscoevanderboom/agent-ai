import DefaultLayout from "@/layout/DefaultLayout";
import DefaultBox from "@/components/Boxes/DefaultBox";
import ChatList from "@/components/Lists/ChatList";
import ChatInput from "@/components/Inputs/ChatInput";

function MainView() {
  return (
    <DefaultLayout>
      <DefaultBox>
        <ChatList />
        <ChatInput />
      </DefaultBox>
    </DefaultLayout>
  );
}

export default MainView;
