import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Shield, Heart, Plus, ArrowLeft, LifeBuoy } from 'lucide-react';

const Comparison = () => {
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('compareList') || '[]');
    setPolicies(saved);
  }, []);

  // Define the rows exactly as per your text
  const rows = [
    { label: "Annual Premium", key: "premium", format: (v) => `₹ ${v.toLocaleString()}`, highlight: true },
    { label: "Sum Insured", key: "coverage", format: (v) => `₹ ${v.toLocaleString()}`, highlight: true },
    { label: "Cashless Hospitals", value: "5000+", altValue: "3000+" },
    { label: "Waiting Period", value: "30 Days", altValue: "60 Days" },
    { label: "Claim Settlement", value: "95%", altValue: "90%" },
    { label: "Pre-existing Coverage", value: "After 3 Years", altValue: "After 4 Years" },
    { label: "Room Rent Limit", value: "No Limit", altValue: "1% of SI" },
    { label: "Day Care Procedures", isCheck: true },
    { label: "Ambulance Cover", isCheck: true },
    { label: "Health Check-up", isCheck: true },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Plus_Jakarta_Sans'] p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
            <div>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#2563EB] font-bold mb-4 hover:opacity-70 transition-all text-sm uppercase tracking-widest">
                    <ArrowLeft size={18} /> Back to Catalog
                </button>
                <h1 className="text-5xl font-black text-[#1E293B] mb-2 tracking-tighter">Compare Policies</h1>
                <p className="text-gray-400 font-bold text-lg">Side-by-side comparison of selected policies</p>
            </div>
            <button onClick={() => navigate('/')} className="px-8 py-4 border-2 border-[#2563EB] text-[#2563EB] font-black rounded-2xl flex items-center gap-2 hover:bg-blue-50 transition-all">
                <Plus size={20}/> Add More
            </button>
        </div>

        {/* Policy Top Cards Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10">
            {/* Criteria Label Placeholder */}
            <div className="flex items-end pb-8">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Comparison Criteria</p>
            </div>

            {/* Dynamic Policy Cards */}
            {policies.map((p, idx) => (
                <div key={p.id} className="bg-white rounded-[40px] p-8 shadow-xl shadow-blue-100/20 border border-white text-center relative transition-transform hover:-translate-y-1">
                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${idx === 0 ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
                        {idx === 0 ? <Heart size={32} fill="currentColor" /> : <LifeBuoy size={32} fill="currentColor"/>}
                    </div>
                    <h3 className="text-xl font-black text-[#1E293B] mb-1">{p.name}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">{p.company}</p>
                    <button className="w-full py-4 bg-[#2563EB] text-white font-black rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Buy Now</button>
                </div>
            ))}

            {/* Add More Slot */}
            {policies.length < 3 && (
                <div className="bg-white/40 border-4 border-dashed border-gray-200 rounded-[40px] flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-blue-300 transition-all" onClick={() => navigate('/')}>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <Plus size={24} className="text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <p className="text-gray-500 font-black text-sm mb-1 uppercase tracking-tighter">Add policy</p>
                    <p className="text-gray-400 text-[10px] font-bold">to compare</p>
                </div>
            )}
        </div>

        {/* Main Comparison Table */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 overflow-hidden border border-white">
            {rows.map((row, i) => (
                <div key={i} className={`grid grid-cols-4 items-center border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    {/* Feature Label */}
                    <div className="p-8 font-bold text-[#64748B] text-sm pl-12 border-r border-gray-50">{row.label}</div>
                    
                    {/* Policy Values */}
                    {policies.map((p, pIdx) => (
                        <div key={p.id} className={`p-8 text-center font-black text-[15px] border-r border-gray-50 last:border-r-0 ${row.highlight ? 'bg-yellow-50 text-[#1E293B]' : 'text-gray-700'}`}>
                            {row.isCheck ? (
                                <div className="mx-auto w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check className="text-green-600" size={16} strokeWidth={3}/>
                                </div>
                            ) : (
                                pIdx === 0 ? row.format ? row.format(p[row.key]) : row.value : row.format ? row.format(p[row.key]) : row.altValue || row.value
                            )}
                        </div>
                    ))}

                    {/* Empty Space filler */}
                    {policies.length < 3 && (
                        <div className="p-8 text-center text-gray-200 font-black">-</div>
                    )}
                </div>
            ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 flex items-center gap-2 justify-end px-4">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Highlighted values indicate best option</p>
        </div>
      </div>
    </div>
  );
};

export default Comparison;