import { useEffect } from "react";
import { useGetProfileMutation } from "../hooks/useGetProfile";

export default function MyProfile() {
  const { getProfileMutation, isGettingProfile, isSuccess, data } =
    useGetProfileMutation();

  useEffect(() => {
    getProfileMutation();
  }, [getProfileMutation]);

  const user = data?.user;

  return (
    <div className="mx-auto mt-6 max-w-3xl rounded-md bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">My Profile</h2>

      {isGettingProfile && <p>Loading...</p>}

      {isSuccess && user ? (
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Phone:</span> {user.number}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
        </div>
      ) : !isGettingProfile ? (
        <p className="text-red-500">Failed to load profile or no data.</p>
      ) : null}
    </div>
  );
}
