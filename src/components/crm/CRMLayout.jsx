/**
 * CRM Layout Component (Premium Emerald Version)
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CRMSidebar from './CRMSidebar';
import CRMHeader from './CRMHeader';

const CRMLayout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex">
            {/* Theme-specific Mesh Background */}
            <div className="mesh-gradient opacity-40"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sales-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>

            {/* Sidebar */}
            <CRMSidebar isCollapsed={sidebarCollapsed} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
                {/* Header */}
                <CRMHeader 
                    onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
                    isSidebarCollapsed={sidebarCollapsed} 
                />

                {/* Page Content with Entrance Animation */}
                <main className="p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="max-w-[1600px] mx-auto">
                        {children || <Outlet />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CRMLayout;