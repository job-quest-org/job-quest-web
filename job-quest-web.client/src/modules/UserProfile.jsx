import React, { useContext, useEffect } from 'react';
import UserContext from '../common/context/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Header from '../common/components/Header';
import '../index.css';

function UserProfile() {
  const [userProfileData, setUserProfileData] = React.useState([]);
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
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const url = `https://localhost:44396/api/user/UserProfile?email=${encodeURIComponent(email)}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setUserProfileData(data);
      } catch (error) {
        console.error('Failed to fetch user profiles:', error);
      }
    };
    fetchUserProfile();
  }, []);
  const initialVlaues = {
    firstName: userProfileData.firstName,
    lastName: userProfileData.lastName,
    email: userProfileData.email,
    country: userProfileData.country,
    state: userProfileData.state,
    city: userProfileData.city,
    degree: userProfileData.degree,
    location: userProfileData.location,
    department: userProfileData.department,
    experience: userProfileData.experience,
    skillset: userProfileData.skillset,
    cvDoc: userProfileData.cvDoc,
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
        <Formik initialValues={initialVlaues} onSubmit={updateProfileInfo}>
          {({ isSubmitting }) => (
            <Form>
              {userProfileData.map((profile, index) => (
                <div key={index}>
                  <div class='form-grid-col-2'>
                    <div>
                      <label for='first_name' class='form-grid-col-2-label'>
                        First name
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        class='form-grid-col-2-input'
                        value={profile.firstName}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='last_name' class='form-grid-col-2-label'>
                        Last name
                      </label>
                      <input
                        type='text'
                        id='last_name'
                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Doe'
                        value={profile.lastName}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='email' class='form-grid-col-2-label'>
                        Email
                      </label>
                      <input
                        type='text'
                        id='email'
                        class='form-grid-col-2-input'
                        value={profile.email}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='country' class='form-grid-col-2-label'>
                        Country
                      </label>
                      <input
                        type='text'
                        id='country'
                        class='form-grid-col-2-input'
                        value={profile.country}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='state' class='form-grid-col-2-label'>
                        State
                      </label>
                      <input
                        type='text'
                        id='state'
                        class='form-grid-col-2-input'
                        value={profile.state}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='city' class='form-grid-col-2-label'>
                        City
                      </label>
                      <input
                        type='text'
                        id='city'
                        class='form-grid-col-2-input'
                        value={profile.city}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='degree' class='form-grid-col-2-label'>
                        Degree
                      </label>
                      <input
                        type='text'
                        id='degree'
                        class='form-grid-col-2-input'
                        value={profile.degree}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='location' class='form-grid-col-2-label'>
                        Location
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        class='form-grid-col-2-input'
                        value={profile.location}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='department' class='form-grid-col-2-label'>
                        Department
                      </label>
                      <input
                        type='text'
                        id='department'
                        class='form-grid-col-2-input'
                        value={profile.department}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='experience' class='form-grid-col-2-label'>
                        Experience
                      </label>
                      <input
                        type='text'
                        id='experience'
                        class='form-grid-col-2-input'
                        value={profile.experience}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='skillset' class='form-grid-col-2-label'>
                        Skills
                      </label>
                      <input
                        type='text'
                        id='skillset'
                        class='form-grid-col-2-input'
                        value={profile.department}
                        readonly
                      />
                    </div>
                    <div>
                      <label for='cvDoc' class='form-grid-col-2-label'>
                        CV
                      </label>
                      <input
                        type='text'
                        id='cvDoc'
                        class='form-grid-col-2-input'
                        value={profile.cvDoc}
                        readonly
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserProfile;
