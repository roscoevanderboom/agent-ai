import { useEffect, useState } from "react";
import { Paper, Text, ScrollArea, ActionIcon } from "@mantine/core";
import Prism from "prismjs";
import { MessageProps } from "@/interfaces";
import { useLocalStorage } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { upperFirst } from "@mantine/hooks";

function analyzeMessageContent(content: string): string {
  const codeRegex = /```([\s\S]+?)```/g; // Regular expression to detect code blocks enclosed in triple backticks
  const analyzedContent = content.replace(codeRegex, (_match, code) => {
    return `<pre><code>${Prism.highlight(
      code,
      Prism.languages.javascript,
      "javascript"
    )}</code></pre>`;
  });
  return analyzedContent;
}

export default function ChatList() {
  const [history, setHistory] = useLocalStorage<MessageProps[]>({
    key: "chat_history",
    defaultValue: [],
  });
  const [formattedMessages, setFormattedMessages] = useState<MessageProps[]>(
    []
  );

  const handleDeletePost = (content: string) => {
    setHistory(history.filter((el) => el.content !== content));
  };

  useEffect(() => {
    const formattedMessages = history.map((message: MessageProps) => ({
      ...message,
      content: analyzeMessageContent(message.content),
    }));
    formattedMessages && setFormattedMessages(formattedMessages.reverse());
  }, [history]);

  return (
    <ScrollArea
      p={12}
      sx={{
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column-reverse",
      }}
    >
      {formattedMessages.map((el: MessageProps, i: number) => (
        <Paper my={10} p={12} key={i.toString()} withBorder>
          <ActionIcon
            sx={{ float: "right" }}
            onClick={() => handleDeletePost(el.content)}
          >
            <IconTrash size={15} color="red" />
          </ActionIcon>
          <Text size="lg">{upperFirst(el.role)}:</Text>
          <Text sx={{ maxWidth: "100vw", display: "flex", flexWrap: "wrap" }}>
            {el.content ? (
              <div
                style={{ maxWidth: "100vw" }}
                dangerouslySetInnerHTML={{
                  __html: el.content
                }}
              />
            ) : null}
          </Text>
          <div></div>
        </Paper>
      ))}
    </ScrollArea>
  );
}
