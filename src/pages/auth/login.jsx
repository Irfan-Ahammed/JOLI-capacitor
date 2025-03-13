import CommonForm from "@/components/common/form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin({ openSignUp,setOpen }) {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/jobs");
        setOpen(false)
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <DialogContent className="border-slate-700">
      <DialogHeader>
        <DialogTitle className="mb-2 flex justify-center">
          Sign in to your account
        </DialogTitle>

        <DialogDescription className="flex justify-center">
          Don't have an account
          <p
            className="font-medium ml-2 text-primary hover:underline"
            onClick={openSignUp}
          >
            Register
          </p>
        </DialogDescription>
      </DialogHeader>

      <CommonForm
        loading={loading}
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </DialogContent>
  );
}

export default AuthLogin;
