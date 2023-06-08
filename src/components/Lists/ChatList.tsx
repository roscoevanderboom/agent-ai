import { useEffect, useState } from "react";
import { Paper, Text, ScrollArea, ActionIcon } from "@mantine/core";
import Prism from "prismjs";
import { MessageProps } from "@/interfaces";
import { IconTrash } from "@tabler/icons-react";
import { upperFirst } from "@mantine/hooks";
import { useAppContext } from "@/App";
import { surrealDB } from "@/lib/surrealdb";

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
  const { activeConversation, setActiveConversation } = useAppContext();
  const [formattedMessages, setFormattedMessages] = useState<MessageProps[]>(
    []
  );

  const handleDeletePost = async (content: string) => {
    activeConversation.messageHistory =
      activeConversation.messageHistory.filter((el) => el.content !== content);
    let db = await surrealDB();
    let res = await db.update(activeConversation.id, { ...activeConversation });
    setActiveConversation(res);
  };

  useEffect(() => {
    const formattedMessages = activeConversation.messageHistory.map(
      (message: MessageProps) => ({
        ...message,
        content: analyzeMessageContent(message.content),
      })
    );
    formattedMessages && setFormattedMessages(formattedMessages.reverse());
  }, [activeConversation.messageHistory]);

  return (
    <ScrollArea
      p={12}
      sx={{
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
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
          <Text sx={{ display: "flex", flexWrap: "wrap" }}>
            {el.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: el.content,
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
