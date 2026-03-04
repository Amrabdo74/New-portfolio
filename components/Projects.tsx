"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MagicCard } from "./ui/Card";
import { GradualSpacing } from "./ui/GradualSpacing";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./ui/MagicButton";

type Project = {
  id: string;
  title: string;
  des: string;
  img: string;
  iconsList?: string[];
  link: string;
  sourceCode: string;
};

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!db) {
        setLoading(false);
        setError("Could not load projects right now.");
        return;
      }
      try {
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        const data: Project[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }));
        setProjects(data);
      } catch (err) {
        console.error("Error loading projects from Firestore", err);
        setError("Could not load projects right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects">
      <div className="container my-10 ">
        <GradualSpacing text="Recent Projects" className="pt-14" />

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 sm:mt-10 mt-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <MagicCard key={idx}>
                <div className="p-4 sm:p-5 animate-pulse">
                  <div className="w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-sm bg-[#0C0E23]" />
                  <div className="pt-5 space-y-3">
                    <div className="h-6 w-2/3 rounded bg-[#0C0E23]" />
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-[#0C0E23]" />
                      <div className="h-4 w-11/12 rounded bg-[#0C0E23]" />
                      <div className="h-4 w-9/12 rounded bg-[#0C0E23]" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#0C0E23]" />
                        <div className="w-8 h-8 rounded-full bg-[#0C0E23]" />
                        <div className="w-8 h-8 rounded-full bg-[#0C0E23]" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-4 w-16 rounded bg-[#0C0E23]" />
                        <div className="h-4 w-14 rounded bg-[#0C0E23]" />
                      </div>
                    </div>
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="mt-6 text-sm text-red-400">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 sm:mt-10">
              {projects.map((project) => (
                <MagicCard key={project.id}>
                  <div className="flex flex-col items-center w-full h-full transform hover:shadow-xl transition-shadow duration-500">
                    <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-sm overflow-hidden bg-[#0C0E23]">
                      <Link
                        href={project.link}
                        target="_blank"
                        className="flex items-center justify-center gap-1 hover:text-purple whitespace-nowrap"
                      >
                        <Image
                          src={project.img}
                          alt={project.title}
                          fill
                          priority
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="rounded w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                    </div>
                    <div className="pt-5">
                      <h2 className="text-2xl font-bold line-clamp-1 h-[32px]">
                        {project.title}
                      </h2>
                      <p className="mt-3 text-sm text-white-100 line-clamp-4 h-[80px]">
                        {project.des}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-5">
                        <div className="flex -space-x-1 overflow-hidden ps-1 py-2 shrink-0">
                          {project.iconsList?.map((icon, index) => (
                            <div
                              key={index}
                              className="border rounded-full bg-gradient-to-r from-[#04071D] to-[#0C0E23] lg:w-10 lg:h-10 w-7 h-7 sm:w-8 sm:h-8 flex justify-center items-center shrink-0 relative"
                              style={{
                                transform: `translateX(-${5 * index + 2}px)`,
                              }}
                            >
                              <Image
                                src={icon}
                                alt=""
                                fill
                                className="p-1.5 sm:p-2 object-contain"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-white-100 text-sm sm:text-lg shrink-0">

                          {project.sourceCode && <Link
                            href={project.sourceCode}
                            target="_blank"
                            className="flex items-center justify-center gap-1 hover:text-purple whitespace-nowrap"
                          >
                            GitHub <FaLocationArrow />
                          </Link>}
                          <Link
                            href={project.link}
                            target="_blank"
                            className="flex items-center justify-center gap-1 hover:text-purple whitespace-nowrap"
                          >
                            Demo <FaLocationArrow />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              ))}
            </div>
            <div className="flex items-center justify-center mt-5">
              <Link href={"https://github.com/Amrabdo74"} target="_Blank">
                <MagicButton
                  title="View All Projects"
                  icon={<FaLocationArrow />}
                  position="right"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;

