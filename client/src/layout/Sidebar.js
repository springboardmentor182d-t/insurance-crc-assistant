import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Clock, HelpCircle, Shield } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'File a Claim', path: '/file-claim', icon: FileText },
        { name: 'My Claims', path: '/claims', icon: Clock },
        { name: 'Help', path: '/help', icon: HelpCircle },
    ];

    return (
        <aside className="w-64 bg-blue-600 text-white min-h-screen p-6">
            <div className="flex items-center gap-2 mb-10">
                <Shield className="w-8 h-8" />
                <span className="font-bold text-xl">Insurance CRC</span>
            </div>
            <nav className="space-y-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                isActive ? 'bg-blue-700 font-semibold' : 'hover:bg-blue-500'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
