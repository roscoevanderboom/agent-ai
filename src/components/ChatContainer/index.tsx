import { Box, TextInput } from "@mantine/core";
import { FormEvent, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useLocalStorage } from "@mantine/hooks";
import { MessageProps } from "@/interfaces";
import ChatList from "./ChatComponent";

function ChatContainer() {
  const { postChat } = useFetch();
  const [query, setQuery] = useState<string>("");
  const [history, setHistory] = useLocalStorage<MessageProps[]>({
    key: "chat_history",
    defaultValue: [],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const humanQuery = {
      role: "user",
      content: query,
    };
    setHistory((prev) => [...prev, humanQuery]);
    setQuery("");
  };

  useEffect(() => {
    if (history.length > 0) {
      const lastSender = history[history.length - 1].role;
      if (lastSender === "user") {
        postChat().then((res) => {
          if (res) {
            const aiReply = {
              role: "assistant",
              content: res,
            };
            setHistory((prev) => [...prev, aiReply]);
          }
        });
      }
    }
  }, [history]);

  return (
    <Box
      pb={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 56px)",
      }}
    >
      <ChatList />
      <form onSubmit={handleSubmit}>
        <TextInput
          value={query}
          placeholder="Ask me something..."
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <button type="submit" style={{ display: "none" }} />
      </form>
    </Box>
  );
}

export default ChatContainer;
