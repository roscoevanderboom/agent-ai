import { notifications, NotificationProps } from "@mantine/notifications";
import {
  IconMoodAngry,
  IconMoodCheck,
  IconMoodHappy,
  IconMoodSadDizzy,
} from "@tabler/icons-react";

type NotificationTypes =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "update";

export default function useNotifications() {
  const notification = (type: NotificationTypes, props: NotificationProps) => {
    switch (type) {
      case "success":
        return notifications.show({
          ...props,
          icon: <IconMoodHappy />,
          color: "green",
          message: props.message,
        });
      case "info":
        return notifications.show({
          ...props,
          icon: <IconMoodCheck />,
          color: "cyan",
          message: props.message,
        });
      case "warning":
        return notifications.show({
          ...props,
          icon: <IconMoodSadDizzy />,
          color: "yellow",
          message: props.message,
        });
      case "error":
        return notifications.show({
          ...props,
          icon: <IconMoodAngry />,
          color: "red",
          message: props.message,
        });
      case "loading":
        return notifications.show({
          ...props,
          color: "purple",
          loading: true,
          message: props.message,
        });
      case "update":
        if (props.id) {
          return notifications.update({
            ...props,
            id: props.id,
            message: props.message,
          });
        }

      default:
        if (props.id) {
          return notifications.hide(props.id);
        }
    }
  };

  return notification;
}
