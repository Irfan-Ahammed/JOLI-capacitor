import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    location: user?.profile?.location || "",
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="grid gap-4 py-4">
        {[
          { label: "Full Name", name: "fullname" },
          { label: "Email", name: "email" },
          { label: "Phone Number", name: "phoneNumber" },
          { label: "Bio", name: "bio" },
          { label: "Location", name: "location" },
        ].map(({ label, name }) => (
          <div key={name} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={name} className="text-right">
              {label}
            </Label>
            <Input
              id={name}
              name={name}
              value={input[name]}
              onChange={changeEventHandler}
              className="col-span-3"
            />
          </div>
        ))}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="file" className="text-right">
            Profile Image
          </Label>
          <Input
            id="file"
            name="file"
            type="file"
            onChange={changeEventHandler}
            className="col-span-3"
          />
        </div>
        <Button
          disabled={
            loading ||
            !input.fullname ||
            !input.email ||
            !input.phoneNumber ||
            !input.location
          }
          type="submit"
          className="mt-6 w-full"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileDialog;
