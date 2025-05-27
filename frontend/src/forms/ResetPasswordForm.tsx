import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield, CheckCircle } from "lucide-react";
import {
  dismissToast,
  showError,
  showLoading,
  showSuccess,
} from "@/utils/toasterUtils";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import axios from "@/api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

type ResetPasswordData = {
  password: string;
  confirm_password: string;
};

export function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm<ResetPasswordData>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: ResetPasswordData) => {
    const toastId = showLoading("Loading");
    if (data.confirm_password !== data.password) {
      dismissToast(toastId);
      showError("Both passwords should match");
      return;
    }
    const dataToSend = {
      password: data.password,
    };
    try {
      const res = await axios.post(
        `/auth/reset-password/${token}`,
        dataToSend,
        {
          withCredentials: true,
        }
      );

      console.log("Password Updated", res.data);
      dismissToast(toastId);
      showSuccess("Passord Updated");
      navigate("/login");
    } catch (err) {
      dismissToast(toastId);

      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || error.message;

      console.error("Failed to reset password:", errorMessage);
      showError(errorMessage);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">JWT Auth Starter</h1>
          <p className="text-gray-600">Reset your password</p>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">
                Set new password
              </CardTitle>
              <CardDescription className="text-center">
                Choose a strong password for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="pr-10 h-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    {...register("confirm_password")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="pr-10 h-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Password requirements:
                </p>
                <div className="space-y-1">
                  {[
                    "At least 8 characters long",
                    "Contains uppercase and lowercase letters",
                    "Contains at least one number",
                    "Contains at least one special character",
                  ].map((requirement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                Update password
              </Button>

              <div className="text-center">
                <a
                  href="/"
                  className="text-sm text-purple-600 hover:text-purple-500 font-medium"
                >
                  Back to sign in
                </a>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
