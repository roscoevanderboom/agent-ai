import { Command } from "@tauri-apps/api/shell";
import { join } from "@tauri-apps/api/path";
import { useAppContext } from "@/App";
import { models_folder } from "@/constants/paths";
// import { MessageProps } from "@/interfaces";
// import axios from "axios";
// import { useLocalStorage } from "@mantine/hooks";
// import useNotifications from "./useNotifications";
// import { EMBEDDINGS_URL } from "@/constants/urls";

export default function useServer() {
  const { setIsServerRunning, handleServerOutput, toggleLoading } =
    useAppContext();
  // const notification = useNotifications();

  async function startServer(modelName: string) {
    toggleLoading(true)
    let model_path = await join(await models_folder(), modelName);
    let command = new Command("server", [
      "-m",
      "llama_cpp.server",
      "--model",
      model_path,
    ]);
    command.on("close", (data) => {
      handleServerOutput(data);
      setIsServerRunning(false);
      toggleLoading(false);
    });
    command.on("error", (error) => {
      handleServerOutput(error);
      toggleLoading(false);
    });
    command.stderr.on("data", (line) => {
      if (line.includes("Application shutdown complete")) {
        setIsServerRunning(false);
        toggleLoading(false);
      }
      if (line.includes("(Press CTRL+C to quit)")) {
        setIsServerRunning(true);
        toggleLoading(false);
      }
      handleServerOutput(line);
    });

    await command.spawn();
  }

  // Function to convert previous chat messages to embeddings
  // async function convertToEmbeddings() {
  //   notification("info", {
  //     id: "history",
  //     message: "Start embedding conversation history",
  //     autoClose: false,
  //     loading: true,
  //   });
  //   const url = EMBEDDINGS_URL;

  //   const text = history.map((m) => m.content);

  //   const { data } = await axios.post(url, { input: text });

  //   notification("update", {
  //     id: "history",
  //     message: "Embeddings loaded",
  //     autoClose: 2000,
  //     loading: true,
  //   });
  //   return data.data;
  // }

  return { startServer };
}
