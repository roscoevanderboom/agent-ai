import { useAppContext } from "@/App";
import useFetch from "@/hooks/useFetch";
import { surrealDB } from "@/lib/surrealdb";
import { TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";

function ChatInput() {
  const [query, setQuery] = useState<string>("");
  const { postChat } = useFetch();
  const { activeConversation, setActiveConversation } = useAppContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let db = await surrealDB();
    const humanQuery = { role: "user", content: query };
    activeConversation.messageHistory.push(humanQuery);
    let res = await db.update(activeConversation.id, { ...activeConversation });
    setActiveConversation(res);
    try {
      let post = await postChat(activeConversation.messageHistory);
      if (post) {
        const aiReply = { role: "assistant", content: post };
        activeConversation.messageHistory.push(aiReply);
        let res = await db.update(activeConversation.id, {
          ...activeConversation,
        });
        setActiveConversation(res);
        setQuery("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        value={query}
        px={12}
        placeholder="Ask me something..."
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
}

export default ChatInput;
