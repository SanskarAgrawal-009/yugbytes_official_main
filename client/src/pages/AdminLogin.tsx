import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import ThemeToggle from '../components/ui/theme-toggle';
import Spinner from '../components/ui/spinner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      toast({
        title: 'Login successful',
        variant: 'default',
      });

      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your email and password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={`mt-1 ${emailError ? 'border-destructive' : ''}`}
              aria-invalid={emailError ? 'true' : 'false'}
              aria-describedby="email-error"
            />
            {emailError && <p id="email-error" className="text-destructive text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={`mt-1 ${passwordError ? 'border-destructive' : ''}`}
              aria-invalid={passwordError ? 'true' : 'false'}
              aria-describedby="password-error"
            />
            {passwordError && <p id="password-error" className="text-destructive text-sm mt-1">{passwordError}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AdminLogin;
