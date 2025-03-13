import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppliedJobTable from "@/components/jobs/AppliedJobTable";
import CreatedJobTable from "@/components/jobs/CreatedJobTable";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import CreateJob from "@/components/jobs/CreateJob";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <div className="my-8 max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User Profile Section */}
      <div className="border w-full grid grid-cols-1 place-items-center border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-blue-400 to-blue-700 shadow-lg text-white">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-28 w-28 shadow-lg">
            <AvatarImage
              src={user?.dpImage || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="rounded-full object-cover"
            />
            <AvatarFallback className="text-lg bg-white text-gray-800 font-bold">
              {user?.fullname?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h1 className="font-semibold text-2xl mt-4">{user?.fullname || "Full Name"}</h1>
          <p className="text-sm opacity-80">{user?.profile?.bio || "Bio not provided"}</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                Create a Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-lg">
              <CreateJob />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-lg">
              <UpdateProfileDialog />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-6 space-y-3 text-center">
          <p><span className="font-medium">📧 Email:</span> {user?.email || "Not Provided"}</p>
          <p><span className="font-medium">📞 Contact:</span> {user?.phoneNumber || "Not Provided"}</p>
          <p><span className="font-medium">📍 Location:</span> {user?.profile?.location || "Not Provided"}</p>
        </div>
      </div>

      {/* Jobs Sections */}
      <div className="lg:col-span-2 space-y-6">
        <div className="border border-gray-200 rounded-2xl p-3 sm:p-6 bg-white shadow-lg">
          <h1 className="text-xl font-medium font-poppins mb-4 text-gray-800">Applied Jobs</h1>
          <AppliedJobTable/>
        </div>
        
        <div className="border border-gray-200 rounded-2xl p-3 sm:p-6 bg-white shadow-lg">
          <h1 className="text-xl font-medium mb-4 text-gray-800 font-poppins">Created Jobs</h1>
          <CreatedJobTable/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
