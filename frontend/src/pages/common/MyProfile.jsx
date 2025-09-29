import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, User as UserIcon, Shield } from "lucide-react";
import { useGetProfileMutation } from "../hooks/useGetProfile";

export default function MyProfile() {
  const { getProfileMutation, isGettingProfile, isSuccess, data } =
    useGetProfileMutation();

  useEffect(() => {
    getProfileMutation();
  }, [getProfileMutation]);

  const user = data?.user;

  const roleColors = {
    Employee: "from-green-500 to-green-600",
    Manager: "from-blue-500 to-blue-600",
    Admin: "from-purple-500 to-purple-700",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl"
      >
        <h2 className="mb-10 text-center text-4xl font-extrabold text-gray-900 drop-shadow-sm">
          My Profile
        </h2>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition duration-300 hover:shadow-2xl">
          {isGettingProfile && (
            <p className="text-center text-gray-500">Loading profile...</p>
          )}

          {isSuccess && user ? (
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-3xl font-bold text-white shadow-md">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {user.name}
                </h3>
                <span
                  className={`rounded-full bg-gradient-to-r px-4 py-1 text-sm font-medium text-white ${
                    roleColors[user.role] || "from-gray-500 to-gray-600"
                  } shadow-sm`}
                >
                  {user.role}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 shadow-sm transition hover:shadow-md">
                  <UserIcon className="h-6 w-6 text-indigo-500" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      Full Name
                    </span>
                    <p className="text-lg font-medium text-gray-900">
                      {user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 shadow-sm transition hover:shadow-md">
                  <Mail className="h-6 w-6 text-pink-500" />
                  <div>
                    <span className="block text-sm text-gray-500">Email</span>
                    <p className="text-lg font-medium text-gray-900">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 shadow-sm transition hover:shadow-md">
                  <Phone className="h-6 w-6 text-green-500" />
                  <div>
                    <span className="block text-sm text-gray-500">Phone</span>
                    <p className="text-lg font-medium text-gray-900">
                      {user.number || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 shadow-sm transition hover:shadow-md">
                  <Shield className="h-6 w-6 text-blue-500" />
                  <div>
                    <span className="block text-sm text-gray-500">Role</span>
                    <p className="text-lg font-medium text-gray-900">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            !isGettingProfile && (
              <p className="text-center font-medium text-red-500">
                Failed to load profile or no data.
              </p>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
