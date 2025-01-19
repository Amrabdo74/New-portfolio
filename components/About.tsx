import Image from "next/image";
import { GradualSpacing } from "./ui/GradualSpacing";
import { ShineBorder } from "./ui/ShineBorder";
import { aboutData } from "@/data";

function About() {
  return (
    <section id="about">
      <div className="flex flex-col items-center justify-center w-full py-20 container">
        <GradualSpacing text="About Me" />
        <ShineBorder
          className="relative w-full flex-col overflow-hidden rounded-lg border !bg-[#020617] md:shadow-xl p-5 sm:p-10"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <div className="flex gap-x-10 gap-y-5 flex-col items-center md:items-start text-center md:text-start md:flex-row w-full font-cairo">
            <div className="rounded-full overflow-hidden size-32 sm:!size-60">
              <Image
                src="/amr.jpg"
                alt="Amr abdo"
                width={400}
                height={400}
                className="rounded-full w-full object-cover"
                priority
              />
            </div>
            <div className="!leading-relaxed text-sm md:text-lg flex-1 text-start">
          <p>
          I am Front-End developer with solid knowledge and experience in HTML, CSS, JavaScript, jQuery,
Bootstrap, Tailwind, React, and Redux. Currently working as a Front-End Developer, I am passionate
about creating user-friendly and efficient web applications. I aim to contribute to the success of my
future employers and further develop my skills in a dynamic work environment. I am actively seeking a
better opportunity to advance my career and make significant contributions to a forward-thinking
company.
          </p>
              <div className="flex flex-col md:flex-row flex-wrap gap-10 mt-5 w-full justify-between">
                {aboutData.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 justify-start"
                  >
                    <span className="text-3xl font-bold text-black dark:text-white">
                      +{item.number}
                    </span>
                    <span className="text-sm md:text-md text-gray-600 dark:text-gray-400">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShineBorder>
      </div>
    </section>
  );
}
export default About;
