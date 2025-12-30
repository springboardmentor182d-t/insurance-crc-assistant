import React from 'react';
import Sidebar from './Sidebar';

const PageContainer = ({ children }) => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default PageContainer;
