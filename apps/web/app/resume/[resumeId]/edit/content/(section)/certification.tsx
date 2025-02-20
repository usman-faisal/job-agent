"use client";
import FormTrigger from "@/components/education/formTrigger";
import CertificationForm from "@/components/resume-form/certification-form";
import SectionCard from "@/components/section-card";
import SectionHeading from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import { Certification as CertificationType } from "@/lib/types";
import useResumeStore from "@/hooks/useResumeStore";
import { useState } from "react";

const Certification = () => {
  const certifications = useResumeStore((state) => state.certifications);
  const deleteCertification = useResumeStore(
    (state) => state.deleteCertification
  );
  const setCertification = useResumeStore((state) => state.setCertification);
  const updateCertification = useResumeStore(
    (state) => state.updateCertification
  );
  const [isCertificationFormOpen, setIsCertificationFormOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<
    string | null
  >(null);
  let defaultVal: CertificationType = {
    id: "",
    certificationName: "",
    certificationAuthority: "",
    certificationProof: "",
    description: "",
    date: "",
    resumeId: "",
  };

  if (selectedCertification) {
    defaultVal = certifications.find(
      (certification) => certification.id === selectedCertification
    )!;
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <SectionHeading title="Certification" icon="certification" />

      {certifications.length > 0 && (
        <div className="space-y-3">
          {certifications.map((certification) => (
            <SectionCard
              key={certification.id}
              id={certification.id}
              onDelete={deleteCertification}
              primaryHeading={certification.certificationName}
              secondaryHeading={certification.certificationAuthority || ""}
              setIsEducationFormOpen={setIsCertificationFormOpen}
              setSelectedEducation={setSelectedCertification}
            />
          ))}
        </div>
      )}

      <CertificationForm
        isOpened={isCertificationFormOpen}
        setIsOpened={setIsCertificationFormOpen}
        selectedCertification={selectedCertification}
        onCreate={setCertification}
        onEdit={updateCertification}
        mode={selectedCertification ? "edit" : "create"}
        defaultVal={defaultVal}
      />
      <FormTrigger
        setIsOpened={setIsCertificationFormOpen}
        setSelectedEducation={setSelectedCertification}
      />
      <Separator />
    </section>
  );
};

export default Certification;
