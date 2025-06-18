import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Tabs is available from shadcn/ui

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  console.log('AuthPage loaded');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Placeholder login logic
    if (email === 'user@example.com' && password === 'password123') {
      console.log('Login successful');
      // In a real app, set auth token and redirect
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    // Placeholder registration logic
    console.log('Registration attempt:', { email });
    // Simulate successful registration and switch to login or auto-login
    alert('Registration successful! Please login.');
    setIsLogin(true); // Switch to login tab/view
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-pink-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => { setIsLogin(true); setError(null); }}>Login</TabsTrigger>
            <TabsTrigger value="register" onClick={() => { setIsLogin(false); setError(null); }}>Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-blue-600">Welcome Back!</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your Doraemon Health Portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && isLogin && (
                  <Alert variant="destructive">
                    <AlertTitle>Login Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="user@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" placeholder="password123" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Login</Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
              <Link to="/forgot-password" // Assuming a route for this
                className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </CardFooter>
          </TabsContent>
          <TabsContent value="register">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-pink-500">Create Account</CardTitle>
              <CardDescription className="text-center">
                Join the Doraemon Health Portal today!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                {error && !isLogin && (
                  <Alert variant="destructive">
                    <AlertTitle>Registration Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="me@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input id="register-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">Register</Button>
              </form>
            </CardContent>
             <CardFooter className="flex flex-col items-center space-y-2">
                <p className="text-xs text-gray-500">
                    By registering, you agree to our Terms of Service.
                </p>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;