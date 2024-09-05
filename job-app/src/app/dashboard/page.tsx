'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCirclePlus, faFire, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { JobPosting } from '../api/auth/components/JobList';

function dateformat(date:string){
  const datee = new Date(date)

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = datee.toLocaleDateString('en-US', options);
  return formattedDate
}

const Dashboard = () => {
  const searchParams = useSearchParams();
  const [jobData, setJobData] = useState<JobPosting | null>(null);

  useEffect(() => {
    const jobDataString = searchParams.get('jobData');
    if (jobDataString) {
      setJobData(JSON.parse(jobDataString)); // No need to use decodeURIComponent
    }
  }, [searchParams]);

  if (!jobData) return <div>Loading...</div>;

  return (
    <div className='flex dashboard p-6 gap-10'>
      <div className="description">
        <p className='pt-10 pb-3 font-extrabold text-xl'>Description</p>
        <p>{jobData?.description}</p>
        
        <p className='pt-10 pb-3 font-extrabold text-xl'>Responsibilities</p>
        <ul>
          {jobData?.responsibilities}
        </ul>

        <p className='pt-10 pb-3 font-extrabold text-xl'>Ideal Candidate We Want</p>
        <p>{jobData?.idealCandidate}</p>

        <p className='pt-10 pb-3 font-extrabold text-xl'>When & Where</p>
        <p className='flex items-center gap-2'>
          <FontAwesomeIcon className="p-2 icon-blue border rounded-full" icon={faLocationDot} />
          {jobData?.whenAndWhere}
        </p>
      </div>

      <div>
        <p className='font-extrabold text-xl pb-3'>About</p>
        <div className='flex items-center gap-2 pb-2'>
          <FontAwesomeIcon className="p-2 icon-blue border rounded-full" icon={faCirclePlus} />
          <div>
            <p className='p-color'>Posted on</p>
            <p>{dateformat(jobData?.datePosted)}</p>
          </div>
        </div>

        <div className='flex items-center gap-2 pb-2'>
          <FontAwesomeIcon className="p-2 icon-blue border rounded-full" icon={faFire} />
          <div>
            <p className='p-color'>Deadline</p>
            <p>{dateformat(jobData?.deadline)}</p>
          </div>
        </div>

        <div className='flex items-center gap-2 pb-2'>
          <FontAwesomeIcon className="p-2 icon-blue border rounded-full" icon={faLocationDot} />
          <div>
            <p className='p-color'>Location</p>
            <p>{jobData?.location}</p>
          </div>
        </div>

        <div className='flex items-center gap-2 pb-2'>
          <FontAwesomeIcon className="p-2 icon-blue border rounded-full" icon={faCalendar} />
          <div>
            <p className='p-color'>Start Date</p>
            <p>{dateformat(jobData?.startDate)}</p>
          </div>
        </div>

        <div className='flex items-center gap-2 pb-4'>
          <FontAwesomeIcon className="p-2 icon-blue border rounded-full" icon={faCalendar} />
          <div>
            <p className='p-color'>End Date</p>
            <p>{dateformat(jobData?.endDate)}</p>
          </div>
        </div>

        <div className="border-b-2 w-64 gray-bottom"></div>

        <p className='font-extrabold text-xl pb-3'>Categories</p>
        <div>
          {jobData?.categories?.map((category, index) => (
            <button
              key={index}
              className="three social px-6 h-7 rounded-3xl mr-4 mb-2"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="border-b-2 w-64 gray-bottom py-2"></div>

        <p className='font-extrabold text-xl py-3'>Required Skills</p>
        <div>
          {jobData?.requiredSkills?.map((skill, index) => (
            <button
              key={index}
              className="three social px-6 h-7 rounded-3xl mr-4 mb-2"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
