"use client";

import TextEditor from "@/components/TextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileSchema } from "@/lib/constants/schema";
import { Profile } from "@/lib/types";
import useFormField from "@/hooks/use-form-field";
import useFormStore from "@/hooks/useResumeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ProfileFormField = ({
  name,
  control,
  placeholder,
  inputType,
  className,
}: {
  name: keyof Profile;
  control: any;
  placeholder: string;
  inputType?: "textarea" | "text";
  className?: string;
}) => {
  const { field, error } = useFormField({ name, control });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
          <FormControl>
            {
              {
                textarea: (
                  <TextEditor
                    value={field.value}
                    onContentChange={field.onChange}
                  />
                ),
                text: (
                  <Input
                    {...field}
                    placeholder={placeholder}
                    type="text"
                    className="w-full"
                  />
                ),
              }[inputType || "text"]
            }
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

const ProfileForm = () => {
  const profile = useFormStore((state) => state.profile);
  const form = useForm<Profile>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: profile,
  });

  function onSubmit(data: Profile) {
    console.log("data", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full"
      >
        <ProfileFormField
          name="name"
          control={form.control}
          placeholder="Sara"
        />
        <ProfileFormField
          name="email"
          control={form.control}
          placeholder="dhanush@gmail.com"
        />
        <ProfileFormField
          name="phone"
          control={form.control}
          placeholder="+91 9089908978"
        />
        <ProfileFormField
          name="linkedin"
          control={form.control}
          placeholder="https://linkedin.com/dhanushtheijas08"
        />
        <ProfileFormField
          name="github"
          control={form.control}
          placeholder="https://github.com/dhanushtheijas08"
        />
        <ProfileFormField
          name="website"
          control={form.control}
          placeholder="dhanushtheijas.vercel.app"
        />
        <ProfileFormField
          name="address"
          control={form.control}
          placeholder="No.1, 2nd Street, Chennai, India"
        />
        <ProfileFormField
          name="role"
          control={form.control}
          placeholder="Front End Developer"
        />
        <ProfileFormField
          name="summary"
          control={form.control}
          placeholder="Your summary here"
          inputType="textarea"
          className="col-span-1 sm:col-span-2 md:mb-0 md:col-span-1 lg:col-span-2"
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
