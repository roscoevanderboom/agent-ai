import { Box, Text, ScrollArea } from "@mantine/core";

function Loading({ serverOutput }: { serverOutput: string[] }) {
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
        {serverOutput.map((text, i) => (
          <Text key={i.toString()}>{text}</Text>
        ))}
      </ScrollArea>
    </Box>
  );
}

export default Loading;
