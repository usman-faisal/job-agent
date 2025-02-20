"use client";

import useResumeStore from "@/hooks/useResumeStore";

const Skill = () => {
  const skills = useResumeStore((state) => state.skills);
  if (skills.length === 0) return null;
  return (
    <section className="mb-4">
      <h3 className="text-lg font-bold uppercase mb-2">Area of Expertise</h3>
      <hr className="border-t border-gray-300 mb-2" />
      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="text-sm">
            {skill.skillList}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skill;
