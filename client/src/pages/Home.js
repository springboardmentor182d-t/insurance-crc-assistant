import React from 'react';
import { Shield, FileText, Clock, PieChart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const stats = [
        { label: 'Active Policies', value: '2', icon: Shield, color: 'bg-blue-500' },
        { label: 'Claims Filed', value: '1', icon: FileText, color: 'bg-green-500' },
        { label: 'Pending Review', value: '1', icon: Clock, color: 'bg-yellow-500' },
    ];

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, User</h1>
            <p className="text-gray-500 mb-10 text-lg">Here's an overview of your insurance status.</p>

            <div className="grid grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`${stat.color} p-3 rounded-lg text-white`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        <Link to="/file-claim" className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded text-blue-600">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">File a New Claim</p>
                                    <p className="text-sm text-gray-500">Submit a claim for your active policies</p>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-400 group-hover:text-blue-600" size={20} />
                        </Link>
                        <Link to="/claims" className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-2 rounded text-green-600">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Track Claims</p>
                                    <p className="text-sm text-gray-500">Check the status of your existing claims</p>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-400 group-hover:text-blue-600" size={20} />
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-6">Active Policies</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-gray-800">Comprehensive Vehicle</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">ACTIVE</span>
                            </div>
                            <p className="text-sm text-gray-500">POL-2024-A123B45</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-gray-800">Home Protection Plus</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">ACTIVE</span>
                            </div>
                            <p className="text-sm text-gray-500">POL-2023-C678D90</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;