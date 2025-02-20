"use client";
import ResumeTemplate1 from "@/components/resume-template/resume-template-1";
import { Button } from "@/components/ui/button";
import { useResume } from "@/lib/api/resume";
import { templates } from "@/lib/constants/templates";
import { useRouter } from "next/navigation";
export default function Resume()
{
    const router = useRouter();
    const handleEditClick = (resumeIdentifier: string) => {
        router.push(`/resume/${resumeIdentifier}/edit/content`);
    }
    return (
        <div className="flex flex-col gap-4">
            <h1>Resume</h1>
            <div className="flex flex-col gap-4">
                {templates.map((template) => (
                    <div key={template.id}>
                        <img src={template.image} className="w-44 h-64" alt={template.name} />
                        <div className="">
                            <p>{template.name}</p>
                            <Button onClick={() => handleEditClick(template.resumeIdentifier)} className="bg-blue-500 text-white">
                                Edit
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}