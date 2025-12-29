import React, { useEffect } from "react";

const DashboardLayout = ({ sidebar, children }) => {
  // Ensure theme is set on initial load
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar */}
      <aside className="
        w-64 
        bg-white 
        dark:bg-gray-800 
        text-gray-900 
        dark:text-gray-100 
        border-r 
        border-gray-200 
        dark:border-gray-700
        p-6
        shadow-sm
        hidden md:block
      ">
        {sidebar}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="
          bg-white 
          dark:bg-gray-800 
          rounded-xl 
          shadow-md 
          p-6
          min-h-[calc(100vh-3rem)]
        ">
          {children}
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;
