import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../common/context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../common/components/Header';
import '../index.css';
import * as Yup from 'yup';
import { fetchRecruiterProfile, submitRecruiterProfile } from '../common/redux/recruiterProfileSlice';
import PopupStatus from '../common/components/PopupStatus';
import messages from '../common/constant/messages';

function RecruiterProfile() {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const {
    email,
  } = useContext(UserContext);

  const [showPopup, setShowPopup] = useState(false);
  const {
    fetchProfile: { data: fetchProfileData, status: fetchProfileStatus, error: fetchProfileError },
    submitProfile: { data: submitProfileData, status: submitProfileStatus, error: submitProfileError },
  } = useSelector((state) => state.recruiterProfile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecruiterProfile(email));
  }, [dispatch]);

  const initialValues = {
    firstName: fetchProfileData.firstName,
    lastName: fetchProfileData.lastName,
    email: fetchProfileData.email,
    phone: fetchProfileData.phone,
    country: fetchProfileData.country,
    state: fetchProfileData.state,
    city: fetchProfileData.city,
    degree: fetchProfileData.degree,
    location: fetchProfileData.location,
    department: fetchProfileData.department,
    experience: fetchProfileData.experience,
    skillset: fetchProfileData.skillset,
    cvDoc: fetchProfileData.cvDoc,
  };
  if (fetchProfileStatus === 'loading') return <div>Loading...</div>;
  if (fetchProfileStatus === 'failed') return <div>Error: {error}</div>;

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(submitRecruiterProfile(values)).then(() => {
      setSubmitting(false);
      setShowPopup(true);
    });
  };
  const props = {
    status: submitProfileStatus,
    message:
      submitProfileStatus === 'failed'
        ? messages.RECRUITER_PROFILE_FAILED
        : messages.RECRUITER_PROFILE_SUCCESS,
    setShowPopup,
  };

  return (
    <div className='main-container'>
      <Header />
      <div className='main-content'>
        {(submitProfileStatus == 'failed' || submitProfileStatus == 'succeeded') && showPopup ? (
          <PopupStatus {...props} />
        ) : null}
        <p className='p-header-title'> Profile</p>
        <div className='flex justify-between'>
          <p className='p-header-description'>Profile information</p>
          <button
            className={`edit-btn ${isEditMode ? 'hidden' : 'block'}`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            Edit profile
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='form-grid-col-2'>
                <div>
                  <label htmlFor='first_name' className='form-grid-col-2-label'>
                    First name
                  </label>
                  <Field
                    type='text'
                    id='first_name'
                    name='firstName'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                  <ErrorMessage name='firstName' component='div' className='required-validation' />
                </div>
                <div>
                  <label htmlFor='last_name' className='form-grid-col-2-label'>
                    Last name
                  </label>
                  <Field
                    type='text'
                    id='last_name'
                    name='lastName'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                  <ErrorMessage name='lastName' component='div' className='required-validation' />
                </div>
                <div>
                  <label htmlFor='email' className='form-grid-col-2-label'>
                    Email
                  </label>
                  <Field type='text' id='email' name='email' className='form-grid-col-2-input' readOnly />
                  <ErrorMessage name='email' component='div' />
                </div>
                <div>
                  <label htmlFor='phone' className='form-grid-col-2-label'>
                    Phone number
                  </label>
                  <Field
                    type='text'
                    id='phone'
                    name='phone'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                </div>
                <div>
                  <label htmlFor='country' className='form-grid-col-2-label'>
                    Country
                  </label>
                  <Field
                    type='text'
                    id='country'
                    name='country'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                </div>
                <div>
                  <label htmlFor='state' className='form-grid-col-2-label'>
                    State
                  </label>
                  <Field
                    type='text'
                    id='state'
                    name='state'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                </div>
                <div>
                  <label htmlFor='city' className='form-grid-col-2-label'>
                    City
                  </label>
                  <Field
                    type='text'
                    id='city'
                    name='city'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                </div>
                <div>
                  <label htmlFor='position' className='form-grid-col-2-label'>
                    Position
                  </label>
                  <Field
                    type='text'
                    id='position'
                    name='position'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                </div>
                <div>
                  <label htmlFor='linkedInProfile' className='form-grid-col-2-label'>
                    LinkedIn Profile link
                  </label>
                  <Field
                    type='text'
                    id='linkedInProfile'
                    name='linkedInProfile'
                    className='form-grid-col-2-input'
                    readOnly={isEditMode ? false : true}
                  />
                </div>
              </div>
              {isEditMode ? (
                <>
                  <button className='submit-btn' type='submit' disabled={isSubmitting}>
                    Submit
                  </button>
                  <span> </span>
                  <button
                    className='cancel-btn'
                    type='button'
                    disabled={isSubmitting}
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RecruiterProfile;
