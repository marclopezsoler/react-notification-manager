import { useCallback, useState, type ReactNode } from "react";

import { NotificationContext } from "./NotificationsContext";

import type { NotificationProps } from "../types";

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const removeCompletely = useCallback((id: string) => {
    setNotifications((all) => all.filter((n) => n.id !== id));
  }, []);

  const exitNotification = useCallback(
    (id: string) => {
      setNotifications((all) =>
        all.map((n) => (n.id === id ? { ...n, isExiting: true } : n))
      );
      setTimeout(() => removeCompletely(id), 200);
    },
    [removeCompletely]
  );

  const notify = useCallback(
    (notif: Omit<NotificationProps, "id" | "isExiting">) => {
      const id = crypto.randomUUID();
      setNotifications((all) => [{ ...notif, id, isExiting: false }, ...all]);
      setTimeout(() => exitNotification(id), notif.duration);
    },
    [exitNotification]
  );

  return (
    <NotificationContext.Provider
      value={{ notifications, notify, exitNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
