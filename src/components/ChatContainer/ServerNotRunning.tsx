import { Paper, Box, Title, List, Text } from "@mantine/core";

function ServerNotRunning() {
  return (
    <Box
      pb={12}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 56px)",
      }}
    >
      <Paper p={12} withBorder>
        <Title my={15} align="center" size="h2">
          Welcome to your personal AI Agent{" "}
        </Title>
        <Title my={8} size="h4">
          Current features
        </Title>
        <List>
          <List.Item>
            Start / Stop webserver to interact with local model
          </List.Item>
          <List.Item>
            Conversational chatbot persisted using local storage
          </List.Item>
        </List>
        <Title my={8} size="h4">
          Requirements
        </Title>
        <List>
          <List.Item>Python</List.Item>
          <List.Item>pip install llama-cpp-python</List.Item>
          <List.Item>pip install llama-cpp-python[server]</List.Item>
        </List>
        <Title my={8} size="h5">
          Important Disclaimer**
        </Title>
        <Text>
          This is a work in progress and is presented as is with no developer
          support. PRs and collaborations are greatly welcomed and appreciated.
        </Text>
        <Text>
          I'm not a prefessional developer. I do this as a hobby and simply love
           sharing / working on projects relating to AI, blockchains, IPFS,
          and decentralized systems.
        </Text>
      </Paper>
    </Box>
  );
}

export default ServerNotRunning;
