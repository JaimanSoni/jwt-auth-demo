import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  BookOpen,
  Code,
  Lock,
  Key,
  Users,
  Settings,
  Github,
  ExternalLink,
  Copy,
  CheckCircle,
  ArrowRight,
  Download,
  Zap,
  Globe,
} from "lucide-react";

export function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg">
                <Shield className=" h-4 sm:h-6 w-4 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className=" text-lg sm:text-xl font-bold text-gray-900">
                  JWT Auth Starter
                </h1>
                <p className=" text-xs sm:text-sm text-gray-600">
                  Documentation
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-y-2 sm:space-x-3">
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard">
                  <ArrowRight className="h-3 sm:h-4 w-3 sm:w-4 sm:mr-2" />
                  Dashboard
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/">
                  <ArrowRight className="h-4  w-4 sm:mr-2" />
                  Sign In
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
            <BookOpen className=" h-12 sm:h-16 w-12 sm:w-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              Documentation
            </h2>
            <p className="text-indigo-100 text-sm sm:text-lg max-w-3xl mx-auto">
              Complete guide to implementing and customizing the JWT
              Authentication Starter. Learn how to integrate secure
              authentication into your applications.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get up and running in minutes
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Code className="h-5 w-5 mr-2 text-blue-600" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Complete API documentation
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Settings className="h-5 w-5 mr-2 text-gray-600" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Environment setup guide</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Globe className="h-5 w-5 mr-2 text-green-600" />
                Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Production deployment guide
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <a
                    href="#getting-started"
                    className="block text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Getting Started
                  </a>
                  <a
                    href="#installation"
                    className="block text-sm text-gray-600 hover:text-gray-800 pl-3"
                  >
                    Installation and Configuration
                  </a>
                </div>
                <div className="space-y-1">
                  <a
                    href="#authentication"
                    className="block text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Authentication
                  </a>
                  <a
                    href="#jwt-tokens"
                    className="block text-sm text-gray-600 hover:text-gray-800 pl-3"
                  >
                    JWT Tokens
                  </a>
                  <a
                    href="#password-reset"
                    className="block text-sm text-gray-600 hover:text-gray-800 pl-3"
                  >
                    Password Reset
                  </a>
                </div>
                <div className="space-y-1">
                  <a
                    href="#api-reference"
                    className="block text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    API Reference
                  </a>
                  <a
                    href="#endpoints"
                    className="block text-sm text-gray-600 hover:text-gray-800 pl-3"
                  >
                    Endpoints
                  </a>
                  <a
                    href="#examples"
                    className="block text-sm text-gray-600 hover:text-gray-800 pl-3"
                  >
                    Examples
                  </a>
                </div>
                <div className="space-y-1">
                  <a
                    href="#production"
                    className="block text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Production
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8 min-w-[220px]">
            {/* Getting Started */}
            <section id="getting-started" className="w-full">
              <Card className="">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Zap className="h-6 w-6 mr-3 text-yellow-600" />
                    Getting Started
                  </CardTitle>
                  <CardDescription>
                    Follow these steps to set up the JWT Authentication Starter
                    on your local machine
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div id="installation">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Download className="h-5 w-5 mr-2 text-blue-600" />
                      Installation and Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          1. Clone the repository
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <code className="text-green-400 text-sm font-mono flex overflow-scroll">
                            git clone
                            https://github.com/JaimanSoni/jwt-auth-starter.git
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-400 "
                            onClick={() =>
                              copyToClipboard(
                                "git clone https://github.com/JaimanSoni/jwt-auth-starter.git",
                                "clone"
                              )
                            }
                          >
                            {copiedCode === "clone" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          2. Navigate to backend project directory and install
                          dependencies
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <code className="text-green-400 text-sm font-mono  overflow-scroll">
                            cd backend
                            <br />
                            npm install
                            <br />
                            cp .env.sample .env
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-400 "
                            onClick={() =>
                              copyToClipboard(
                                "cd backend \n npm install \n cp .env.sample .env",
                                "cd"
                              )
                            }
                          >
                            {copiedCode === "cd" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          3. Navigate to frontend project directory and install
                          dependencies
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <code className="text-green-400 text-sm font-mono  overflow-scroll">
                            cd frontend
                            <br />
                            npm install
                            <br />
                            cp .env.sample .env
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-400 "
                            onClick={() =>
                              copyToClipboard(
                                "cd frontend \n npm install \n cp .env.sample .env",
                                "cd"
                              )
                            }
                          >
                            {copiedCode === "cd" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Authentication */}
            <section id="authentication">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Lock className="h-6 w-6 mr-3 text-green-600" />
                    Authentication
                  </CardTitle>
                  <CardDescription>
                    Understanding the JWT authentication flow and implementation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div id="jwt-tokens">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Key className="h-5 w-5 mr-2 text-blue-600" />
                      JWT Tokens
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        This application uses JSON Web Tokens (JWT) for secure
                        authentication. Here's how it works:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Access Token
                          </h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Short-lived (15 minutes)</li>
                            <li>• Used for API requests</li>
                            <li>• Stored in memory</li>
                            <li>• Contains user permissions</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-medium text-green-900 mb-2">
                            Refresh Token
                          </h4>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Long-lived (7 days)</li>
                            <li>• Used to get new access tokens</li>
                            <li>• Stored in httpOnly cookie</li>
                            <li>• Can be revoked</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div id="password-reset">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-purple-600" />
                      Password Reset Flow
                    </h3>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        {[
                          {
                            step: "1",
                            title: "Request Reset",
                            description:
                              "User enters email on forgot password page",
                            color: "blue",
                          },
                          {
                            step: "2",
                            title: "Generate Token",
                            description:
                              "Server creates secure reset token with expiration",
                            color: "green",
                          },
                          {
                            step: "3",
                            title: "Send Email",
                            description:
                              "Reset link sent to user's email address",
                            color: "orange",
                          },
                          {
                            step: "4",
                            title: "Reset Password",
                            description:
                              "User clicks link and sets new password",
                            color: "purple",
                          },
                        ].map((item) => (
                          <div
                            key={item.step}
                            className="flex items-start space-x-3"
                          >
                            <div
                              className={`bg-${item.color}-100 text-${item.color}-600 rounded-full p-2 text-sm font-bold min-w-[32px] h-8 flex items-center justify-center`}
                            >
                              {item.step}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api-reference">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Code className="h-6 w-6 mr-3 text-blue-600" />
                    API Reference
                  </CardTitle>
                  <CardDescription>
                    Complete reference for all authentication endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div id="endpoints">
                    <h3 className="text-lg font-semibold mb-4">
                      Authentication Endpoints
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          method: "POST",
                          endpoint: "/v1/auth/register",
                          description: "Register a new user account",
                          color: "green",
                        },
                        {
                          method: "POST",
                          endpoint: "/v1/auth/login",
                          description: "Authenticate user and return tokens",
                          color: "blue",
                        },
                        {
                          method: "GET",
                          endpoint: "/v1/auth/refresh-token",
                          description:
                            "Refresh access token using refresh token",
                          color: "purple",
                        },
                        {
                          method: "POST",
                          endpoint: "/v1/auth/logout",
                          description: "Logout user and invalidate tokens",
                          color: "red",
                        },
                        {
                          method: "POST",
                          endpoint: "/v1/auth/forgot-password",
                          description: "Request password reset email",
                          color: "orange",
                        },
                        {
                          method: "POST",
                          endpoint: "/v1/auth/reset-password",
                          description: "Reset password with token",
                          color: "indigo",
                        },
                      ].map((api, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Badge
                                variant="secondary"
                                className={`bg-${api.color}-100 text-${api.color}-700 font-mono`}
                              >
                                {api.method}
                              </Badge>
                              <code className="font-mono text-sm">
                                {api.endpoint}
                              </code>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {api.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div id="examples">
                    <h3 className="text-lg font-semibold mb-3">
                      Request Examples
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">User Registration</h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <pre className="text-green-400 text-sm font-mono overflow-scroll">
                            {`POST /api/auth/register
Content-Type: application/json

{
  "name": "Jaiman Soni",
  "email": "john.doe@company.com",
  "password": "SecurePassword123!",
}`}
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-400 "
                            onClick={() =>
                              copyToClipboard(
                                `POST /api/auth/register
Content-Type: application/json

{
  "name": "Jaiman Soni",
  "email": "john.doe@company.com",
  "password": "SecurePassword123!",
}`,
                                "register"
                              )
                            }
                          >
                            {copiedCode === "register" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">User Login</h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <pre className="text-green-400 text-sm font-mono  overflow-scroll">
                            {`POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@company.com",
  "password": "SecurePassword123!"
}`}
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-400 "
                            onClick={() =>
                              copyToClipboard(
                                `POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@company.com",
  "password": "SecurePassword123!"
}`,
                                "login"
                              )
                            }
                          >
                            {copiedCode === "login" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Deployment */}
            <section id="deployment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Globe className="h-6 w-6 mr-3 text-green-600" />
                    Production Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div id="production">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Security</h4>
                        <div className="space-y-2">
                          {[
                            "Use strong JWT secrets",
                            "Enable HTTPS/SSL",
                            "Set secure cookie flags",
                            "Configure CORS properly",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-600">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">
                          Performance
                        </h4>
                        <div className="space-y-2">
                          {[
                            "Use production database",
                            "Enable rate limiting",
                            "Set up monitoring",
                            "Configure load balancing",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-600">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Support & Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-12 justify-start"
                    asChild
                  >
                    <a href="https://github.com/JaimanSoni/jwt-auth-starter">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub Repository
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 justify-start"
                    asChild
                  >
                    <a href="https://github.com/JaimanSoni/jwt-auth-starter">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Report Issues
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
