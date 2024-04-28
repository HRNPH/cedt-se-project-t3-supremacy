import { Session, Chatbox } from "@talkjs/react";

function ChatComponent() {
  return (
    <Session appId="tKpCN1ok" userId="sample_user_alice">
      <Chatbox
        conversationId="sample_conversation"
        style={{ width: "100%", height: "500px" }}
      ></Chatbox>
    </Session>
  );
}

export default ChatComponent;
