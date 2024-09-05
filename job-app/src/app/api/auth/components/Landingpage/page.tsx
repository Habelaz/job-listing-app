'use client';
import { useGetAllJobsQuery } from '@/app/features/api';
import { redirect, useRouter } from 'next/navigation'; 
import JobList from '../JobList';
import { JobPosting } from '../JobList';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

function LandingPage() {
  const router = useRouter(); 
  const { data, error, isError, isLoading } = useGetAllJobsQuery(null);
  const jobList = data?.data;
  const {data:session} = useSession({
    required:true,
    onUnauthenticated (){
      redirect("/api/auth/signin?callbackUrl=/components/Landingpage")
    }
  })
  console.log(jobList)
  const handleClick = (jobData: JobPosting) => {
    const jobDataString = encodeURIComponent(JSON.stringify(jobData));
    router.push(`/dashboard?jobData=${jobDataString}`);
  };
  // console.log(isLoading)
  if (isLoading) {
    return (
    <div className='loading mt-[25%] ml-[50%]'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    )
  }

  if (isError) {
    return <div className='text-center pt-[25%] text-3xl'>Error: { 'Failed to fetch job data.'}</div>;
  }

  return (
    <div className="pl-3 m-6 flex flex-col w-[70%]">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex justify-center items-center fixed top-5 left-95 right-5 rounded-md w-auto h-10 back-brand-color text-white ml-5">
            <div className="flex justify-end gap-4 items-center w-full my-4">
              <button 
                className="text-blue-950 bg-slate-100 rounded-3xl shadow-lg p-3 w-[120px]" 
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Logout
              </button>
              <Link href="/api/auth/components/Bookmarks">
                <button className="text-blue-950 bg-slate-100 rounded-3xl shadow-lg p-3" >
                  bookmarks
                </button>
              </Link>
              
            </div>
          </div>

          <h1 className="text-2xl opp font-extrabold">Opportunities</h1>
          <p className="p-color">Showing {jobList?.length || 0} results</p>
        </div>
        <div>
          <label htmlFor="select">Sort by: </label>
          <select className="border rounded-lg" name="select" id="select">
            <option value="most-relevant">Most relevant</option>
            <option value="alphabet">Alphabet</option>
          </select>
        </div>
      </div>
      <div>
        {jobList?.map((job: JobPosting) => (
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
}

export default LandingPage;
