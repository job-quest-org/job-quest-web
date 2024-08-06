import React from 'react';
import { useSelector } from 'react-redux';
import '../../index.css';

const JobCard = () => {
  const {
    jobsList: { data: jobsListData = [], status: jobsListStatus, error: jobsListError },
  } = useSelector((state) => state.jobsBrowse);

  return (
    <div className='form-grid-col-2'>
      
        {Array.isArray(jobsListData) && jobsListData.length > 0 ? (
          jobsListData.map((job) => (
            <div className={job.id}>
            
              <a href='#'>
                <h5 className='job-card-title'>{job.jobTitle}</h5>
              </a>
              <p className='job-card-description'>{job.jobDescription.substring(0, 20) + '...'}</p>
              <a
                href='#'
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                View more
                <svg
                  className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </a>
              </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
  );
};
export default JobCard;
