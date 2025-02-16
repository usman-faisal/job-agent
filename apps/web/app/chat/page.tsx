'use client'
import Chat from "@/components/chat/chat";
import useChatStore from "@/hooks/useChatStore";
// import Chat from "@/components/chat/chat-layout";
import { useGetMessagesQuery } from "@/lib/api/chat";
import { useEffect } from "react";

export default function Home() {
  const { data: messages } = useGetMessagesQuery();

  useEffect(() => {
    if (messages) {
      useChatStore.setState({ messages: messages });
    }
  }, [messages]);
  return (
    <Chat />
  );
}
