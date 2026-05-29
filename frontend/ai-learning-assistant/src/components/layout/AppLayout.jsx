
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AppLayout;
