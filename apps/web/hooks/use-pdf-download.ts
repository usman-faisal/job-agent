// import useResumeStore from "@/store/resumeStore";
// import { useState } from "react";

// export const useDownloadPdf = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     profile,
//     educations,
//     experiences,
//     projects,
//     skills,
//     languages,
//     publications,
//     certifications,
//   } = useResumeStore();

//   const handleDownload = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/generate-resume", {
//         method: "POST",
//         body: JSON.stringify({
//           profile,
//           educations,
//           experiences,
//           projects,
//           skills,
//           languages,
//           publications,
//           certifications,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("PDF generation failed");
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       alert("Failed to download PDF. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { handleDownload, isLoading };
// };

import useResumeStore from "@/hooks/useResumeStore";
import { useState } from "react";

export const useDownloadPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resumeData = useResumeStore();

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDownload, isLoading };
};