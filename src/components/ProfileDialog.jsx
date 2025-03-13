import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { logOut } from "@/redux/authSlice";
import AuthDialog from "./AuthDialog";

function ProfileDialog() {
  const user = useSelector((state) => state.auth.user); // Get logged-in user info
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      {user ? (
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                className="object-cover"
                src={user.dpImage}
                alt="User Avatar"
              />
              <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="max-w-md p-6 rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-joli-primary">
                Joli Profile
              </h1>
            </div>

            {/* User Information */}
            <div className="flex items-center mb-4">
              <Avatar
                onClick={() => navigate("/profile")}
                className="w-16 h-16"
              >
                <AvatarImage
                  className="object-cover"
                  src={user.dpImage || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                />
                <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
              </Avatar>
              <div onClick={() => navigate("/profile")} className="ml-4">
                <h3 className="font-semibold text-lg">{user.fullname}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto text-red-600 border border-red-600 rounded-md px-4 py-2 hover:bg-red-50"
              >
                Log out
              </button>
            </div>

            {/* Profile Options */}
            <div className="space-y-4">
              <div
                className="flex items-center p-3 rounded-lg bg-joli-light hover:bg-joli-secondary cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <User size={20} className="text-joli-primary" />
                <p className="ml-4 text-sm font-medium text-joli-primary">
                  View Profile
                </p>
              </div>

              {/* Chats */}
              <div className="flex items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                <span className="mr-4 text-joli-primary">💬</span>
                <p className="text-sm text-gray-600">
                  <strong>Chats:</strong> Download the Joli app to connect with
                  employers.
                </p>
              </div>

              {/* Applications */}
              <div className="flex items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                <span className="mr-4 text-joli-primary">✅</span>
                <p className="text-sm text-gray-600">
                  <strong>Applications:</strong> Track your applications on the
                  Joli app.
                </p>
              </div>

              {/* Connections */}
              <div className="flex items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                <span className="mr-4 text-joli-primary">👥</span>
                <p className="text-sm text-gray-600">
                  <strong>Connections:</strong> Build your network in the Joli
                  app.
                </p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-gray-600">
                Install the <strong>Joli App</strong> to access all features.
                Scan the QR code below to download it.
              </p>
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg">
                {/* Replace this with a real QR code */}
                <span className="text-sm text-gray-500">QR Code</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <AuthDialog />
      )}
    </div>
  );
}

export default ProfileDialog;
