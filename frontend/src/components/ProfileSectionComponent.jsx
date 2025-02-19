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
        `http://localhost:8080/api/users/${uid}/profile`,
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
        `http://localhost:8080/api/users/${uid}/profile/update`, 
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
    <div className="min-h-screen bg-[#18181E] text-gray-100 flex justify-center py-12">
      <div className="container max-w-md w-full px-4">
        <div className="bg-[#22222C] border border-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 text-center relative">
            {/* Profile Image */}
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-4 relative group">
                <img 
                  src={userData.avatar}
                  alt={`Profile of ${userData.fullName}`}
                  className="w-full h-full rounded-full object-cover border-2 border-gray-700"
                />
              </div>

              {/* Profile Header */}
              <div>
                <h1 className="text-2xl font-semibold text-white mb-1">
                  {userData.fullName || 'User Name Not Set'}
                </h1>
                <p className="text-gray-400 text-sm">
                  {userData.username ? `@${userData.username}` : 'Username Not Available'}
                </p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mb-6">
              <button 
                onClick={handleEditModalOpen}
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto gap-2"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            </div>

            {/* Bio Section */}
            {userData.bio && (
              <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">
                {userData.bio}
              </p>
            )}

            {/* Stats */}
            <div className="flex justify-center gap-6 mb-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Users size={16} className="text-gray-500" />
                <span className="font-medium">{userData.followersCount}</span>
                <span className="text-gray-500">followers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="font-medium">{userData.followingCount}</span>
                <span className="text-gray-500">following</span>
              </div>
            </div>

            {/* Contact and Social Section */}
            <div className="border-t border-gray-800 pt-6">
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="text-sm space-y-2">
                  {userData.email && (
                    <div className="text-gray-300 flex items-center justify-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <span>{userData.email}</span>
                    </div>
                  )}
                  {userData.title && (
                    <div className="text-gray-300 flex items-center justify-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span>{userData.title}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {userData.socialLinks.twitter && (
                    <a 
                      href={userData.socialLinks.twitter.startsWith('http') 
                        ? userData.socialLinks.twitter 
                        : `https://twitter.com/${userData.socialLinks.twitter}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {userData.socialLinks.github && (
                    <a 
                      href={userData.socialLinks.github.startsWith('http') 
                        ? userData.socialLinks.github 
                        : `https://github.com/${userData.socialLinks.github}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {userData.socialLinks.portfolio && (
                    <a 
                      href={userData.socialLinks.portfolio.startsWith('http') 
                        ? userData.socialLinks.portfolio 
                        : `https://${userData.socialLinks.portfolio}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <LinkIcon size={20} />
                    </a>
                  )}
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