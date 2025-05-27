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
import {
  dismissToast,
  showError,
  showLoading,
  showSuccess,
} from "@/utils/toasterUtils";
import type { AxiosError } from "axios";
import { ArrowLeft, Mail, Shield, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "@/api/axiosInstance";

type ForgetPasswordData = {
  email: string;
};

export function ForgotPasswordForm() {
  const { register, handleSubmit } = useForm<ForgetPasswordData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordData) => {
    const toastId = showLoading("Loading");
    try {
      const res = await axios.post("/auth/forget-password", data, {
        withCredentials: true,
      });

      console.log("Email sent:", res.data);
      dismissToast(toastId);
      showSuccess("Email Sent");
      // navigate("/dashboard");
    } catch (err) {
      dismissToast(toastId);

      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || error.message;

      console.error("Failed to send email:", errorMessage);
      showError(errorMessage);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-3 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">JWT Auth Starter</h1>
          <p className="text-gray-600">Password Recovery</p>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">
                Forgot password?
              </CardTitle>
              <CardDescription className="text-center">
                No worries! Enter your email and we'll send you a reset link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button className="w-full h-12 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
                <Send className="mr-2 h-4 w-4" />
                Send reset link
              </Button>

              <div className="text-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </a>
              </div>
            </CardContent>
          </Card>
        </form>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium">Check your email</p>
              <p className="mt-1">
                If an account with that email exists, we'll send you a password
                reset link within a few minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
