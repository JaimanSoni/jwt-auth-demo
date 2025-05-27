import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Github,
  Download,
  Play,
  Users,
  Lock,
  Key,
  Terminal,
  Code,
  BookOpen,
  ExternalLink,
  LogOut,
} from "lucide-react";
import axios from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  JWT Auth Starter
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                className="cursor-pointer"
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">
                Welcome to JWT Auth Starter!
              </h2>
              <p className="text-blue-100 text-md mb-6">
                You've successfully authenticated! JWT Auth Starter is a
                production-ready boilerplate for building secure, scalable
                authentication systems using JSON Web Tokens. Ideal for
                developers seeking a solid foundation for modern auth workflows.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  JWT Tokens
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Auth
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  <Key className="h-3 w-3 mr-1" />
                  Password Reset
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Quick Start Guide
              </CardTitle>
              <CardDescription>
                Get started with this JWT authentication starter in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-sm font-bold min-w-[24px] h-6 flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Clone the Repository
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Clone the GitHub repository to get the complete source
                      code
                    </p>
                    <div className="bg-gray-100 rounded-lg p-3 mt-2 font-mono text-sm">
                      git clone
                      https://github.com/JaimanSoni/jwt-auth-starter.git
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-sm font-bold min-w-[24px] h-6 flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Install Dependencies
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Install both backend and frontend dependencies
                    </p>
                    <div className="bg-gray-100 rounded-lg p-3 mt-2 font-mono text-sm">
                      <p>cd backend</p>
                      <p>npm install</p>
                      <p>cd ..</p>
                      <p>cd frontend</p>
                      <p>npm install</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-sm font-bold min-w-[24px] h-6 flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Configure Environment
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Set up your environment variables for JWT and database
                    </p>
                    <div className="bg-gray-100 rounded-lg p-3 mt-2 font-mono text-sm">
                      <p>cd backend</p>
                      <p>cp .env.example .env</p>
                      <p>cd ..</p>
                      <p>cd frontend</p>
                      <p>cp .env.example .env</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-sm font-bold min-w-[24px] h-6 flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Start Development
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Run both backend and frontend in development mode
                    </p>
                    <div className="bg-gray-100 rounded-lg p-3 mt-2 font-mono text-sm">
                      npm run dev
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Github className="h-5 w-5 mr-2" />
                  Repository
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  className="flex "
                  href="https://github.com/JaimanSoni/jwt-auth-starter.git"
                >
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Clone Repository
                  </Button>
                </a>
                <a href="https://github.com/JaimanSoni/jwt-auth-starter">
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Terminal className="h-5 w-5 mr-2" />
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Backend</span>
                    <span className="text-sm font-medium">
                      Node.js + Express
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Frontend</span>
                    <span className="text-sm font-medium">React.js</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Auth</span>
                    <span className="text-sm font-medium">JWT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="text-sm font-medium">MongoDB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Secure Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Industry-standard JWT implementation with secure token handling,
                refresh tokens, and proper session management.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Complete user registration, login, profile management, and
                role-based access control system.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Key className="h-5 w-5 mr-2 text-purple-600" />
                Password Recovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Secure password reset flow with email verification, token
                expiration, and strong password requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Code className="h-5 w-5 mr-2 text-orange-600" />
                Clean Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Well-structured, documented code following best practices for
                maintainability and scalability.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Play className="h-5 w-5 mr-2 text-red-600" />
                Ready to Deploy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Production-ready configuration with Docker support, environment
                variables, and deployment guides.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Comprehensive documentation covering setup, API endpoints,
                authentication flows, and customization options.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* API Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Terminal className="h-5 w-5 mr-2 text-gray-700" />
              API Endpoints
            </CardTitle>
            <CardDescription>
              Key authentication endpoints available in this demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <span className="font-mono text-sm">
                      POST /v1/auth/register
                    </span>
                    <p className="text-xs text-gray-600 mt-1">
                      User registration
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    POST
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-mono text-sm">
                      POST /v1/auth/login
                    </span>
                    <p className="text-xs text-gray-600 mt-1">
                      User authentication
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    POST
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-mono text-sm">
                      GET /v1/auth/refresh-token
                    </span>
                    <p className="text-xs text-gray-600 mt-1">
                      Refresh Access Token
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    GET
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <span className="font-mono text-sm">
                      POST /v1/auth/forgot-password
                    </span>
                    <p className="text-xs text-gray-600 mt-1">
                      Password reset request
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700"
                  >
                    POST
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <span className="font-mono text-sm">
                      POST /v1/auth/reset-password
                    </span>
                    <p className="text-xs text-gray-600 mt-1">
                      Password reset confirmation
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700"
                  >
                    POST
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
