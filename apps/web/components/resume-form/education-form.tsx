"use client";

import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { EducationSchema } from "@/lib/constants/schema";
import { Education } from "@/lib/types";

import {
  Model,
  ModelBody,
  ModelContent,
  ModelFooter,
  ModelHeader,
  ModelTrigger,
} from "@/components/responsive-model";
import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getIdFromUrl } from "@/lib/utils";
import { useDeleteSectionItem, useSectionMutation } from "@/lib/api/resume";
import { toast } from "sonner";
type EducationFormProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: Education) => void;
  onEdit: (id: string, data: Education) => void;
  selectedEducation: string | null;
  mode: "create" | "edit";
  defaultVal: Omit<Education, 'id' | 'resumeId'> | undefined;
};

const EducationForm = ({
  selectedEducation,
  onCreate,
  onEdit,
  isOpened,
  setIsOpened,
  mode,
  defaultVal,
}: EducationFormProps) => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);
  const form = useForm<Omit<Education, 'id' | 'resumeId'>>({
    resolver: zodResolver(EducationSchema.omit({id: true, resumeId: true})),
    defaultValues: defaultVal,
  });
  const { mutateAsync: updateEducation } = useSectionMutation<Omit<Education, 'id' | 'resumeId'>>('education', {
    onSuccess: (data) => {
      if (selectedEducation) {
        onEdit(selectedEducation, {
          ...data,
          id: selectedEducation,
          resumeId: pathName, 
        });
      } else {
        onCreate({ ...(data as Education) });
      }
      setIsOpened(false);
      toast.success("Education updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message ?? "Failed to update education");
    }
  });


  useEffect(() => {
    form.reset(defaultVal);
  }, [defaultVal, form]);

  async function onSubmit(data: Omit<Education, 'id' | 'resumeId'>) {
    const payload = {
      ...data,
      score: Number(data.score),
    }
    await updateEducation({
      resumeId: pathName,
      data: payload,
      ...(selectedEducation && { itemId: selectedEducation }),
    });
  }

  return (
    <div className="max-w-[500px]">
      <Model open={isOpened} onOpenChange={(val) => setIsOpened(val)}>
        <ModelContent>
          <ModelHeader className="font-semibold">Education Section</ModelHeader>
          <ModelBody className="max-h-screen overflow-y-scroll scrollbar-none">
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(form.getValues());
                }}
                className="space-y-2.5 w-full md:px-1 mb-2 md:mb-1 md:max-h-[80vh]"
              >
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Institution Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-base"
                            placeholder=""
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fieldOfStudy"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-base"
                            placeholder=""
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            className="text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            className="text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Score</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Your CGPA"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TextEditor
                          // disabled={field.disabled!}
                          // value={field.value!}
                          // fieldName={field.name}
                          extensions={[
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "bulletList",
                            "orderedList",
                          ]}
                          onContentChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ModelFooter className="p-0">
                  <Button type="submit" className="w-full mt-2">
                    Save changes
                  </Button>
                </ModelFooter>
              </form>
            </Form>
          </ModelBody>
        </ModelContent>
      </Model>
    </div>
  );
};

export default EducationForm;
