
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSendMessageMutation } from "@/lib/api/chat";
import { useForm } from "react-hook-form";

export default function SendMessage() {
    const { mutate: sendMessage } = useSendMessageMutation();
    const { register, handleSubmit, reset } = useForm<{ message: string }>();

    const onSubmit = (data: { message: string }) => {
        sendMessage(data.message);
        reset();
    }

    return (
        <form className="flex items-center space-x-2 p-2 border-t" onSubmit={handleSubmit(onSubmit)}>
            <Input className="flex-1" placeholder="Type a message" {...register("message")} />
            <Button type="submit">Send</Button>
        </form>
    )
}