import { Box, Text, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";

function Loading({ serverOutput }: { serverOutput: string[] }) {
  const [console, setConsole] = useState<string[]>([]);

  useEffect(() => {
    setConsole(serverOutput.reverse());
  }, [serverOutput]);

  return (
    <Box p={50} sx={{ height: "100vh", display: "flex" }}>
      <ScrollArea
        sx={{
          flexGrow: 1,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column-reverse",
        }}
      >
        {console.map((text, i) => (
          <Text key={i.toString()}>{text}</Text>
        ))}
      </ScrollArea>
    </Box>
  );
}

export default Loading;
