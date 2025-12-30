import React from 'react';
import { User, Bell, Settings } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for policies, claims..." 
                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-64"
                    />
                    <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <button className="text-gray-500 hover:text-blue-600 relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                    <Settings size={20} />
                </button>
                <div className="flex items-center gap-3 pl-6 border-l">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">Sahithi G</p>
                        <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
