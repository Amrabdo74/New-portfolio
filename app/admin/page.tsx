"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";

// Tech icons available for projects (path = public URL or /path.svg)
const AVAILABLE_ICONS = [
  { path: "/react.svg", label: "React" },
  { path: "/js.svg", label: "JavaScript" },
  { path: "/ts.svg", label: "TypeScript" },
  { path: "/next.svg", label: "Next.js" },
  { path: "/html.svg", label: "HTML" },
  { path: "/css.svg", label: "CSS" },
  { path: "/tailwind.svg", label: "Tailwind" },
  { path: "/redux.svg", label: "Redux" },
  { path: "/axios.svg", label: "Axios" },
  { path: "/firebase.svg", label: "Firebase" },
  { path: "/php-svgrepo-com.svg", label: "PHP" },
  { path: "/vercel.svg", label: "Vercel" },
  { path: "/clerk.svg", label: "Clerk" },
  { path: "/bootstrap-4.svg", label: "Bootstrap" },
  { path: "/framer-motion.svg", label: "Framer Motion" },
];

type Project = {
  id: string;
  title: string;
  des: string;
  img: string;
  iconsList?: string[];
  link: string;
  sourceCode: string;
  order?: number;
};

type Message = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  createdAt?: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    des: "",
    img: "",
    iconsList: [],
    link: "",
    sourceCode: "",
    order: 0,
  });

  const [uploadingImageFor, setUploadingImageFor] = useState<string | "new" | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [expandedProjectIds, setExpandedProjectIds] = useState<Set<string>>(new Set());

  const toggleProjectCard = (id: string) => {
    setExpandedProjectIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Upload failed");
    }
    const data = await res.json();
    return data.url;
  };

  const handleNewProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploadError(null);
    setUploadingImageFor("new");
    try {
      const url = await uploadImageToCloudinary(file);
      setNewProject((p) => ({ ...p, img: url }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImageFor(null);
      e.target.value = "";
    }
  };

  const handleProjectImageUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploadError(null);
    setUploadingImageFor(projectId);
    try {
      const url = await uploadImageToCloudinary(file);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, img: url } : p))
      );
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImageFor(null);
      e.target.value = "";
    }
  };

  const toggleNewProjectIcon = (path: string) => {
    setNewProject((p) => {
      const list = p.iconsList ?? [];
      const next = list.includes(path)
        ? list.filter((x) => x !== path)
        : [...list, path];
      return { ...p, iconsList: next };
    });
  };

  const toggleProjectIcon = (projectId: string, path: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const list = p.iconsList ?? [];
        const next = list.includes(path)
          ? list.filter((x) => x !== path)
          : [...list, path];
        return { ...p, iconsList: next };
      })
    );
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      try {
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, orderBy("order", "asc"));
        const projectsSnap = await getDocs(q);
        const projectsData: Project[] = projectsSnap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Project, "id">),
        }));

        const messagesRef = collection(db, "messages");
        const messagesSnap = await getDocs(messagesRef);
        const messagesData: Message[] = messagesSnap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Message, "id">),
        }));

        setProjects(projectsData);
        setMessages(messagesData);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      console.error(err);
      setAuthError("Invalid credentials or Firebase Auth not configured.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!newProject.img?.trim()) {
      setUploadError("Please upload an image (Cloudinary) or paste an image URL.");
      return;
    }
    setUploadError(null);
    setIsAddingProject(true);
    try {
      const nextOrder =
        projects.length === 0
          ? 0
          : Math.max(...projects.map((p) => p.order ?? 0)) + 1;
      const payload = {
        ...newProject,
        order: nextOrder,
        iconsList:
          typeof newProject.iconsList === "string"
            ? (newProject.iconsList as unknown as string)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : newProject.iconsList ?? [],
      };

      const ref = await addDoc(collection(db, "projects"), payload);
      setProjects((prev) => [...prev, { ...payload, id: ref.id } as Project]);
      setNewProject({
        title: "",
        des: "",
        img: "",
        iconsList: [],
        link: "",
        sourceCode: "",
        order: 0,
      });
    } finally {
      setIsAddingProject(false);
    }
  };

  const handleUpdateProject = async (project: Project) => {
    if (!user) return;
    const ref = doc(db, "projects", project.id);
    await updateDoc(ref, {
      title: project.title,
      des: project.des,
      img: project.img,
      iconsList: project.iconsList ?? [],
      link: project.link,
      sourceCode: project.sourceCode,
      order: project.order ?? 0,
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "projects", id));
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteMessage = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "messages", id));
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black-100 text-white">
        <div className="w-full max-w-md p-8 rounded-xl bg-[#0E162B] shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black-100 outline-none text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-black-100 outline-none text-sm"
                required
              />
            </div>
            {authError && (
              <p className="text-sm text-red-400 mt-1">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-[#A07CFE] to-[#da4478] text-white py-2 rounded-lg text-sm"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black-100 text-white p-6">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-600 text-sm"
        >
          Sign out
        </button>
      </header>

      {loading && <p className="mb-6 text-sm text-white-100">Loading data...</p>}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        {uploadError && (
          <p className="mb-4 text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-md">
            {uploadError}
          </p>
        )}

        <form
          onSubmit={handleCreateProject}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 rounded-lg bg-[#0E162B]"
        >
          <input
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject((p) => ({ ...p, title: e.target.value }))
            }
            className="px-3 py-2 rounded-md bg-black-100 text-sm"
            required
          />
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm text-gray-300">Project image</label>
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer px-3 py-2 rounded-md bg-black-100 text-sm border border-gray-600 hover:border-[#A07CFE]">
                {uploadingImageFor === "new" ? "Uploading…" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleNewProjectImageUpload}
                  disabled={uploadingImageFor === "new"}
                />
              </label>
              <span className="text-xs text-gray-400">or paste URL:</span>
              <input
                placeholder="Filled automatically when you upload, or paste URL"
                value={newProject.img}
                onChange={(e) => {
                  setNewProject((p) => ({ ...p, img: e.target.value }));
                  setUploadError(null);
                }}
                className="flex-1 min-w-[200px] px-3 py-2 rounded-md bg-black-100 text-sm"
              />
            </div>
          </div>
          <input
            placeholder="Demo link"
            value={newProject.link}
            onChange={(e) =>
              setNewProject((p) => ({ ...p, link: e.target.value }))
            }
            className="px-3 py-2 rounded-md bg-black-100 text-sm"
            required
          />
          <input
            placeholder="Source code link"
            value={newProject.sourceCode}
            onChange={(e) =>
              setNewProject((p) => ({ ...p, sourceCode: e.target.value }))
            }
            className="px-3 py-2 rounded-md bg-black-100 text-sm"
            // required
          />
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-2">Tech stack (check all that apply)</label>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_ICONS.map(({ path, label }) => (
                <label
                  key={path}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={(newProject.iconsList ?? []).includes(path)}
                    onChange={() => toggleNewProjectIcon(path)}
                    className="rounded border-gray-500 bg-black-100 text-[#A07CFE] focus:ring-[#A07CFE]"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Description"
            value={newProject.des}
            onChange={(e) =>
              setNewProject((p) => ({ ...p, des: e.target.value }))
            }
            className="px-3 py-2 rounded-md bg-black-100 text-sm md:col-span-2"
            rows={3}
          />
          <button
            type="submit"
            disabled={isAddingProject || uploadingImageFor === "new"}
            className="mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#A07CFE] to-[#da4478] text-sm md:col-span-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isAddingProject ? "Adding…" : "Add Project"}
          </button>
        </form>

        <div className="space-y-3">
          {projects.map((project) => {
            const isExpanded = expandedProjectIds.has(project.id);
            return (
              <div
                key={project.id}
                className="rounded-lg bg-[#0E162B] overflow-hidden border border-gray-700/50"
              >
                <button
                  type="button"
                  onClick={() => toggleProjectCard(project.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="w-16 h-12 rounded-md bg-black-100 shrink-0 overflow-hidden relative">
                    {project.img ? (
                      <Image
                        src={project.img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        No img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-white block truncate">
                      {project.title || "Untitled"}
                    </span>
                    <span className="text-xs text-gray-400">
                      Order: {project.order ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xs text-gray-400"
                      aria-hidden
                    >
                      {isExpanded ? "Collapse" : "Edit"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 space-y-3 border-t border-gray-700/50">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Title</label>
                      <input
                        className="w-full px-3 py-2 rounded-md bg-black-100 text-sm"
                        value={project.title}
                        onChange={(e) =>
                          setProjects((prev) =>
                            prev.map((p) =>
                              p.id === project.id ? { ...p, title: e.target.value } : p
                            )
                          )
                        }
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Description</label>
                      <textarea
                        className="w-full px-3 py-2 rounded-md bg-black-100 text-sm"
                        value={project.des}
                        onChange={(e) =>
                          setProjects((prev) =>
                            prev.map((p) =>
                              p.id === project.id ? { ...p, des: e.target.value } : p
                            )
                          )
                        }
                        rows={3}
                        placeholder="Description"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Image</label>
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer px-3 py-2 rounded-md bg-black-100 text-sm border border-gray-600 hover:border-[#A07CFE]">
                          {uploadingImageFor === project.id ? "Uploading…" : "Upload"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleProjectImageUpload(project.id, e)}
                            disabled={uploadingImageFor === project.id}
                          />
                        </label>
                        <input
                          className="flex-1 min-w-[180px] px-3 py-2 rounded-md bg-black-100 text-sm"
                          value={project.img}
                          onChange={(e) =>
                            setProjects((prev) =>
                              prev.map((p) =>
                                p.id === project.id ? { ...p, img: e.target.value } : p
                              )
                            )
                          }
                          placeholder="Image URL"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Demo link</label>
                        <input
                          className="w-full px-3 py-2 rounded-md bg-black-100 text-sm"
                          value={project.link}
                          onChange={(e) =>
                            setProjects((prev) =>
                              prev.map((p) =>
                                p.id === project.id ? { ...p, link: e.target.value } : p
                              )
                            )
                          }
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Source code link</label>
                        <input
                          className="w-full px-3 py-2 rounded-md bg-black-100 text-sm"
                          value={project.sourceCode}
                          onChange={(e) =>
                            setProjects((prev) =>
                              prev.map((p) =>
                                p.id === project.id ? { ...p, sourceCode: e.target.value } : p
                              )
                            )
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Order (display order)</label>
                      <input
                        type="number"
                        className="w-24 px-3 py-2 rounded-md bg-black-100 text-sm"
                        value={project.order ?? 0}
                        onChange={(e) =>
                          setProjects((prev) =>
                            prev.map((p) =>
                              p.id === project.id ? { ...p, order: Number(e.target.value) } : p
                            )
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Tech stack</label>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_ICONS.map(({ path, label }) => (
                          <label
                            key={path}
                            className="flex items-center gap-1.5 cursor-pointer text-xs"
                          >
                            <input
                              type="checkbox"
                              checked={(project.iconsList ?? []).includes(path)}
                              onChange={() => toggleProjectIcon(project.id, path)}
                              className="rounded border-gray-500 bg-black-100 text-[#A07CFE] focus:ring-[#A07CFE]"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleUpdateProject(project)}
                        className="px-4 py-2 rounded-md bg-green-600 text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-4 py-2 rounded-md bg-red-600 text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Messages</h2>
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-lg bg-[#0E162B] flex flex-col gap-1"
            >
              <div className="flex justify-between text-sm">
                <span className="font-semibold">
                  {m.firstName} {m.lastName}
                </span>
                <span className="text-xs text-gray-400">{m.email}</span>
              </div>
              <span className="text-xs text-gray-400">{m.phoneNumber}</span>
              <p className="mt-2 text-sm font-semibold">{m.subject}</p>
              <p className="mt-1 text-sm text-gray-200">{m.message}</p>
              <button
                onClick={() => handleDeleteMessage(m.id)}
                className="self-end mt-3 px-3 py-1 rounded-md bg-red-600 text-xs"
              >
                Delete
              </button>
            </div>
          ))}
          {!messages.length && (
            <p className="text-sm text-white-100">
              No messages have been received yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

