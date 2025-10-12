import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePageStore from "../store/usePageStore";

const Header = ({ clearUser }) => {
  const navigate = useNavigate();
  const clearCurrentPage = usePageStore((s) => s.clearCurrentPage);

  return (
    <header className="border-b border-border p-4 flex items-center justify-between bg-card shadow-sm">
      {/* Logo / Home */}
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="flex items-center"
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="text-2xl font-bold animate-pulse"
        >
          OneNote
        </motion.h1>
      </Button>

      {/* Logout */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2"
      >
        <Button
          size="sm"
          onClick={() => {
            clearUser();
            clearCurrentPage();
            localStorage.removeItem("token");
            navigate("/auth");
          }}
          className="flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </motion.div>
    </header>
  );
};

export default Header;
