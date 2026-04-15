/**
 * CRM Layout Component (Premium Emerald Version)
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CRMSidebar from './CRMSidebar';
import CRMHeader from './CRMHeader';

const CRMLayout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50/30 relative overflow-hidden flex">
            {/* Theme-specific Dynamic Background */}
            <div className="mesh-gradient opacity-30 animate-pulse-slow"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-sales-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>

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