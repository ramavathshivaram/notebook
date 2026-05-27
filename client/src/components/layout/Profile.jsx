import React, { memo } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { LogOut, MoonStar } from "lucide-react";

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
        <button
          className="
            rounded-full outline-none transition
            ring-offset-background
            focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          <Avatar
            className="
              h-9 w-9 cursor-pointer border border-border
              transition-transform duration-200 hover:scale-105
            "
          >
            <AvatarImage src={user?.avatar} alt={user?.userName} />

            <AvatarFallback className="bg-muted text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </HoverCardTrigger>

      <HoverCardContent
        align="end"
        className="
          w-72 space-y-4 rounded-2xl border border-border
          bg-popover p-4 text-popover-foreground shadow-xl
        "
      >
        {/* User */}
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border border-border">
            <AvatarImage src={user?.avatar} alt={user?.userName} />

            <AvatarFallback className="bg-muted text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {user?.userName || "User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Theme */}
        <div
          className="
            flex items-center justify-between rounded-xl
            border border-border bg-muted/40 px-3 py-2
          "
        >
          <div className="flex items-center gap-2">
            <MoonStar className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm font-medium text-foreground">Theme</span>
          </div>

          <DarkModeToggle />
        </div>

        {/* Logout */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleLogout}
            className="w-full justify-center gap-2 rounded-xl"
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
