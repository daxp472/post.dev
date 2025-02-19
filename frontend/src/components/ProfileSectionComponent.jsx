import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Users, MapPin, Link as LinkIcon, Twitter, Github, Mail,
  Edit, AlertTriangle, RefreshCw
} from 'lucide-react';

// Utility function for generating avatar
const generateAvatar = (username) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${username || 'anonymous'}`;

// Initial state structure
const INITIAL_USER_STATE = {
  username: '',
  fullName: '',
  email: '',
  avatar: '',
  bio: '',
  title: '',
  followersCount: 0,
  followingCount: 0,
  socialLinks: {
    twitter: '',
    github: '',
    portfolio: ''
  }
};

const INITIAL_EDIT_STATE = {
  firstname: '',
  lastname: '',
  bio: '',
  title: '',
  socialLinks: {
    twitter: '',
    github: '',
    portfolio: ''
  }
};

const ProfileSectionComponent = () => {
  // State Management
  const [userData, setUserData] = useState(INITIAL_USER_STATE);
  const [editFormData, setEditFormData] = useState(INITIAL_EDIT_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch User Profile
  const fetchUserProfile = useCallback(async () => {
    const uid = localStorage.getItem('POST.dev@accessToken');



    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://post-dev.onrender.com/api/users/${uid}/profile`,
        {
          headers: { Authorization: uid },
        }
      );

      const profileData = response.data.data;


      setUserData({
        username: profileData.username || '',
        fullName: `${profileData.firstname || ''} ${profileData.lastname || ''}`.trim(),
        email: profileData.email || '',
        avatar: profileData.avatar || generateAvatar(profileData.username),
        bio: profileData.bio || '',
        title: profileData.title || '',
        followersCount: profileData.followers_count || 0,
        followingCount: profileData.following_count || 0,
        socialLinks: {
          twitter: profileData.socialLinks?.twitter || '',
          github: profileData.socialLinks?.github || '',
          portfolio: profileData.socialLinks?.portfolio || ''
        }
      });

      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(error.response?.data?.message || 'Failed to load profile');
      toast.error('Could not fetch profile details');
    }
  }, []);

  // Open Edit Modal
  const handleEditModalOpen = () => {
    setEditFormData({
      firstname: userData.fullName.split(' ')[0] || '',
      lastname: userData.fullName.split(' ')[1] || '',
      bio: userData.bio || '',
      title: userData.title || ''
    });
    setIsEditModalOpen(true);
  };

  // Handle Form Changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('socialLinks.')) {
      const linkType = name.split('.')[1];
      setEditFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [linkType]: value
        }
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Submit Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem('POST.dev@accessToken');

    try {
      await axios.put(
        `https://post-dev.onrender.com/api/users/${uid}/profile/update`,
        {
          firstname: editFormData.firstname,
          lastname: editFormData.lastname,
          bio: editFormData.bio,
          title: editFormData.title,
        },
        { headers: { Authorization: uid } }
      );

      // Update local state
      setUserData(prev => ({
        ...prev,
        fullName: `${editFormData.firstname} ${editFormData.lastname}`,
        bio: editFormData.bio,
        title: editFormData.title,
        socialLinks: editFormData.socialLinks
      }));

      toast.success('Profile updated successfully');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Render Loading State
  if (isLoading) return (
    <div className="min-h-screen bg-[#18181E] flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading Profile...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#18181E] text-gray-100 flex justify-center py-12  w-full">
      <div className="container  w-full px-4">
        <div className="bg-[#1f1f28] w-full border-gray-700 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
          <div className="relative">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#282834]/70 to-[#1f1f28]/90 opacity-90 pointer-events-none"></div>

            {/* Profile Content */}
            <div className="p-6 md:p-10 relative z-10 text-center">
              {/* Profile Header with Image and Basic Info */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <img
                      src={userData.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg'}
                      alt={`Profile of ${userData?.fullName || 'User'}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/default-avatar.png' }}
                    />
                  </div>
                  {/* Verified Badge */}
                  {userData?.isVerified && (
                    <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976c.418-.491.672-1.102.723-1.745a3.066 3.066 0 012.812-2.812z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    {userData?.fullName || 'User Name Not Set'}
                  </h1>
                  <p className="text-gray-400 text-sm md:text-base">
                    {userData?.username ? `@${userData.username}` : 'Username Not Available'}
                  </p>
                </div>
              </div>

              {userData?.title && (
                <div className="bg-[#282834] rounded-xl p-3 flex items-center justify-center gap-3  mb-6 w-fit mx-auto">
                  <span className="text-gray-300 truncate text-center">{userData.title}</span>
                </div>
              )}

              {/* Bio and Edit Profile */}
              <div className="mb-6 space-y-4">
                {userData?.bio && (
                  <p className="text-gray-300 text-base max-w-xl mx-auto mb-4">
                    {userData.bio}
                  </p>
                )}

              </div>

              {/* Stats and Contact */}
              <div className="grid grid-cols-3 gap-4 mb-6 bg-[#282834] rounded-2xl p-4 shadow-inner">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Users size={18} className="text-gray-400" />
                    <span className="font-semibold text-white">{userData?.followersCount || 0}</span>
                  </div>
                  <span className="text-gray-500 text-sm">Followers</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="font-semibold text-white">{userData?.followingCount || 0}</span>
                  </div>
                  <span className="text-gray-500 text-sm">Following</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span className="font-semibold text-white">{userData?.postsCount || 0}</span>
                  </div>
                  <span className="text-gray-500 text-sm">Posts</span>
                </div>
              </div>

              {/* Contact and Social Links */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  {userData?.email && (
                    <div className="bg-[#282834] rounded-xl p-3 flex items-center gap-3 shadow-md w-full">
                      <Mail size={18} className="text-gray-400" />
                      <span className="text-gray-300 truncate">{userData.email}</span>
                    </div>
                  )}

                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-6 mt-4">
                  {userData?.socialLinks?.twitter && (
                    <a
                      href={userData.socialLinks.twitter.startsWith('http')
                        ? userData.socialLinks.twitter
                        : `https://twitter.com/${userData.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter size={24} />
                    </a>
                  )}
                  {userData?.socialLinks?.github && (
                    <a
                      href={userData.socialLinks.github.startsWith('http')
                        ? userData.socialLinks.github
                        : `https://github.com/${userData.socialLinks.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={24} />
                    </a>
                  )}
                  {userData?.socialLinks?.portfolio && (
                    <a
                      href={userData.socialLinks.portfolio.startsWith('http')
                        ? userData.socialLinks.portfolio
                        : `https://${userData.socialLinks.portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <LinkIcon size={24} />
                    </a>
                  )}

                  <div className='w-full'>
                  <button
                    onClick={handleEditModalOpen}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full text-base hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#22222C] rounded-xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-white mb-6">Edit Profile</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={editFormData.firstname}
                    onChange={handleFormChange}
                    className="w-full bg-[#18181E] text-gray-100 border border-gray-700 rounded-md px-3 py-2"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={editFormData.lastname}
                    onChange={handleFormChange}
                    className="w-full bg-[#18181E] text-gray-100 border border-gray-700 rounded-md px-3 py-2"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={editFormData.bio}
                    onChange={handleFormChange}
                    className="w-full bg-[#18181E] text-gray-100 border border-gray-700 rounded-md px-3 py-2 min-h-[100px]"
                    placeholder="Tell us about yourself"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleFormChange}
                    className="w-full bg-[#18181E] text-gray-100 border border-gray-700 rounded-md px-3 py-2"
                    placeholder="Your professional title"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSectionComponent;
