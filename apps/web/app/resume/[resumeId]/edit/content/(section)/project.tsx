"use client";
import FormTrigger from "@/components/education/formTrigger";
import ProjectForm from "@/components/resume-form/project-form";
import SectionCard from "@/components/section-card";
import SectionHeading from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import { Project as ProjectType } from "@/lib/types";
import { formatLink } from "@/lib/utils";
import useResumeStore from "@/hooks/useResumeStore";
import { useState } from "react";

const Project = () => {
  const projects = useResumeStore((state) => state.projects);
  const deleteProject = useResumeStore((state) => state.deleteProject);
  const setProject = useResumeStore((state) => state.setProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  let defaultVal: ProjectType = {
    id: "",
    projectName: "",
    deploymentLink: "",
    projectDescription: "",
    resumeId: "",
  };

  if (selectedProject) {
    defaultVal = projects.find(
      (project) => project.id === selectedProject
    )!;
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <SectionHeading title="Project" icon="project" />

      {projects.length > 0 && (
        <div className="space-y-3">
          {projects.map((project) => (
            <SectionCard
              key={project.id}
              id={project.id}
              onDelete={deleteProject}
              primaryHeading={project.projectName}
              secondaryHeading={formatLink(project.deploymentLink || "")}
              setIsEducationFormOpen={setIsProjectFormOpen}
              setSelectedEducation={setSelectedProject}
            />
          ))}
        </div>
      )}

      <ProjectForm
        isOpened={isProjectFormOpen}
        setIsOpened={setIsProjectFormOpen}
        selectedProject={selectedProject}
        onCreate={setProject}
        onEdit={updateProject}
        mode={selectedProject ? "edit" : "create"}
        defaultVal={defaultVal}
      />
      <FormTrigger
        setIsOpened={setIsProjectFormOpen}
        setSelectedEducation={setSelectedProject}
      />
      <Separator />
    </section>
  );
};

export default Project;
