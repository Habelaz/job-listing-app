"use client";
import React from "react";
import { useGetBookmarksQuery } from "@/app/features/api";
import { useSession } from "next-auth/react";
import JobList from "../JobList";
import { JobPosting } from "../JobList";
import { useRouter } from "next/navigation";
import Link from "next/link"

const Page = () => {
  const session = useSession();
  const accessToken = session.data?.user.accessToken;
  const { data } = useGetBookmarksQuery({ token: accessToken });
  const jobList = data?.data;
  const router = useRouter();

  const handleClick = (jobData: JobPosting) => {
    const jobDataString = encodeURIComponent(JSON.stringify(jobData));
    router.push(`/dashboard?jobData=${jobDataString}`);
  };

  if (!jobList) {
    return (
      <div className="loading mt-[25%] ml-[50%]">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between w-[900px] font-bold text-[#25324B]">
        <p className="text-3xl ">My Bookmarks</p>
        <Link href="/components/Landingpage"> All jobs</Link>
      </div>
      <div>
        {jobList.map((job: JobPosting) => (
          <div
            key={job.id}
            onClick={() => handleClick(job)}
            className="cursor-pointer"
          >
            <JobList {...job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
