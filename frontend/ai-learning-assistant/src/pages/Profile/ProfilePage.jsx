import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import progressService from '../../services/progressService';
import {
  User,
  FileText,
  BookOpen,
  BrainCircuit,
  Flame,
  Edit,
  Lock
} from 'lucide-react';

import Spinner from '../../components/common/Spinner';
import authService from '../../services/authService';

const ProfilePage = () => {

  const [dashboardData, setDashboardData] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profileImage: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {

    const fetchProfile = async () => {
      
      try {

        const dashboard =
        await progressService.getDashboardData();

      setDashboardData(dashboard.data);


        const response =
          await authService.getProfile();

        const user =
          response?.data || response;

        setProfile({
          username: user.username || '',
          email: user.email || '',
          profileImage: user.profileImage || ''
        });

      } catch (error) {

        toast.error('Failed to load profile');

      } finally {

        setLoading(false);

      }
    };

    fetchProfile();

  }, []);

  const handleProfileUpdate = async (e) => {

    e.preventDefault();

    try {

      setSavingProfile(true);

      await authService.updateProfile({
        username: profile.username,
        email: profile.email
      });

      toast.success('Profile updated');

    } catch (error) {

      toast.error(
        error?.message ||
        'Failed to update profile'
      );

    } finally {

      setSavingProfile(false);

    }
  };

  const handlePasswordChange = async (e) => {

    e.preventDefault();

    try {

      setChangingPassword(true);

      await authService.changePassword(
        passwordData
      );

      toast.success('Password changed');

      setPasswordData({
        currentPassword: '',
        newPassword: ''
      });

    } catch (error) {

      toast.error(
        error?.message ||
        'Failed to change password'
      );

    } finally {

      setChangingPassword(false);

    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account settings
        </p>

      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-4xl font-bold">

            {profile.username?.charAt(0)?.toUpperCase()}

          </div>

          <div className="flex-1 text-center md:text-left">

            <h2 className="text-3xl font-bold">
              {profile.username}
            </h2>

            <p className="text-gray-500 mt-1">
              {profile.email}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm">
              <User size={14} />
              Learning Assistant Member
            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-5 py-3 bg-emerald-500 text-white rounded-xl flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Profile
            </button>

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-5 py-3 border rounded-xl flex items-center gap-2"
            >
              <Lock size={16} />
              Password
            </button>

          </div>

        </div>

      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Documents
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                {dashboardData?.overview?.totalDocuments || 0}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

              <FileText
                className="text-sky-600"
                size={24}
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Flashcards
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                {dashboardData?.overview?.totalFlashcards || 0}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">

              <BookOpen
                className="text-pink-600"
                size={24}
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Quizzes
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                {dashboardData?.overview?.totalQuizzes || 0}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

              <BrainCircuit
                className="text-emerald-600"
                size={24}
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Study Streak
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                {dashboardData?.overview?.studyStreak || 0}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">

              <Flame
                className="text-orange-600"
                size={24}
              />

            </div>

          </div>

        </div>

      </div>
      {/* Account Information */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Account Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="p-4 rounded-2xl bg-gray-50">

            <p className="text-sm text-gray-500 mb-2">
              Username
            </p>

            <p className="font-semibold text-lg text-gray-900">
              {profile.username}
            </p>

          </div>

          <div className="p-4 rounded-2xl bg-gray-50">

            <p className="text-sm text-gray-500 mb-2">
              Email Address
            </p>

            <p className="font-semibold text-lg text-gray-900">
              {profile.email}
            </p>

          </div>

          <div className="p-4 rounded-2xl bg-gray-50">

            <p className="text-sm text-gray-500 mb-2">
              Account Type
            </p>

            <p className="font-semibold text-lg text-emerald-600">
              Student Account
            </p>

          </div>

          <div className="p-4 rounded-2xl bg-gray-50">

            <p className="text-sm text-gray-500 mb-2">
              Learning Status
            </p>

            <p className="font-semibold text-lg text-sky-600">
              Active Learner
            </p>

          </div>

        </div>

      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h3>

        <div className="space-y-4">

          {dashboardData?.recentActivity?.documents?.length > 0 ? (

            dashboardData.recentActivity.documents.map((doc, index) => (

              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50"
              >

                <div>

                  <p className="font-medium text-gray-900">
                    {doc.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Recently accessed document
                  </p>

                </div>

                <FileText
                  className="text-sky-500"
                  size={20}
                />

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              No recent activity available.
            </p>

          )}

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-gray-900">
                Edit Profile
              </h2>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={(e) => {
                handleProfileUpdate(e);
                setIsEditModalOpen(false);
              }}
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile(prev => ({
                      ...prev,
                      username: e.target.value
                    }))
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile(prev => ({
                      ...prev,
                      email: e.target.value
                    }))
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all"
                >
                  {savingProfile
                    ? 'Saving...'
                    : 'Save Changes'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}
      {/* Change Password Modal */}
{isPasswordModalOpen && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

    <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Change Password
        </h2>

        <button
          onClick={() => {
            setIsPasswordModalOpen(false);
            setConfirmPassword('');
          }}
          className="text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

      </div>

      <form
        onSubmit={(e) => {

          e.preventDefault();

          if (
            passwordData.newPassword !==
            confirmPassword
          ) {

            toast.error(
              'Passwords do not match'
            );

            return;
          }

          handlePasswordChange(e);

          setIsPasswordModalOpen(false);

          setConfirmPassword('');
        }}
        className="space-y-5"
      >

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>

          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData(prev => ({
                ...prev,
                currentPassword: e.target.value
              }))
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>

          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData(prev => ({
                ...prev,
                newPassword: e.target.value
              }))
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

        </div>

        <div className="flex justify-end gap-3 pt-2">

          <button
            type="button"
            onClick={() => {
              setIsPasswordModalOpen(false);
              setConfirmPassword('');
            }}
            className="px-5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={changingPassword}
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all"
          >
            {changingPassword
              ? 'Updating...'
              : 'Update Password'}
          </button>

        </div>

      </form>

    </div>

  </div>

)}

    </div>
  );

};

export default ProfilePage;