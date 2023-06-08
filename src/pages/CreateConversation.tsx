import { Button, Space, TextInput, Title } from "@mantine/core";
import { FormEvent, useState } from "react";
import DefaultBox from "@/components/Boxes/DefaultBox";
import DefaultLayout from "@/layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { surrealDB } from "@/lib/surrealdb";

function CreateConversation() {
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const nav = useNavigate();

  const handleCreate = async () => {
    const data = {
      name: name,
      aiRole: description,
      messageHistory: [],
    };
    let db = await surrealDB();
    await db
      .create("conversations", { ...data })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleCreate();
    nav("/main-view");
  };

  return (
    <DefaultLayout>
      <DefaultBox>
        <Title size="h3">Configure parameters for this conversation.</Title>
        <Space h={50} />
        <form onSubmit={handleSubmit}>
          <TextInput
            value={name}
            miw={400}
            placeholder="What is the name of this conversation?"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Space h={24} />
          <TextInput
            value={description}
            miw={400}
            placeholder="What is the role the AI asistant in this conversation?"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <Space h={24} />
          <Button type="submit">Initiate conversation</Button>
        </form>
      </DefaultBox>
    </DefaultLayout>
  );
}

export default CreateConversation;
