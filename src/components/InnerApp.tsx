import { useNotifications } from "../hooks/useNotifications";

const InnerApp = () => {
  const { notify } = useNotifications();

  return (
    <div>
      <button
        onClick={() =>
          notify({
            message: "User created!",
            type: "success",
            duration: 5000,
          })
        }
      >
        Create User
      </button>
      <button
        onClick={() =>
          notify({
            message: "It's time to wake up!",
            type: "none",
            duration: 5000,
          })
        }
      >
        Wake me up
      </button>
      <button
        onClick={() =>
          notify({
            message: "Connection failed!",
            subMessage: "Try connecting again later",
            type: "error",
            duration: 5000,
            hasIcon: true,
            onClick: () => alert("clicked"),
            canClose: true,
            align: ["top", "right"],
          })
        }
      >
        Create connection
      </button>
      <button
        onClick={() =>
          notify({
            message: "User invited successfully!",
            type: "success",
            duration: 5000,
            hasIcon: true,
            align: ["top", "right"],
          })
        }
      >
        Invite user
      </button>
    </div>
  );
};

export default InnerApp;
