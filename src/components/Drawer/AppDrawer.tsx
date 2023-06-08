import { useAppContext } from "@/App";
import { ConversationProps } from "@/interfaces";
import { surrealDB } from "@/lib/surrealdb";
import { Button, Drawer, NavLink, Box, ActionIcon } from "@mantine/core";
import { IconMessage, IconTrash } from "@tabler/icons-react";
import { ask } from "@tauri-apps/api/dialog";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const resetConvo = {
  id: "",
  name: "",
  aiRole: "",
  messageHistory: [],
};

export default function AppDrawer() {
  const nav = useNavigate();
  const {
    drawer,
    toggleDrawer,
    conversations,
    activeConversation,
    setActiveConversation,
    getConversations,
  } = useAppContext();

  const handleSelectConversation = (convo: ConversationProps) => {
    setActiveConversation(convo);
  };

  const handleCreateNewConvo = () => {
    nav("/create-conversation");
    toggleDrawer();
  };

  const handleDeletedConversation = async (id: string) => {
    let confirm = await ask("Are you sure?");
    if (confirm) {
      let db = await surrealDB();
      await db.delete(id);
      getConversations();
      setActiveConversation(resetConvo);
    }
  };

  useEffect(() => {
    getConversations();
  }, [drawer]);

  return (
    <>
      <Drawer.Root size="xs" opened={drawer} onClose={() => toggleDrawer()}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header mb={8}>
            <Drawer.Title>Convesations</Drawer.Title>
            <Drawer.CloseButton color="dark" />
          </Drawer.Header>
          <Drawer.Body sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              mt={12}
              rightIcon={<IconMessage />}
              onClick={handleCreateNewConvo}
            >
              New conversation
            </Button>
          </Drawer.Body>
          {conversations.map((convo, i) => (
            <Drawer.Body key={i.toString()}>
              <Box
                display="flex"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <NavLink
                  active={
                    activeConversation && activeConversation.name === convo.name
                  }
                  label={convo.name}
                  onClick={() => handleSelectConversation(convo)}
                />
                <ActionIcon onClick={() => handleDeletedConversation(convo.id)}>
                  <IconTrash color="red" size={20} />
                </ActionIcon>
              </Box>
            </Drawer.Body>
          ))}
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
