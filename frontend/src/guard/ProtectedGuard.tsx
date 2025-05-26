import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
interface ProtectedGuardProps {
  children: React.ReactNode;
}
// import { Navigate } from "react-router-dom";
import { AccessDenied } from "@/components/accessDenied/AccessDenied";

export default function ProtectedGuard({ children }: ProtectedGuardProps) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/auth/refresh-token", { withCredentials: true });
        setAuthenticated(true);
      } catch (err) {
        console.log(err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center h-fit w-fit bg-white">
        <div className="animate-spin w-[50px] h-[50px] border-2 border-black border-t-transparent rounded-full "></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <AccessDenied />;
}
