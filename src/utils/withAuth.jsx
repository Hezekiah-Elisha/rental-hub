"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthService from "@/utils/AuthService";

export function withAuth(WrappedComponent) {
  return function AuthWrapper(props) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = AuthService.getAccessToken();
        
        if (!token) {
          // Redirect to login if no token
          router.replace('/login');
          return;
        }

        try {
          // Optional: Verify token with backend
          const authAxios = AuthService.createAuthenticatedAxios();
          await authAxios.get('/verify-token');
        } catch (error) {
          // Token is invalid, logout and redirect
          AuthService.logout();
          router.replace('/login');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}

// Usage example
export function ProtectedPage() {
  return <div>This is a protected page</div>;
}

export const SecurePage = withAuth(ProtectedPage);