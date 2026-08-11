"use client";

import { useEffect, useState, useCallback } from "react";

export interface UseCloudAuthReturn {
  authToken: string | null;
  authLoading: boolean;
  authError: string;
  loginPassword: string;
  setLoginPassword: (v: string) => void;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>;
}

export function useCloudAuth(): UseCloudAuthReturn {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Restore token from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ferrum-cloud-token");
      if (stored) setAuthToken(stored);
    } catch { /* ignore */ }
  }, []);

  // Authenticated fetch wrapper
  const authFetch = useCallback((url: string, opts?: RequestInit) => {
    return fetch(url, {
      ...opts,
      headers: {
        ...opts?.headers,
        "Authorization": `Bearer ${authToken}`,
      },
    });
  }, [authToken]);

  const handleLogin = async () => {
    setAuthLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/cloud/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setAuthToken(data.token);
        localStorage.setItem("ferrum-cloud-token", data.token);
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("Connection error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem("ferrum-cloud-token");
  }, []);

  return { authToken, authLoading, authError: loginError, loginPassword, setLoginPassword, handleLogin, handleLogout, authFetch };
}
