"use client";

import * as React from "react";
import {
  HeartPulse,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
  Smartphone,
  Mail,
  KeyRound,
} from "lucide-react";
import { useNavigation } from "@/store/navigation-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function LoginPage() {
  const { navigate, setAuthenticated } = useNavigation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = "Email or PhilHealth ID is required";
    } else if (email.length < 3) {
      newErrors.email = "Please enter a valid email or PhilHealth ID";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setAuthenticated(true);
      setTimeout(() => navigate("member-portal"), 1000);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] grid lg:grid-cols-2">
      {/* Left side — form */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-ph-brand text-white shadow-sm">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Member Portal Login</h1>
              <p className="text-sm text-muted-foreground">Sign in to manage your PhilHealth account</p>
            </div>
          </div>

          {success ? (
            <Card className="p-6 border-ph-green/30 bg-ph-green-light/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ph-green text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-ph-green-darker">Login successful</div>
                  <div className="text-sm text-ph-green-darker/80">Redirecting to your dashboard...</div>
                </div>
              </div>
            </Card>
          ) : (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-5">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email or PhilHealth ID
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={cn(
                          "pl-9 h-11",
                          errors.email && "border-red-300 focus-visible:ring-red-200"
                        )}
                        placeholder="juan.delacruz@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <button
                        type="button"
                        className="text-xs text-ph-green hover:underline"
                        onClick={() => navigate("help-center")}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        className={cn(
                          "pl-9 pr-10 h-11",
                          errors.password && "border-red-300 focus-visible:ring-red-200"
                        )}
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p id="password-error" className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                    <ShieldCheck className="h-4 w-4 text-ph-green flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Demo mode:</strong> Use any credentials to
                      explore the portal. No real authentication is performed.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-ph-green hover:bg-ph-green-dark text-white"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to Member Portal
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-background px-2 text-muted-foreground">Or sign in with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" className="h-10">
                      <Smartphone className="h-4 w-4 mr-2" />
                      OTP via SMS
                    </Button>
                    <Button type="button" variant="outline" className="h-10">
                      <KeyRound className="h-4 w-4 mr-2" />
                      PhilSys ID
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <Card className="p-5 border-ph-green/20 bg-ph-green-light/30">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-ph-green-darker flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-ph-green-darker">New to PhilHealth?</h3>
                      <p className="text-sm text-ph-green-darker/80 mt-1">
                        All Filipino citizens are automatically covered under the Universal Health Care Act.
                        To activate your online account, you'll need your PhilHealth ID number (PIN).
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="mt-4 space-y-4">
                  <Button
                    onClick={() => navigate("services")}
                    className="w-full h-11 bg-ph-green hover:bg-ph-green-dark text-white"
                  >
                    Register as a new member
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    onClick={() => navigate("help-center")}
                    variant="outline"
                    className="w-full h-11"
                  >
                    Need help getting started?
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <div className="mt-6 text-center text-xs text-muted-foreground">
            By signing in, you agree to PhilHealth's{" "}
            <a href="#" className="underline hover:text-foreground">Terms of Use</a> and{" "}
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
          </div>
        </div>
      </div>

      {/* Right side — info panel */}
      <div className="hidden lg:flex bg-gradient-ph-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative flex flex-col justify-center p-12 text-white max-w-lg">
          <Badge className="bg-white/20 text-white hover:bg-white/20 w-fit mb-5">
            <ShieldCheck className="h-3 w-3 mr-1" />
            ISO 27001 Certified · Data Privacy Act Compliant
          </Badge>
          <h2 className="text-3xl font-bold leading-tight">
            Your PhilHealth account, secured and simplified.
          </h2>
          <p className="mt-4 text-white/85 text-lg leading-relaxed">
            Manage your membership, view contributions, track claims, and explore your benefits — all in
            one secure portal.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: CheckCircle2, title: "Real-time claims tracking", desc: "See your claim status from submission to payment" },
              { icon: CheckCircle2, title: "Contribution history", desc: "View all premiums paid by you and your employer" },
              { icon: CheckCircle2, title: "Benefits eligibility check", desc: "Know what you're covered for, instantly" },
              { icon: CheckCircle2, title: "Download official records", desc: "Print certificates for loans, visas, and more" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-white/80">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-white/20">
            <div className="text-xs uppercase tracking-wider text-white/70 mb-2">Need help?</div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("help-center")}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                Help Center
              </Button>
              <Button
                onClick={() => navigate("contact")}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
