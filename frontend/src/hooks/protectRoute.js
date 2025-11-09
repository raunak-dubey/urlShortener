"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/api/user.api";
import { login, logout } from "@/redux/slices/authSlice";

export function useProtectRoute() {
  const router = useRouter();
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await getUser(); // backend /auth/me
        if (res.user) {
          dispatch(login(res.user)); // store user in Redux
        } else {
          dispatch(logout());
          router.push("/auth/login");
        }
      } catch (error) {
        dispatch(logout());
        router.push("/auth/login");
      }
    }
    verifyUser()
  }, [router, dispatch]);
}