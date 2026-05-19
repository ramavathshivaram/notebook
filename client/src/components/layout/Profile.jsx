import React, { memo } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import DarkModeToggle from "./DarkModeToggle";

import useAuthStore from "@/store/auth.store";

const Profile = () => {
  const navigate = useNavigate();

  const logout = useAuthStore((s) => s.logout);

  const user = useAuthStore((s) => s.user);

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const initials =
    user?.userName
      ?.split(" ")
      ?.map((word) => word[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>
        <button className="rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="h-9 w-9 cursor-pointer border">
            <AvatarImage src={user?.avatar} alt={user?.userName} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </HoverCardTrigger>

      <HoverCardContent align="end" className="w-64 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={user?.avatar} alt={user?.name} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {user?.userName || "User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-1 px-2">
          <span className="text-sm font-medium">Theme</span>

          <DarkModeToggle />
        </div>

        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleLogout}
            className="w-full justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default memo(Profile);
