import ThemeToggle from "@/components/ThemeToggle";
import React from "react";
import AdminNotification from "./notification";
import { Bell } from "lucide-react";

const AdminNavbar = () => {
  return (
   <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl">Beekal Shrestha</h1>
      
      <div className="flex items-center space-x-4">
        {/* <AdminNotification /> */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default AdminNavbar;
