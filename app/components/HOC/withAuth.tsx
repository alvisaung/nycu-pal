"use client";
import { useRouter } from "next/router";
import { FC, ComponentType, useEffect, useState } from "react";

interface WithAuthProps {
  [key: string]: any;
}

const withAuth = <P extends WithAuthProps>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const authToken = localStorage.getItem("authToken");
      setIsAuthenticated(!!authToken);

      if (!authToken) {
        router.replace("/admin/login");
      }
    }, [router]);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
