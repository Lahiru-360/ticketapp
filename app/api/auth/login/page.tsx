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
  const [username, setUsername] = useState("");
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

    const result = await signIn("password", {
      username,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setIsLoading(false);
    } else if (result?.ok) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ticket Manager
          </h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Card */}
        <Card className="bg-card border border-border shadow-2xl">
          <div className="p-8">
            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 bg-destructive/10 border-destructive">
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="john_doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Access */}
            <div className="mt-6 rounded-lg border border-border bg-secondary/60 p-4">
              <p className="text-sm font-medium text-foreground mb-3">
                Demo Access (For Reviewers)
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Click to auto-fill credentials
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Admin Account
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setUsername("admin");
                    setPassword("admin@123");
                  }}
                  className="text-sm font-medium text-primary hover:opacity-80 transition"
                >
                  Use
                </button>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Tech Account
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setUsername("tech@1");
                    setPassword("tech@123");
                  }}
                  className="text-sm font-medium text-primary hover:opacity-80 transition"
                >
                  Use
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  User Account
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setUsername("user@1");
                    setPassword("user@123");
                  }}
                  className="text-sm font-medium text-primary hover:opacity-80 transition"
                >
                  Use
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
