import { useCallback, useEffect, useState, type ReactNode } from "react";

import { NotificationContext } from "./NotificationsContext";

import { getNotificationConfig } from "../config";

import type {
  NotificationProps,
  NotificationsProviderProps,
  ThemeMode,
} from "../types";

export function NotificationsProvider({
  children,
  defaultMode,
  lightTheme,
  darkTheme,
}: NotificationsProviderProps & { children: ReactNode }) {
  const globalConfig = getNotificationConfig();

  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const finalMode = defaultMode ?? globalConfig.defaultMode;
  const finalLightTheme = lightTheme ?? globalConfig.lightTheme;
  const finalDarkTheme = darkTheme ?? globalConfig.darkTheme;

  const [mode, setMode] = useState<ThemeMode>(finalMode);

  useEffect(() => {
    if (defaultMode === undefined && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setMode(mq.matches ? "dark" : "light");
      const onChange = (e: MediaQueryListEvent) =>
        setMode(e.matches ? "dark" : "light");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, [defaultMode]);

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
      const globalConfig = getNotificationConfig();

      const finalNotif = {
        ...notif,
        id,
        isExiting: false,
        colored: notif.colored ?? globalConfig.colored,
        hasIcon: notif.hasIcon ?? globalConfig.hasIcon,
        duration: notif.duration ?? globalConfig.duration,
        align: notif.align ?? globalConfig.align,
        canClose: notif.canClose ?? globalConfig.canClose,
      };

      setNotifications((all) => [finalNotif, ...all]);
      finalNotif.duration &&
        finalNotif.duration !== -1 &&
        setTimeout(() => exitNotification(id), finalNotif.duration);
    },
    [exitNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        exitNotification,
        mode,
        setMode,
        lightTheme: finalLightTheme,
        darkTheme: finalDarkTheme,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
