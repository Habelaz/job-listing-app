import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { useSession } from "next-auth/react"; // Import useSession
import { useCreateBookmarkMutation, useUnbookmarkMutation } from "@/app/features/api";

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  location: string[];
  whenAndWhere: string;
  status: string;
  isRolling: boolean;
  datePosted: string;
  deadline: string;
  startDate: string;
  endDate: string;
  applicantsCount: number;
  viewsCount: number;
  average_rating: number;
  total_reviews: number;
  categories: string[];
  logoUrl: string;
  opType: string;
  orgID: string;
  orgName: string;
  orgEmail: string;
  orgPrimaryPhone: string;
  isBookmarked: boolean;
  perksAndBenefits: string | null;
  questions: string | null;
  requiredSkills: string[];
  createdAt: string;
  updatedAt: string;
}

const JobList = (props: JobPosting) => {
  const { data: session } = useSession(); 
  const accessToken = session?.user.accessToken as string
  useEffect(() => {
    setIsBookmarked(props.isBookmarked);
  }, [props.isBookmarked]);
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked);
  const [createBookmark,{isSuccess:book}] = useCreateBookmarkMutation();
  const [unbookmark,{isSuccess:unbook}] = useUnbookmarkMutation();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); 

    if (!session) {
      console.error("User not authenticated");
      return;
    }

    try {
      if (isBookmarked) {
        // Unbookmark logic
        // console.log("isbookmarked ",book)
        const result = await unbookmark({ eventId: props.id, token: accessToken }).unwrap(); 
        console.log("Unbookmark result", result.success);
      } else {
        // Bookmark logic
        // console.log("is not bookmarked ",unbook)
        const result = await createBookmark({ eventId: props.id, token: accessToken }).unwrap(); 
        console.log("Bookmark result", result.success);
      }
    } catch (error) {
      console.error("Error in bookmark handling:", error);
    }

    setIsBookmarked((prev) => !prev); 
  };
  // console.log("props.isBookmarked",props.isBookmarked)
  return (
    <div className="flex m-5 container rounded-3xl relative">
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={isBookmarked ? faBookmark : regularBookmark} className="absolute top-8 right-8 text-[#172554]" />
      </button>

      <div className="jobp">
        <img src={props.logoUrl} alt="img" />
      </div>
      <div className="pl-3 text">
        <h2 className="text-[20px] font-semibold">{props.title}</h2>
        <p className="capitalize text-background pt-1 pb-1 company font-extralight">
          {props.orgName} &#183; {props.location}
        </p>
        <p>{props.description}</p>
        <div className="flex pt-8 gap-3">
          <button className="one px-3 h-7 rounded-3xl">In Person</button>
          <span className="line"></span>
          <button className="two px-3 h-7 rounded-3xl"> education</button>
          <button className="three px-6 h-7 rounded-3xl">IT</button>
          
        </div>
      </div>
    </div>
  );
};

export default JobList;
