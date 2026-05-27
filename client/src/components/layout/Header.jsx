import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import { memo, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import useSidebarStore from "@/store/sidebar.store.js";

import Menu from "./Menu";

import Profile from "./Profile";
import { BookOpen } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const [mobileView, setMobileView] = useState(window.innerWidth < 780);

  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 780);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        `
          flex items-center justify-between border-b
          border-border bg-background px-3 py-2
          backdrop-blur-sm
        `,
        mobileView && "justify-between",
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        {mobileView && <Menu toggleSidebar={toggleSidebar} />}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="
            h-10 rounded-xl px-3
            hover:bg-accent
          "
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{
              type: "spring",
              stiffness: 180,
            }}
            className="flex items-center gap-2"
          >
            {/* Icon */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="
                         flex h-11 w-11
                         items-center justify-center
                         rounded-2xl border
                         border-border bg-card
                         shadow-sm
                       "
            >
              <BookOpen className="h-5 w-5" />
            </motion.div>

            <div className="flex flex-col items-start">
              <h1 className="text-sm font-semibold text-foreground">OneNote</h1>

              <span className="text-[10px] text-muted-foreground">
                Smart notebook
              </span>
            </div>
          </motion.div>
        </Button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Profile />
      </div>
    </header>
  );
};

export default memo(Header);
