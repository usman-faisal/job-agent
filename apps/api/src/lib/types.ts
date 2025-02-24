// Prisma.EducationUncheckedCreateInput | Prisma.ExperienceUncheckedCreateInput | Prisma.SkillUncheckedCreateInput | Prisma.ProjectUncheckedCreateInput | Prisma.LanguageUncheckedCreateInput | Prisma.CertificationUncheckedCreateInput | Prisma.ProfileUncheckedCreateInput

import { Prisma, Role } from "@prisma/client";


export type SectionCreateInputTypes = {
    education: Prisma.EducationUncheckedCreateInput,
    experience: Prisma.ExperienceUncheckedCreateInput,
    skill: Prisma.SkillUncheckedCreateInput,
    project: Prisma.ProjectUncheckedCreateInput,
    language: Prisma.LanguageUncheckedCreateInput,
    certification: Prisma.CertificationUncheckedCreateInput,
    profile: Prisma.ProfileUncheckedCreateInput
}


export type ChatResponse = {role: Role, content: string}[]