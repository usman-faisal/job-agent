"use client"; 

import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileForm from "@/components/resume-form/profile-form";
import Resume from "@/components/resume-template/resume";
import Education from "./(section)/education";
import Experience from "./(section)/experience";
import Project from "./(section)/project";
import Skill from "./(section)/skill";
import Language from "./(section)/language";
import Certification from "./(section)/certification";
import { useResume } from "@/lib/api/resume";
import { useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { isValidResume } from "@/lib/utils";

const EditResume = () => {
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const router = useRouter();
  const { mutate: getResume, isPending } = useResume(resumeId);
  
  const fetchResume = useCallback(() => {
    if (resumeId) {
      getResume();
    }
  }, [getResume, resumeId]);
  
  useEffect(() => {
    if(!isValidResume(resumeId)) {
      router.push('/resume');
    }
    fetchResume();
  }, [fetchResume]);
  
  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex w-full xl:max-w-5xl">
        <ScrollArea className="h-screen w-full ">
          <div className="space-y-6 p-4 md:w-[45vw] xl:w-full mb-24 md:mb-0">
            <ProfileForm />
            <Education />
            <Experience />
            <Project />
            <Skill />
            <Language />
            <Certification />
          </div>
        </ScrollArea>
      </div>
      <div className="max-w-full hidden md:block">
        <Resume />
      </div>
    </>
  );
};

export default EditResume;
