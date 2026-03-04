"use client";
import { useState } from "react";
import { GradualSpacing } from "./ui/GradualSpacing";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/data";
import { ShineBorder } from "./ui/ShineBorder";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type ContactType = z.infer<typeof contactSchema>;

function Contact() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
  });

  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleContact = async (values: ContactType) => {
    setSubmitMessage(null);
    setSubmitError(null);
    try {
      await addDoc(collection(db, "messages"), {
        ...values,
        createdAt: serverTimestamp(),
      });
      setSubmitMessage("Your message has been sent successfully.");
      reset();
    } catch (error) {
      console.error("Error saving message:", error);
      setSubmitError("Something went wrong, please try again.");
    }
  };

  return (
    <div id="contact" className="container">
      <GradualSpacing text="Contact me" className="my-10" />
      <div className="flex gap-5 justify-around flex-col-reverse sm:flex-row">
        <div className="mt-5">
          <h1 className="text-xl sm:text-5xl mb-5 dark:text-white-100 font-bold tracking-tight">
            Send Us a Note and Initiate the Dialogue!
          </h1>
          <p className="text-normal text-sm sm:text-lg font-medium text-gray-600 dark:text-gray-400 mt-2">
            We’d love to hear from you! Whether you have questions, feedback, or
            just want to connect, reach out and let’s make it happen.
          </p>

          <div className="flex items-center mt-12 text-gray-600 dark:text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div className="ml-4 text-md tracking-wide font-semibold w-40">
              Egypt, Cairo
            </div>
          </div>

          <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div className="ml-4 text-md tracking-wide font-semibold w-40">
              <Link
                href={
                  "https://wa.me/+201021798849?text=السلام عليكم بشمهندس عمرو"
                }
                className="hover:underline hover:text-white transition-colors"
              >
                (+20) 01021798849
              </Link>
            </div>
          </div>

          <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div className="ml-4 text-md tracking-wide font-semibold w-40">
              <Link
                href={"mailto:amrabdo0102@gmail.com"}
                className="hover:underline hover:text-white transition-colors"
              >
                amrabdo0102@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <ShineBorder
          className="p-1  w-full max-w-[600px] mx-auto"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <form
            onSubmit={handleSubmit(handleContact)}
            className="space-y-4 w-full p-8 rounded-sm bg-[#0E162B] text-gray-50"
          >
            <div className="flex gap-5 items-center justify-center flex-col sm:flex-row">
              <div className="flex-1 w-full">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[#A07CFE]"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Ex. amr"
                  {...register("firstName")}
                  className="mt-1 block w-full px-4 py-3 rounded-[10px] bg-black-100 shadow-sm focus:outline-none sm:text-sm"
                />
                {errors?.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.firstName?.message}
                  </p>
                )}
              </div>

              <div className="flex-1 w-full">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[#A07CFE]"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Ex. abdo"
                  {...register("lastName")}
                  className="mt-1 block w-full px-4 py-3 rounded-[10px] bg-black-100 shadow-sm focus:outline-none sm:text-sm"
                />
                {errors?.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.lastName?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-5 items-center justify-center flex-col sm:flex-row">
              <div className="flex-1 w-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#A07CFE]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Ex. amr@example.com"
                  {...register("email")}
                  className="mt-1 block w-full px-4 py-3 rounded-[10px] bg-black-100 shadow-sm focus:outline-none sm:text-sm"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              <div className="flex-1 w-full">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-[#A07CFE]"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Ex. +201021798849"
                  {...register("phoneNumber")}
                  className="mt-1 block w-full px-4 py-3 rounded-[10px] bg-black-100 shadow-sm focus:outline-none sm:text-sm"
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.phoneNumber?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-[#A07CFE]"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Ex. Message Title"
                {...register("subject")}
                className="mt-1 block w-full px-4 py-3 rounded-[10px] bg-black-100 shadow-sm focus:outline-none sm:text-sm"
              />
              {errors?.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.subject?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#A07CFE]"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Ex. Hello, I'd like to work with you!"
                {...register("message")}
                className="mt-1 block w-full px-4 py-3 rounded-[10px] bg-black-100 shadow-sm focus:outline-none sm:text-sm"
              />
              {errors?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.message?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#A07CFE] to-[#da4478] text-white py-3 px-4 rounded-[12px] shadow focus:outline-none"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitMessage && (
              <p className="text-sm text-green-400">{submitMessage}</p>
            )}
            {submitError && (
              <p className="text-sm text-red-400">{submitError}</p>
            )}
          </form>
        </ShineBorder>
      </div>
    </div>
  );
}
export default Contact;
