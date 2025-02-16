"use client";

import { useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Draggable from "react-draggable";
import ResumeToolKit from "./resume-tool-kit";
import ResumeTemplate1 from "./resume-template-1";
import useResumeStore from "@/hooks/useResumeStore";

const Resume = () => {
  const resumeRef = useRef(null);
  const resumeData = useResumeStore()
  const { resumeId } = resumeData;
  return (
    <div className="p-4 relative w-full">
      <TransformWrapper
        ref={resumeRef}
        maxScale={2}
        centerOnInit={true}
        minScale={0.2}
        initialScale={0.5}
        limitToBounds={false}
        smooth={false}
      >
        {(toolTip) => (
          <>
            <ResumeToolKit toolTip={toolTip} />
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                maxHeight: "100vh",
              }}
            >
              {/* <Draggable> */}
                <div
                  ref={resumeRef}
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    transformOrigin: "top left",
                  }}
                >
                  {resumeId === "1" && <ResumeTemplate1 />}
                  {/* <MyResume /> */}
                  {/* <ResumeTemplate3 /> */}
                  {/* <ResumeTemplate1 /> */}
                </div>
              {/* </Draggable> */}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Resume;
