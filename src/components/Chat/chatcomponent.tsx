import { Session, Chatbox } from "@talkjs/react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

function ChatComponent() {
  const sessionId = useSession().data?.user.id ?? "NO_OP";
  const { data } = api.user.getUserById.useQuery(sessionId);

  // Determine userId based on user's role
  const userId =
    data?.role === "admin" ? "sample_user_alice" : "sample_user_sebastian";

  return (
    <Session appId="tKpCN1ok" userId={userId}>
      <Chatbox
        conversationId="sample_conversation"
        style={{ width: "100%", height: "500px" }}
      ></Chatbox>
    </Session>
  );
}

export default ChatComponent;
