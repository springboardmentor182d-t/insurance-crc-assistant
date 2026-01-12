import React from 'react';

const Checkbox = ({ label, name, checked, onChange }) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 group-hover:border-blue-400'}`}>
                    {checked && (
                        <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            </div>
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
};

export default Checkbox;
