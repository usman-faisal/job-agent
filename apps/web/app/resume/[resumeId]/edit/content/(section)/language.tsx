"use client";
import FormTrigger from "@/components/education/formTrigger";
import LanguageForm from "@/components/resume-form/language-form";
import SectionCard from "@/components/section-card";
import SectionHeading from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import { Language as LanguageType } from "@/lib/types";
import useResumeStore from "@/hooks/useResumeStore";
import { useState } from "react";

const Language = () => {
  const languages = useResumeStore((state) => state.languages);
  const deleteLanguage = useResumeStore((state) => state.deleteLanguage);
  const setLanguage = useResumeStore((state) => state.setLanguage);
  const updateLanguage = useResumeStore((state) => state.updateLanguage);
  const [isLanguageFormOpen, setIsLanguageFormOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  let defaultVal: LanguageType = {
    id: "",
    languageName: "",
    proficiency: "",
    resumeId: "",
  };

  if (selectedLanguage) {
    defaultVal = languages.find(
      (language) => language.id === selectedLanguage
    )!;
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <SectionHeading title="Language" icon="language" />

      {languages.length > 0 && (
        <div className="space-y-3">
          {languages.map((language) => (
            <SectionCard
              key={language.id}
              id={language.id}
              onDelete={deleteLanguage}
              primaryHeading={language.languageName}
              secondaryHeading={language.proficiency || ""}
              setIsEducationFormOpen={setIsLanguageFormOpen}
              setSelectedEducation={setSelectedLanguage}
            />
          ))}
        </div>
      )}

      <LanguageForm
        isOpened={isLanguageFormOpen}
        setIsOpened={setIsLanguageFormOpen}
        selectedLanguage={selectedLanguage}
        onCreate={setLanguage}
        onEdit={updateLanguage}
        mode={selectedLanguage ? "edit" : "create"}
        defaultVal={defaultVal}
      />
      <FormTrigger
        setIsOpened={setIsLanguageFormOpen}
        setSelectedEducation={setSelectedLanguage}
      />
      <Separator />
    </section>
  );
};

export default Language;
