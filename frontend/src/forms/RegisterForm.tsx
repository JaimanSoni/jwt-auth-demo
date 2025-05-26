import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Shield, User } from "lucide-react";
import {
  dismissToast,
  showError,
  showLoading,
  showSuccess,
} from "@/utils/toasterUtils";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "@/api/axiosInstance";

type RegisterFormData = {
  first_name: string;
  last_name: string;
  email: string;
  confirm_password: string;
  password: string;
};

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const toastId = showLoading("Loading");
    if (data.confirm_password !== data.password) {
      dismissToast(toastId);
      showError("Both passwords should match");
      return;
    }
    const dataToSend = {
      name: data.first_name + " " + data.last_name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("/auth/register", dataToSend, {
        withCredentials: true,
      });

      console.log("Account created successfully:", res.data);
      dismissToast(toastId);
      showSuccess("Account created successfully");
      navigate("/dashboard");
    } catch (err) {
      dismissToast(toastId);

      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || error.message;

      console.error("Account creation failed:", errorMessage);
      showError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">JWT Auth Starter</h1>
          <p className="text-gray-600">
            {" "}
            Production-ready boilerplate for JWT-based authentication system.
          </p>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="text-2xl font-semibold text-center">
                Create account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      {...register("first_name")}
                      placeholder="John"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    {...register("last_name")}
                    placeholder="Doe"
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john.doe@company.com"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    {...register("confirm_password")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
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

              <Button className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Create your account
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/"
                  className="text-green-600 hover:text-green-500 font-medium"
                >
                  Login
                </a>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
