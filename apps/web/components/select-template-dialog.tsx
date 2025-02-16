"use client";
import { ArrowRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import img1 from "@/public/resume-templates/001.png";
import useResumeStore from "@/hooks/useResumeStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Model,
  ModelContent,
  ModelFooter,
  ModelHeader,
  ModelTitle,
  ModelTrigger,
} from "./responsive-model";
import ShinyButton from "./ShinyButton";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const images = [
  { src: img1, id: 1 },
  { src: img1, id: 2 },
  { src: img1, id: 3 },
  { src: img1, id: 4 },
];

const SelectDialog = () => {
  const [resumeTemplateId, setResumeTemplateId] = useState<null | number>(null);
  const router = useRouter();
  const setResumeId = useResumeStore((state) => state.setResumeId);
  const renderTemplate = images.map((image) => (
    <div
      className={cn(
        "rounded cursor-pointer",
        resumeTemplateId === image.id &&
          "ring-2 ring-ring ring-offset-[2.5px] ring-offset-background transition-colors outline-none"
      )}
      key={`${image.id}`}
      onClick={() => setResumeTemplateId(image.id)}
    >
      <Image
        src={image.src}
        alt="template"
        className="object-cover object-center rounded"
      />
    </div>
  ));
  const user = null;
  const createNewResume = () => {
    if (!user && resumeTemplateId) {
      setResumeId(`${resumeTemplateId}`);
      router.push(`/resume/${resumeTemplateId}/edit/content`);
    }
  };
  return (
    <Model>
      <ModelTrigger>
        <ShinyButton>
          Start Building
          <ArrowRight className="ml-2 h-5 w-5" />
        </ShinyButton>
      </ModelTrigger>
      <ModelContent className="md:max-w-[95vw] md:max-h-[95vh] p-1.5 xl:p-5">
        <ModelHeader className="space-y-2.5">
          <ModelTitle className="text-xl text-center">
            Choose Your Template
          </ModelTitle>
          <div className="sm:px-4">
            <Select disabled>
              <SelectTrigger className="text-base mx-auto sm:max-w-[280px] sm:mx-0">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent defaultValue={"all"}>
                <SelectItem
                  value="all"
                  defaultChecked={true}
                  className="text-base"
                >
                  All
                </SelectItem>
                <SelectItem value="frontend" className="text-base">
                  Frontend
                </SelectItem>
                <SelectItem value="backend" className="text-base">
                  Backend
                </SelectItem>
                <SelectItem value="fullstack" className="text-base">
                  Full Stack
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ModelHeader>

        <ScrollArea>
          <div className="h-[65vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-5 px-5 place-items-center">
            {renderTemplate}
          </div>
        </ScrollArea>

        <ModelFooter className="md:-translate-y-3.5 lg:-translate-y-2.5">
          <Button
            size="sm"
            disabled={!resumeTemplateId}
            onClick={createNewResume}
          >
            Continue
          </Button>
        </ModelFooter>
      </ModelContent>
    </Model>
  );
};

export default SelectDialog;
