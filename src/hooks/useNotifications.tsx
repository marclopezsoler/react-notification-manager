import { useContext } from "react";

import { NotificationContext } from "../context/NotificationsContext";

import type { NotificationProps } from "../types";

export function useNotifications(): {
  notifications: NotificationProps[];
  notify: (notif: Omit<NotificationProps, "id" | "isExiting">) => void;
  exitNotification: (id: string) => void;
} {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return ctx;
}
