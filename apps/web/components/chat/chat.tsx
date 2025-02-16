"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleMessage,
  
} from "../ui/chat/chat-bubble";
import { ChatInput } from "../ui/chat/chat-input";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { AnimatePresence, motion } from "framer-motion";
import {
  CornerDownLeft,
  Mic,
  Paperclip,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useChatStore from "@/hooks/useChatStore";
import { useForm } from "react-hook-form";
import { useSendMessageMutation } from "@/lib/api/chat";
import { useQueryClient } from "@tanstack/react-query";

export default function Chat() {
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const input = useChatStore((state) => state.input);
  const setInput = useChatStore((state) => state.setInput);
  const handleInputChange = useChatStore((state) => state.handleInputChange);
  const [isLoading, setisLoading] = useState(false);
  const { mutateAsync: sendMessage } = useSendMessageMutation();
  const queryClient = useQueryClient();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const getMessageVariant = (role: string) =>
    role === "assistant" ? "received" : "sent";
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleSendMessage = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    setisLoading(true);

    setMessages((messages) => [
      ...messages,
      {
        id: messages.length + 1,
        role: "user",
        content: input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    const response = await sendMessage(input);
    console.log(response);
    setisLoading(false);
    setInput("");
    formRef.current?.reset();
    await queryClient.invalidateQueries({ queryKey: ["messages"] });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1 w-full overflow-y-auto bg-muted/40">
        <ChatMessageList ref={messagesContainerRef}>
          {/* Chat messages */}
          <AnimatePresence>
            {messages.map((message, index) => {
              const variant = getMessageVariant(message.role!);
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                  transition={{
                    opacity: { duration: 0.1 },
                    layout: {
                      type: "spring",
                      bounce: 0.3,
                      duration: index * 0.05 + 0.2,
                    },
                  }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  className="flex flex-col gap-2 p-4"
                >
                  <ChatBubble key={index} variant={variant}>
                    <Avatar>
                      <AvatarImage
                        src={message.role === "assistant" ? "" : ""}
                        alt="Avatar"
                        className={message.role === "assistant" ? "dark:invert" : ""}
                      />
                      <AvatarFallback>
                        {message.role === "assistant" ? "🤖" : "GG"}
                      </AvatarFallback>
                    </Avatar>
                    <ChatBubbleMessage isLoading={false}>
                      {message.content}
                      {message.role === "assistant" && (
                        <div className="flex items-center mt-1.5 gap-1">
                          {/* {!message.isLoading && (
                            <>
                              {ChatAiIcons.map((icon, index) => {
                                const Icon = icon.icon;
                                return (
                                  <ChatBubbleAction
                                    variant="outline"
                                    className="size-6"
                                    key={index}
                                    icon={<Icon className="size-3" />}
                                    onClick={() =>
                                      console.log(
                                        "Action " +
                                          icon.label +
                                          " clicked for message " +
                                          index,
                                      )
                                    }
                                  />
                                );
                              })}
                            </>
                          )} */}
                        </div>
                      )}
                    </ChatBubbleMessage>
                  </ChatBubble>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </ChatMessageList>
      </div>
      <div className="px-4 pb-4 bg-muted/40">
        <form
          ref={formRef}
          onSubmit={handleSendMessage}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
          <ChatInput
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>

            <Button
              disabled={!input || isLoading}
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}