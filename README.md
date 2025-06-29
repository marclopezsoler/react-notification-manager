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

1. Wrap your app with the provider and add `NotificationManager` at the root:

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
         <NotificationManager defaultMode="light" />
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

2. Anywhere in your component tree, call the `useNotifications()` hook to send toasts:

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
  - `duration: number` — milliseconds before auto-dismiss
  - `theme?: { borderColor, backgroundColor, fontColor }` — custom colors
  - `hasIcon?: boolean` — show default icon
  - `customIcon?: ReactNode` — render a custom icon or component instead of the default icon
  - `onClick?: () => void` — callback when toast clicked
  - `canClose?: boolean` — show manual close button
  - `align?: ['top' | 'bottom', 'left' | 'middle' | 'right']` — corner position

- **`exitNotification(id)`** – manually dismisses a toast (with exit animation).

### `NotificationManager`

Renders all active toasts with stacking, animations, and per-corner grouping. No props required.

```tsx
<NotificationManager />
```

---

## 🎨 Customization

- **Theming**: pass `theme` to `notify` to override border, background, and text colors.
- **Position**: control screen corner via `align` (e.g., `['bottom', 'right']`).
- **Icons**:
  - Use `hasIcon` to show default icon shapes.
  - Pass `customIcon` to render your own icon or JSX element inside the notification.
