import { Session, Chatbox } from "@talkjs/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { api } from "~/utils/api";

function ChatComponent() {
  const sessionId = useSession().data?.user.id ?? "NO_OP";
  const { data } = api.user.getUserById.useQuery(sessionId);
  const userId =
    data?.role === "admin" ? "sample_user_alice" : "sample_user_sebastian";
  const lastNotificationRef = useRef(null);
  const notificationSoundRef = useRef(null);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      void Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    notificationSoundRef.current = new Audio("/noti.mp3");
  }, []);

  const handleMessageReceived = (message) => {
    if (!message.isByMe) {
      if ("Notification" in window && Notification.permission === "granted") {
        if (lastNotificationRef.current !== message.id) {
          const notification = new Notification(message.sender.name, {
            body: message.body,
            icon: message.sender.photoUrl,
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
          lastNotificationRef.current = message.id;

          // Play the notification sound
          if (notificationSoundRef.current) {
            notificationSoundRef.current.play();
          }
        }
      }
    }
  };

  return (
    <div>
      <Session
        appId="tKpCN1ok"
        userId={userId}
        onMessage={handleMessageReceived}
      >
        <Chatbox
          conversationId="sample_conversation"
          style={{ width: "100%", height: "500px" }}
        ></Chatbox>
      </Session>
    </div>
  );
}

export default ChatComponent;
