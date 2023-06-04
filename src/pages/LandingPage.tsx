import DefaultLayout from "@/layout/DefaultLayout";
import { useLocalStorage } from "@mantine/hooks";
import ChatContainer from "@/components/ChatContainer";
import { useAppContext } from "@/App";
import AssistantConfig from "@/components/ChatContainer/AssistantConfig";
import ServerNotRunning from "@/components/ChatContainer/ServerNotRunning";

function LandingPage() {
  const { isServerRunning } = useAppContext();
  const [system_config] = useLocalStorage<string>({
    key: "system_config",
    defaultValue: "",
  });

  return (
    <DefaultLayout>
      {!isServerRunning && <ServerNotRunning />}
      {!system_config && isServerRunning && <AssistantConfig />}
      {system_config && isServerRunning && <ChatContainer />}
    </DefaultLayout>
  );
}

export default LandingPage;
