````markdown
# feedback-notification

A **lightweight** React notification/toast system built with Context & Hooks, featuring customizable themes, icons, and corner-based positioning.

---

## 📦 Installation

```bash
npm install feedback-notification styled-components
# or
yarn add feedback-notification styled-components
```
````

> **Peer Dependencies**
>
> - `react` (^18 || ^19)
> - `react-dom` (^18 || ^19)
> - `styled-components` (^5 || ^6)

---

## 🚀 Basic Usage

1. Wrap your app with the provider and add `NotificationList` at the root:

   ```tsx
   import React from "react";
   import {
     NotificationsProvider,
     useNotifications,
     NotificationList,
   } from "feedback-notification";

   function App() {
     return (
       <NotificationsProvider>
         <Main />
         <NotificationList />
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
  - `onClick?: () => void` — callback when toast clicked
  - `canClose?: boolean` — show manual close button
  - `align?: ['top' | 'bottom', 'left' | 'middle' | 'right']` — corner position

- **`exitNotification(id)`** – manually dismisses a toast (with exit animation).

### `NotificationList`

Renders all active toasts with stacking, animations, and per-corner grouping. No props required.

```tsx
<NotificationList />
```

---

## 🎨 Customization

- **Theming**: pass `theme` to `notify` to override border, background, and text colors.
- **Position**: control screen corner via `align` (e.g., `['bottom', 'right']`).
- **Icons**: toggle `hasIcon` on to show default icon shapes, or off for text-only toasts.

---

## 🛠️ Development & Build

- **Dev server**: `npm run dev` (Vite)
- **Build library**: `npm run build` (bundles ESM + CJS + types via tsup)
- **Generate types only**: `npm run build:types`

Your published package (`dist/`) will include:

```
dist/
  index.cjs.js    // CommonJS entry
  index.mjs       // ESM entry
  index.d.ts      // Type declarations
```

---

## 📄 License

Released under the [MIT License](LICENSE).

```

```
