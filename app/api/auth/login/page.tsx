// app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else if (result?.ok) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ticket Manager</h1>
          <p className="text-slate-300">Sign in to your account</p>
        </div>

        {/* Card */}
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <div className="p-8">
            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 bg-red-900/20 border-red-500/50">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <p className="text-xs font-semibold text-slate-300 mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-slate-400 mb-1">
                Email:{" "}
                <span className="text-slate-200 font-mono">
                  demo@example.com
                </span>
              </p>
              <p className="text-xs text-slate-400">
                Password:{" "}
                <span className="text-slate-200 font-mono">password123</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          © 2025 Ticket Manager. All rights reserved.
        </p>
      </div>
    </div>
  );
}
