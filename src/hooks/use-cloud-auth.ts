"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export interface UseCloudAuthReturn {
  authToken: string | null;
  authLoading: boolean;
  authError: string;
  demoMode: boolean;
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
  const [demoMode, setDemoMode] = useState(false);

  // Track whether we have an active refresh timer
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore token from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ferrum-cloud-token");
      if (stored) setAuthToken(stored);
    } catch { /* ignore */ }
    return () => {
      // Cleanup refresh timer on unmount
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, []);

  // Authenticated fetch wrapper.
  // On 401, clear token (expired / revoked).
  const authFetch = useCallback((url: string, opts?: RequestInit) => {
    return fetch(url, {
      ...opts,
      headers: {
        ...opts?.headers,
        "Authorization": `Bearer ${authToken}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        // Token expired or invalid — clear auth state
        setAuthToken(null);
        localStorage.removeItem("ferrum-cloud-token");
      }
      return res;
    });
  }, [authToken]);

  const handleLogin = useCallback(async () => {
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
        if (data.demo) setDemoMode(true);
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("Connection error");
    } finally {
      setAuthLoading(false);
    }
  }, [loginPassword]);

  const handleLogout = useCallback(() => {
    // Notify server to clear cookie
    fetch("/api/cloud/auth", { method: "DELETE" }).catch(() => {/* best-effort */});
    setAuthToken(null);
    setDemoMode(false);
    localStorage.removeItem("ferrum-cloud-token");
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
  }, []);

  return { authToken, authLoading, authError: loginError, demoMode, loginPassword, setLoginPassword, handleLogin, handleLogout, authFetch };
}
