import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../common/components/Header';
import '../index.css'; 
import JobCard from '../common/components/JobCard';
import { fetchJobsList } from '../common/redux/JobsBrowseSlice';

const JobsBrowse = () => {
  const {
    jobsList: { data: jobsListData, status: jobsListStatus, error: jobsListError },
  } = useSelector((state) => state.jobsBrowse);
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(fetchJobsList());  
    }, [dispatch]);
  return (
    <div className='main-container'>
      <Header />
      <div className='main-content'>
        {jobsListStatus == 'succeeded' ? <JobCard/> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default JobsBrowse;
