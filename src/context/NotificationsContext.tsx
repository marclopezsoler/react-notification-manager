import { createContext } from "react";
import type { NotificationProps } from "../types";

interface NotificationContextValue {
  notifications: NotificationProps[];
  notify: (n: Omit<NotificationProps, "id" | "isExiting">) => void;
  exitNotification: (id: string) => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);
