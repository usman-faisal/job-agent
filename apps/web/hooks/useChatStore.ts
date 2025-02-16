
import { ChatMessage } from "@/lib/types";
import { create } from "zustand";

interface State {
  input: string;
  messages: ChatMessage[];
}

interface Actions {
  setInput: (input: string) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setMessages: (fn: (messages: ChatMessage[]) => ChatMessage[]) => void;
}

const useChatStore = create<State & Actions>()((set) => ({

  input: "",

  setInput: (input) => set({ input }),
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => set({ input: e.target.value }),

  messages: [],
  setMessages: (fn) => set(({ messages }) => ({ messages: fn(messages) })),
}));

export default useChatStore;