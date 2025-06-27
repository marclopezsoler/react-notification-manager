import { NotificationsProvider } from "./context/NotificationsProvider";

import InnerApp from "./components/InnerApp";
import NotificationList from "./components/NotificationList/NotificationList";

export function App() {
  return (
    <NotificationsProvider>
      <NotificationList />
      <InnerApp />
    </NotificationsProvider>
  );
}

export default App;
