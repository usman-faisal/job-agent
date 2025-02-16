'use client'
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./api";

export const useGetMessagesQuery = () => {
    return useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const response = await api.get("/chat/get-messages");
            return response.data;
        },
    });
};

export const useSendMessageMutation = () => {
    return useMutation({
        mutationFn: async (message: string) => {
            const response = await api.post("/chat/send-message?message=" + message);
            return response.data;
        },
    });
};

