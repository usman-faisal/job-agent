"use client";
import { Separator } from "@/components/ui/separator";
import EducationForm from "@/components/resume-form/education-form";
import SectionHeading from "@/components/section-heading";
import useResumeStore from "@/hooks/useResumeStore";
import SectionCard from "@/components/section-card";
import { useState } from "react";
import FormTrigger from "@/components/education/formTrigger";
import { Education as EducationType } from "@/lib/types";
import { useDeleteSectionItem } from "@/lib/api/resume";
import { usePathname } from "next/navigation";
import { getIdFromUrl } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Education = () => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);
  const education = useResumeStore((state) => state.educations);
  const deleteEducationStore = useResumeStore((state) => state.deleteEducation);
  const setEducation = useResumeStore((state) => state.setEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<string | null>(
    null
  );
  const { mutateAsync: deleteEducation } = useDeleteSectionItem('education', {
    onSuccess: () => {
      toast.success("Education deleted successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete education");
    }
  });
  let defaultVal: Omit<EducationType, 'id' | 'resumeId'> = {
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    score: 0,
    institution: "",
    description: "",
  };

  if (selectedEducation) {
    defaultVal = education.find((edu) => edu.id === selectedEducation)!;
  }

  async function handleDelete(educationId: string) {
    await deleteEducation({ itemId: educationId, resumeId: pathName });
    deleteEducationStore(educationId);
  }

  return (
    <section className="flex flex-col gap-6 w-full ">
      <SectionHeading title="Education" icon="education" />

      {education.length > 0 && (
        <div className="space-y-3">
          {education.map((edu) => (
            <div draggable={true} key={edu.id}>
              <SectionCard
                id={edu.id}
                onDelete={(educationId) => handleDelete(educationId)}
                primaryHeading={`${edu.degree} ${edu.fieldOfStudy}`}
                secondaryHeading={edu.institution}
                setIsEducationFormOpen={setIsEducationFormOpen}
                setSelectedEducation={setSelectedEducation}
              />
            </div>
          ))}
        </div>
      )}

      <EducationForm
        isOpened={isEducationFormOpen}
        setIsOpened={setIsEducationFormOpen}
        selectedEducation={selectedEducation}
        onCreate={setEducation}
        onEdit={updateEducation}
        mode={selectedEducation ? "edit" : "create"}
        defaultVal={defaultVal}
      />
      <FormTrigger
        setIsOpened={setIsEducationFormOpen}
        setSelectedEducation={setSelectedEducation}
      />
      <Separator />
    </section>
  );
};

export default Education;
