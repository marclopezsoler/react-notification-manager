export interface NotificationThemeType {
  borderColor: string;
  backgroundColor: string;
  fontColor: string;
}

export interface NotificationProps {
  id: string;
  message: string;
  subMessage?: string;
  type: "success" | "error" | "info" | "alert" | "none";
  duration: number;
  theme?: NotificationThemeType;
  isExiting?: boolean;
  index?: number;
  hasIcon?: boolean;
  onClick?: () => void;
  canClose?: boolean;
  onClose?: (id: string) => void;
  align?: ["top" | "bottom", "left" | "middle" | "right"];
}
