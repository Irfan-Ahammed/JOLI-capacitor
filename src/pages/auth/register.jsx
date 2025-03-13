import CommonForm from "@/components/common/form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { registerFormControls } from "@/config";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const initialState = {
  fullname: "",
  email: "",
  phoneNumber: "",
  password: "",
};

function AuthRegister({ openLogin }) {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const onSubmit = async (event) => {
    event.preventDefault();
    const dataForm = new FormData();
    dataForm.append("fullname", formData.fullname);
    dataForm.append("email", formData.email);
    dataForm.append("phoneNumber", formData.phoneNumber);
    dataForm.append("password", formData.password);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        {
          fullname: formData.fullname,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setFormData(initialState);
        openLogin();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(formData);

      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <DialogContent className="border-slate-700">
      <DialogHeader>
        <DialogTitle className="mb-2 flex justify-center">
          Create new account
        </DialogTitle>
        <DialogDescription className="flex justify-center">
          Already have an account
          <p
            className="font-medium ml-2 text-primary hover:underline"
            onClick={openLogin}
          >
            Login
          </p>
        </DialogDescription>
      </DialogHeader>
      <CommonForm
        loading={loading}
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </DialogContent>
  );
}

export default AuthRegister;
