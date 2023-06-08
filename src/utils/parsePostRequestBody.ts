import { ConversationProps, MessageProps } from "@/interfaces";

export default function parsePostRequestBody(
  activeConversation: ConversationProps,
  messages: MessageProps[]
) {
  return {
    messages: [
      { role: "system", content: activeConversation.aiRole },
      ...messages,
    ],
    max_tokens: 500,
  };
}
