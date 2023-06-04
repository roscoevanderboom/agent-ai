import { useAppContext } from "@/App";
import { createStyles, rem, useMantineTheme, ActionIcon } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  iconWrapper: {
    height: rem(28),
    width: rem(28),
    borderRadius: rem(28),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.dark[4],
    color: theme.colorScheme === "dark" ? theme.black : theme.colors.blue[2],
  },
}));

export default function ThemeColorToggle() {
  const { classes } = useStyles();
  const { colorScheme } = useMantineTheme();
  const { toggleTheme } = useAppContext();
  const Icon = colorScheme === "dark" ? IconSun : IconMoon;

  return (
    <ActionIcon className={classes.iconWrapper} onClick={toggleTheme}>
      <Icon size="1.05rem" stroke={1.5} />
    </ActionIcon>
  );
}
