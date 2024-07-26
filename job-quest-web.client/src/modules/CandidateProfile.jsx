import React, { useContext, useEffect } from 'react';
import UserContext from '../common/context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../common/components/Header';
import '../index.css';
import * as Yup from 'yup';

function CandidateProfile() {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
  } = useContext(UserContext);
  const dispatch = useDispatch();
  const { candidateProfileData, status, error } = useSelector((state) => state.candidateProfile);

  useEffect(() => {
    dispatch(fetchUserProfile(email));
  }, []);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  console.log('userProfileData:', candidateProfileData);
  const initialValues = {
    firstName: candidateProfileData.firstName,
    lastName: candidateProfileData.lastName,
    email: candidateProfileData.email,
    country: candidateProfileData.country,
    state: candidateProfileData.state,
    city: candidateProfileData.city,
    degree: candidateProfileData.degree,
    location: candidateProfileData.location,
    department: candidateProfileData.department,
    experience: candidateProfileData.experience,
    skillset: candidateProfileData.skillset,
    cvDoc: candidateProfileData.cvDoc,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(submitCandidateProfile(values)).then(() => {
      setSubmitting(false); // Set submitting to false once the call is done
    });

  };
  return (
    <div className='main-container'>
      <Header />
      <div className='main-content'>
        <p className='p-header-title'> Profile</p>
        <div className='flex justify-between'>
          <p className='p-header-description'>Profile information</p>
          <button
            className={`edit-btn ${isEditMode ? 'block' : 'block'}`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            Edit profile
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            degree: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
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
                      <ErrorMessage name='firstName' component='div' />
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
                      <ErrorMessage name='lastName' component='div' />
                    </div>
                    <div>
                      <label htmlFor='email' className='form-grid-col-2-label'>
                        Email
                      </label>
                      <Field type='text' id='email' name='email' className='form-grid-col-2-input' readOnly />
                      <ErrorMessage name='email' component='div' />
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
                      <ErrorMessage name='country' component='div' />
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
                      <ErrorMessage name='state' component='div' />
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
                      <ErrorMessage name='city' component='div' />
                    </div>
                    <div>
                      <label htmlFor='degree' className='form-grid-col-2-label'>
                        Degree
                      </label>
                      <Field
                        type='text'
                        id='degree'
                        name='degree'
                        className='form-grid-col-2-input'
                        readOnly={isEditMode ? false : true}
                      />
                      <ErrorMessage name='degree' component='div' />
                    </div>
                    <div>
                      <label htmlFor='location' className='form-grid-col-2-label'>
                        Preffered Location
                      </label>
                      <Field
                        type='text'
                        id='location'
                        name='location'
                        className='form-grid-col-2-input'
                        readOnly={isEditMode ? false : true}
                      />
                      <ErrorMessage name='location' component='div' />
                    </div>
                    <div>
                      <label htmlFor='department' className='form-grid-col-2-label'>
                        Department
                      </label>
                      <Field
                        type='text'
                        id='department'
                        name='department'
                        className='form-grid-col-2-input'
                        readOnly={isEditMode ? false : true}
                      />
                      <ErrorMessage name='department' component='div' />
                    </div>
                    <div>
                      <label htmlFor='experience' className='form-grid-col-2-label'>
                        Experience
                      </label>
                      <Field
                        type='number'
                        id='experience'
                        name='experience'
                        className='form-grid-col-2-input'
                        readOnly={isEditMode ? false : true}
                      />
                      <ErrorMessage name='experience' component='div' />
                    </div>
                    <div>
                      <label htmlFor='skillset' className='form-grid-col-2-label'>
                        Skillset
                      </label>
                      <Field
                        type='text'
                        id='skillset'
                        name='skillset'
                        className='form-grid-col-2-input'
                        readOnly={isEditMode ? false : true}
                      />
                      <ErrorMessage name='skillset' component='div' />
                    </div>
                    <div>
                      <label htmlFor='cvDoc' className='form-grid-col-2-label'>
                        CV
                      </label>
                      <Field
                        type='file'
                        id='cvDoc'
                        name='cvDoc'
                        className='form-grid-col-2-input'
                        readOnly={isEditMode ? false : true}
                      />
                    </div>
                  </div>
              {isEditMode ? (<><button className='submit-btn' type="submit" disabled={isSubmitting} >
                Submit
              </button>
              <button className='cancel-btn' type="button" disabled={isSubmitting} onClick= {setIsEditMode(faslse)}>
                Cancel
              </button></>) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CandidateProfile;
