import { useEffect, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "@/utils/toasterUtils";
import type { AxiosError } from "axios";
type LoginData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/auth/refresh-token", { withCredentials: true });
        navigate("/dashboard");
      } catch {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    const toastId = showLoading("Loading");
    try {
      const res = await axios.post("/auth/login", data, {
        withCredentials: true,
      });

      console.log("Logged in successfully:", res.data);
      dismissToast(toastId);
      showSuccess("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      dismissToast(toastId);

      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || error.message;

      console.error("Login failed:", errorMessage);
      showError(errorMessage);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center h-fit w-fit bg-white">
        <div className="animate-spin w-[50px] h-[50px] border-2 border-black border-t-transparent rounded-full "></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">JWT Auth Starter</h1>
          <p className="text-gray-600">
            Production-ready boilerplate for JWT-based authentication system.
          </p>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="jaimansoni@gmail.com"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative ">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Sign in to your account
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
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Create account
                </a>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
