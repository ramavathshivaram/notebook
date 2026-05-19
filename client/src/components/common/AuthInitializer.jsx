import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import LoadingHeader from "@/components/common/LoadingHeader";

const AuthInitializer = () => {
  const authCheck = useAuthStore((s) => s.authCheck);
  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <>
      {isCheckingAuth && <LoadingHeader />}
      <Outlet />
    </>
  );
};

export default AuthInitializer;
