import { useAppContext } from "@/App";
import { CHAT_COMPLETION_URL } from "@/constants/urls";
import { MessageProps } from "@/interfaces";
import parsePostRequestBody from "@/utils/parsePostRequestBody";
import axios from "axios";

export default function useFetch() {
  const { toggleLoading, activeConversation } = useAppContext();

  async function postChat(messages: MessageProps[]): Promise<string | false> {
    toggleLoading(true);
    try {
      const url = CHAT_COMPLETION_URL;
      const response = await axios.post(
        url,
        parsePostRequestBody(activeConversation, messages),
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
