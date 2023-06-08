import useServer from "@/hooks/useServer";
import { useEffect, useState } from "react";
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { models_folder } from "@/constants/paths";
import { useAppContext } from "@/App";
import DefaultLayout from "@/layout/DefaultLayout";
import { NavLink, Title, Paper, ScrollArea } from "@mantine/core";
import DefaultBox from "@/components/Boxes/DefaultBox";
import { surrealStart } from "@/lib/surrealdb";

function AvailableModels() {
  const { startServer } = useServer();
  const { isServerRunning } = useAppContext();
  const [models, setModels] = useState<FileEntry[]>([]);
  const [activeModel, setActiveModel] = useState<string>("");

  const getModels = async () => {
    const contents: FileEntry[] = await readDir(await models_folder());
    if (contents) {
      setModels(contents.filter((m) => m.name?.includes(".bin")));
    }
  };

  const handleSelectModel = async (name: string | undefined) => {
    if (name && !isServerRunning) {
      await surrealStart();
      await startServer(name);
      setActiveModel(name);
    } else {
      window.alert("Stop the current server before loading a new model.");
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <DefaultLayout>
      <DefaultBox>
        <Title align="center" mt={12}>Available models</Title>
        <ScrollArea
          miw={500}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column-reverse",
          }}
        >
          {models.map((model, i) => (
            <Paper
              p={12}
              my={12}
              withBorder
              key={i.toString()}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <NavLink
                active={activeModel === model.name}
                label={model.name}
                onClick={() => handleSelectModel(model.name)}
              />
            </Paper>
          ))}
        </ScrollArea>
      </DefaultBox>
    </DefaultLayout>
  );
}

export default AvailableModels;
