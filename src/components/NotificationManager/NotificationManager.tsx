import { useMemo } from "react";

import { useNotifications } from "../../hooks/useNotifications.tsx";

import type { ColoredMode, NotificationProps } from "../../types.ts";

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

export default function NotificationManager() {
  const { notifications, exitNotification } = useNotifications();

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
          .slice(0, 10)
          .map((n, idx) => (
            <Notification
              key={n.id}
              {...n}
              colored={n.colored ?? "full"}
              index={idx}
              onClose={() => exitNotification(n.id)}
            />
          ));
      })}
    </>
  );
}

import { useEffect, useState } from "react";

import { AlertIcon } from "../../icons/alert.tsx";
import { ErrorIcon } from "../../icons/error.tsx";
import { InfoIcon } from "../../icons/info.tsx";
import { SuccessIcon } from "../../icons/success.tsx";
import { CloseIcon } from "../../icons/x.tsx";

import type { NotificationThemeType } from "../../types.ts";

import { NotificationWrapper } from "./Notification.style";

const iconMap: Record<
  NotificationProps["type"],
  React.FC<React.SVGProps<SVGSVGElement>> | null
> = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  alert: AlertIcon,
  none: null,
};

const defaultThemes: Record<NotificationProps["type"], NotificationThemeType> =
  {
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

const NONE_THEME: NotificationThemeType = defaultThemes.none;

function computeColors(
  mode: ColoredMode,
  theme: NotificationThemeType
): { bg: string; border: string; color: string } {
  switch (mode) {
    case "border":
      return {
        bg: NONE_THEME.backgroundColor,
        border: theme.borderColor,
        color: theme.fontColor,
      };
    case "plain":
      return {
        bg: NONE_THEME.backgroundColor,
        border: NONE_THEME.borderColor,
        color: NONE_THEME.fontColor,
      };
    case "full":
    default:
      return {
        bg: theme.backgroundColor,
        border: theme.borderColor,
        color: theme.fontColor,
      };
  }
}

function Notification(props: NotificationProps) {
  const {
    id,
    message,
    subMessage,
    type,
    theme = defaultThemes[props.type],
    hasIcon,
    isExiting = false,
    index = 0,
    onClick,
    canClose,
    onClose,
    align,
    colored = "full",
  } = props;

  const { bg, border, color } = computeColors(colored, theme);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const Icon = iconMap[type];

  let veticalAlign: "top" | "bottom" = "top";
  let horizontalAlign: "left" | "middle" | "right" = "middle";
  if (align) {
    veticalAlign = align[0];
    horizontalAlign = align[1];
  }

  return (
    <NotificationWrapper
      $index={index}
      $isExiting={isExiting}
      $mounted={mounted}
      $isClickable={!!onClick}
      $canClose={canClose ? true : false}
      $veticalAlign={veticalAlign}
      $horizontalAlign={horizontalAlign}
      $bg={bg}
      $border={border}
      $color={color}
      onClick={
        onClick
          ? (e) => {
              e.stopPropagation();
              onClick();
            }
          : undefined
      }
    >
      {hasIcon && Icon && (
        <div className="icon">
          <Icon />
        </div>
      )}
      <div className="column">
        <span className="message">{message}</span>
        {subMessage && <span className="submessage">{subMessage}</span>}
      </div>
      {canClose && onClose && (
        <div
          className="close-icon-container"
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
        >
          <div className="close-icon">
            <CloseIcon />
          </div>
        </div>
      )}
    </NotificationWrapper>
  );
}
