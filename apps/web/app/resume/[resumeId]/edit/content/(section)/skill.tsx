"use client";
import FormTrigger from "@/components/education/formTrigger";
import SkillForm from "@/components/resume-form/skills-form";
import SectionCard from "@/components/section-card";
import SectionHeading from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import { Skill as SkillType } from "@/lib/types";
import useResumeStore from "@/hooks/useResumeStore";
import { useState } from "react";

const Skill = () => {
  const skills = useResumeStore((state) => state.skills);
  const deleteSkill = useResumeStore((state) => state.deleteSkill);
  const setSkill = useResumeStore((state) => state.setSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  let defaultVal: SkillType = {
    id: "",
    skillCategories: "",
    skillList: "",
    resumeId: "",
  };

  if (selectedSkill) {
    defaultVal = skills.find((skill) => skill.id === selectedSkill)!;
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <SectionHeading title="Skill" icon="skill" />

      {skills.length > 0 && (
        <div className="space-y-3">
          {skills.map((skill) => (
            <SectionCard
              key={skill.id}
              id={skill.id}
              onDelete={deleteSkill}
              primaryHeading={skill.skillCategories}
              secondaryHeading={skill.skillList || ""}
              setIsEducationFormOpen={setIsSkillFormOpen}
              setSelectedEducation={setSelectedSkill}
            />
          ))}
        </div>
      )}

      <SkillForm
        isOpened={isSkillFormOpen}
        setIsOpened={setIsSkillFormOpen}
        selectedSkill={selectedSkill}
        onCreate={setSkill}
        onEdit={updateSkill}
        mode={selectedSkill ? "edit" : "create"}
        defaultVal={defaultVal}
      />
      <FormTrigger
        setIsOpened={setIsSkillFormOpen}
        setSelectedEducation={setSelectedSkill}
      />
      <Separator />
    </section>
  );
};

export default Skill;
