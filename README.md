# marc-react-notification-manager

A **lightweight** React notification/toast system built with Context & Hooks, featuring customizable themes, icons, custom icons, and corner-based positioning.

[**🌐 Live Demo**](https://react-notification-manager-demo.vercel.app/)

---

## 📦 Installation

```bash
npm install marc-react-notification-manager
# or
yarn add marc-react-notification-manager
```

> **Peer Dependencies**
>
> - `react` (^18 || ^19)
> - `react-dom` (^18 || ^19)

---

## 🚀 Basic Usage

1. **Wrap your app with the provider** and add `NotificationManager` at the root:

   ```tsx
   import React from "react";
   import {
     NotificationsProvider,
     useNotifications,
     NotificationManager,
   } from "marc-react-notification-manager";

   function App() {
     return (
       <NotificationsProvider>
         <Main />
         <NotificationManager />
       </NotificationsProvider>
     );
   }

   function Main() {
     const { notify } = useNotifications();
     return (
       <button
         onClick={() =>
           notify({
             message: "Data saved successfully!",
             type: "success",
             duration: 3000,
           })
         }
       >
         Save Data
       </button>
     );
   }
   ```

2. Anywhere in your component tree, **call the `useNotifications()` hook** to send toasts:

   ```tsx
   const { notify } = useNotifications();
   notify({
     message: "Oops, something went wrong.",
     type: "error",
     duration: 5000,
     hasIcon: true,
     canClose: true,
     subMessage: "Please retry.",
     align: ["bottom", "right"],
   });
   ```

---

## ⚙️ Global Configuration

To set **global defaults**, create a config file (recommended naming: `marc-react-notification-manager.config.ts`):

```ts
// marc-react-notification-manager.config.ts

import {
  setupNotificationConfig,
  DEFAULT_LIGHT,
  DEFAULT_DARK,
} from "marc-react-notification-manager";

setupNotificationConfig({
  defaultMode: "dark", // "light" | "dark"
  colored: "border", // "full" | "border" | "plain"
  hasIcon: false, // show icon by default
  canClose: true, // show close button by default
  duration: 7000, // default duration in ms (-1 = stays until manually closed)
  align: ["bottom", "right"], // default position
  lightTheme: {
    ...DEFAULT_LIGHT,
    alert: {
      backgroundColor: "#FFFFFF",
      borderColor: "#FF7777",
      fontColor: "#000000",
    },
  },
  darkTheme: {
    ...DEFAULT_DARK,
    alert: {
      backgroundColor: "#000000",
      borderColor: "#FF7777",
      fontColor: "#FFFFFF",
    },
  },
});
```

Then, **import this config file at the top of your entry file** (where you add the provider) to ensure it runs before your app uses the notifications:

```tsx
import "./marc-react-notification-manager.config.ts";

import React from "react";
import {
  NotificationsProvider,
  NotificationManager,
} from "marc-react-notification-manager";

function App() {
  return (
    <NotificationsProvider>
      <Main />
      <NotificationManager />
    </NotificationsProvider>
  );
}
```

> **Note:** If `duration` is set to `-1`, notifications will remain visible until manually dismissed using the close button or programmatically.

---

## 🛠️ API Reference

### `NotificationsProvider`

Wrap this around your app once. It provides the React context for notifications.

```tsx
<NotificationsProvider>…</NotificationsProvider>
```

### `useNotifications()`

A hook that returns:

```ts
interface UseNotificationsResult {
  notifications: NotificationProps[];
  notify: (options: Omit<NotificationProps, "id" | "isExiting">) => void;
  exitNotification: (id: string) => void;
}
```

- **`notify(options)`** – creates a new toast.

  - `message: string` — main text
  - `subMessage?: string` — secondary text
  - `type: 'success' | 'error' | 'info' | 'alert' | 'none'`
  - `duration: number` — milliseconds before auto-dismiss (`-1` for persistent)
  - `theme?: { borderColor, backgroundColor, fontColor }` — custom colors
  - `hasIcon?: boolean` — show default icon
  - `customIcon?: ReactNode` — render a custom icon or component instead of the default icon
  - `onClick?: () => void` — callback when toast clicked
  - `canClose?: boolean` — show manual close button
  - `align?: ['top' | 'bottom', 'left' | 'middle' | 'right']` — corner position
  - `colored?: 'full' | 'border' | 'plain'` — color mode

- **`exitNotification(id)`** – manually dismisses a toast (with exit animation).

### `NotificationManager`

Renders all active toasts with stacking, animations, and per-corner grouping. No props required.

```tsx
<NotificationManager />
```

---

## 🎨 Customization

- **Global defaults**: use `setupNotificationConfig()` to set mode, theme, duration, and other defaults.
- **Theming**: pass `theme` to `notify` to override border, background, and text colors.
- **Position**: control screen corner via `align` (e.g., `['bottom', 'right']`).
- **Icons**:
  - Use `hasIcon` to show default icon shapes.
  - Pass `customIcon` to render your own icon or JSX element inside the notification.
