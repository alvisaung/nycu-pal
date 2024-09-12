"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import api from "@/app/api";

export function withAuth<P extends object>(WrappedComponent: NextPage<P>): NextPage<P> {
  const Auth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.replace("/admin/login");
          return;
        }

        try {
          const res = await api("/validate-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Authentication error:", error);
          localStorage.removeItem("authToken");
          router.replace("/admin/login");
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
}
