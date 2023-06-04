import { createStyles, Header, Group, Burger, rem } from "@mantine/core";
import { useAppContext } from "@/App";
import SettingsModal from "../Modals/SettingsModal";
import StopChildProcess from "../Buttons/StopChildProcess";
import ConsoleModal from "../Modals/ConsoleModal";
import ModelInfoModal from "../Modals/ModelInfoModal";
import UpdateAIRole from "../Modals/UpdateAIRole";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function AppHeader() {
  const { classes } = useStyles();
  const { drawer, toggleDrawer } = useAppContext();

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={drawer} onClick={() => toggleDrawer()} size="sm" />
        </Group>

        <Group>
          <UpdateAIRole />
          <StopChildProcess />
          <ModelInfoModal />
          <ConsoleModal />
          <SettingsModal />
        </Group>
      </div>
    </Header>
  );
}
