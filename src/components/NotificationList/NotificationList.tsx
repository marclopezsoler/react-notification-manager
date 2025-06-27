import { useMemo } from "react";

import { useNotifications } from "../../hooks/useNotifications";

import Notification from "../Notification/Notification";

import type { NotificationProps } from "../../types";

const ORDER: Array<
  | "top-left"
  | "top-middle"
  | "top-right"
  | "bottom-left"
  | "bottom-middle"
  | "bottom-right"
> = [
  "top-left",
  "top-middle",
  "top-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
];

export default function NotificationList() {
  const { notifications, exitNotification } = useNotifications();

  // group by align
  const groups = useMemo(() => {
    const acc: Record<string, NotificationProps[]> = {};
    for (const n of notifications) {
      const [v = "top", h = "middle"] = n.align ?? ["top", "middle"];
      const key = `${v}-${h}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(n);
    }
    return acc;
  }, [notifications]);

  return (
    <>
      {ORDER.map((alignKey) => {
        const bucket = groups[alignKey];
        if (!bucket) return null;
        return bucket
          .slice(0, 4)
          .map((n, idx) => (
            <Notification
              key={n.id}
              {...n}
              index={idx}
              onClose={() => exitNotification(n.id)}
            />
          ));
      })}
    </>
  );
}
