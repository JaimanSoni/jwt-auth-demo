import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, AlertTriangle, ArrowLeft, Lock } from "lucide-react";

export function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 p-3 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">JWT Auth Starter</h1>
          <p className="text-gray-600">Access Control System</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Access Denied
              </CardTitle>
              <CardDescription className="text-gray-600">
                You don't have permission to access this resource
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Lock className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">Insufficient Access</p>
                  <p className="mt-1">
                    This page requires login access that you don't currently
                    have. Please try signing in.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full h-12">
                <a href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-center space-y-2">
            <h3 className="font-medium text-gray-900">Common Solutions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check if you're signed in to the correct account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
