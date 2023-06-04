import { useAppContext } from "@/App";
import { CHAT_COMPLETION_URL } from "@/constants/urls";
import { MessageProps } from "@/interfaces";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";

export default function useFetch() {
  const { toggleLoading } = useAppContext();
  const [system_config] = useLocalStorage<string>({
    key: "system_config",
    defaultValue: "",
  });
  const [history] = useLocalStorage<MessageProps[]>({
    key: "chat_history",
    defaultValue: [],
  });

  async function postChat(): Promise<string | false> {
    toggleLoading(true);
    try {
      const url = CHAT_COMPLETION_URL;
      const response = await axios.post(
        url,
        {
          messages: [{ role: "system", content: system_config }, ...history],
          max_tokens: 500,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      // Extract the data from the response
      const content = response.data.choices[0].message.content;
      toggleLoading(false);
      return content;
    } catch (error) {
      console.log(error);
      window.alert("Request failed with error: " + error);
      toggleLoading(false);
      return false;
    }
  }

  return { postChat };
}
