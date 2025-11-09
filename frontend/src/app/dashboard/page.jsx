"use client";
import { useProtectRoute } from "@/hooks/protectRoute";

export default function Dashboard() {
  useProtectRoute();
  return <div>Dashboard content</div>;
}
