import { useCallback, useEffect, useState, type ReactNode } from "react";

import { NotificationContext } from "./NotificationsContext";

import type {
  NotificationProps,
  NotificationsProviderProps,
  NotificationThemeType,
  ThemeMode,
} from "../types";

export const DEFAULT_LIGHT: Record<
  NotificationProps["type"],
  NotificationThemeType
> = {
  success: {
    borderColor: "#4caf50",
    backgroundColor: "#e8f5e9",
    fontColor: "#2e7d32",
  },
  error: {
    borderColor: "#f44336",
    backgroundColor: "#ffebee",
    fontColor: "#c62828",
  },
  info: {
    borderColor: "#2196f3",
    backgroundColor: "#e3f2fd",
    fontColor: "#1565c0",
  },
  alert: {
    borderColor: "#ff9800",
    backgroundColor: "#fff3e0",
    fontColor: "#ef6c00",
  },
  none: {
    borderColor: "#bdbdbd",
    backgroundColor: "#f7f7f7",
    fontColor: "#181818",
  },
};

export const DEFAULT_DARK: Record<
  NotificationProps["type"],
  NotificationThemeType
> = {
  success: {
    borderColor: "#81c784",
    backgroundColor: "#3e5f40",
    fontColor: "#e8f5e9",
  },
  error: {
    borderColor: "#e57373",
    backgroundColor: "#5f3030",
    fontColor: "#ffebee",
  },
  info: {
    borderColor: "#64b5f6",
    backgroundColor: "#213c52",
    fontColor: "#e3f2fd",
  },
  alert: {
    borderColor: "#ffb74d",
    backgroundColor: "#5c421c",
    fontColor: "#fff3e0",
  },
  none: {
    borderColor: "#bdbdbd",
    backgroundColor: "#424242",
    fontColor: "#e0e0e0",
  },
};

export function NotificationsProvider({
  children,
  defaultMode = "light",
  lightTheme = DEFAULT_LIGHT,
  darkTheme = DEFAULT_DARK,
}: NotificationsProviderProps & { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

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
      setNotifications((all) => [{ ...notif, id, isExiting: false }, ...all]);
      setTimeout(() => exitNotification(id), notif.duration);
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
        lightTheme,
        darkTheme,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
