import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Shield, ArrowLeft, CheckCircle, Zap, LogOut, Star } from 'lucide-react';

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setPolicy] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    fetch(`http://127.0.0.1:8000/api/policies/${id}`).then(res => res.json()).then(data => setPolicy(data));
  }, [id]);

  if (!p) return <div className="p-20 text-center font-black text-blue-600">Loading Details...</div>;

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Plus_Jakarta_Sans'] text-[#1E293B]">
      {/* Header / Navbar */}
      <nav className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2563EB] rounded-lg shadow-lg shadow-blue-200">
            <Shield className="text-white" size={24} />
          </div>
          <span className="font-bold text-2xl text-[#2563EB]">InsureHub</span>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-8 text-sm font-semibold text-gray-500">
            <span>Policies</span><span>Recommendations</span><span>Claims</span>
          </div>
          <div className="flex items-center gap-3 border-l pl-8">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
               <span className="text-[#2563EB] font-bold text-xs">JD</span>
            </div>
            <span className="font-bold text-gray-700 text-sm">John Doe</span>
            <LogOut size={16} className="text-gray-400 cursor-pointer ml-2" />
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-12 py-10">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#2563EB] font-bold mb-8 hover:opacity-70 transition-all text-sm">
          <ArrowLeft size={18} /> BACK TO CATALOG
        </button>

        <div className="grid grid-cols-12 gap-10">
          
          {/* LEFT COLUMN (8 Units) */}
          <div className="col-span-8 space-y-8">
            
            {/* Split Header Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-red-50 rounded-3xl">
                  <Heart size={40} className="text-red-500 fill-red-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-black">{p.name}</h1>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{p.company}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100 min-w-[160px]">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Annual Premium</p>
                  <p className="text-2xl font-black text-[#2563EB]">₹ {p.premium.toLocaleString()}</p>
                </div>
                <div className="bg-green-50/50 p-5 rounded-3xl border border-green-100 min-w-[160px]">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Sum Insured</p>
                  <p className="text-2xl font-black text-green-600">₹ {p.coverage.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="px-8 py-3.5 border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all text-xs">Add to Compare</button>
                <button className="px-8 py-3.5 bg-[#2563EB] text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all text-xs">Buy Now</button>
              </div>
            </div>

            {/* Coverage Details Table */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
              <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                <Zap size={20} className="text-yellow-500 fill-yellow-500" /> Coverage Details
              </h3>
              <div className="grid grid-cols-2 gap-y-10">
                <DetailBox label="Policy Term" value="1 Year (Renewable)" />
                <DetailBox label="Deductible" value="₹ 25,000" />
                <DetailBox label="Waiting Period" value="30 Days" />
                <DetailBox label="Room Rent Limit" value="No Limit" />
              </div>
            </div>

            {/* Benefits vs Exclusions Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Benefits Included */}
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
                <h3 className="text-lg font-black mb-8 text-green-600 uppercase tracking-tighter">Benefits Included</h3>
                <ul className="space-y-5">
                  <ListItem type="benefit" text="Cashless hospitalization at 5000+ network hospitals" />
                  <ListItem type="benefit" text="Coverage for pre-existing diseases after 3 years" />
                  <ListItem type="benefit" text="Annual health check-up included" />
                  <ListItem type="benefit" text="No claim bonus up to 50%" />
                  <ListItem type="benefit" text="Ambulance charges covered" />
                  <ListItem type="benefit" text="Day-care procedures covered" />
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
                <h3 className="text-lg font-black mb-8 text-red-500 uppercase tracking-tighter">Exclusions</h3>
                <ul className="space-y-5">
                  <ListItem type="exclusion" text="Cosmetic procedures" />
                  <ListItem type="exclusion" text="Self-inflicted injuries" />
                  <ListItem type="exclusion" text="Experimental treatments" />
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (4 Units) */}
          <div className="col-span-4 space-y-8">
            
            {/* Policy Score Circular Gauge */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50 text-center">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Policy Score</h3>
              <div className="relative w-44 h-44 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="88" cy="88" r="80" stroke="#F1F5F9" strokeWidth="14" fill="transparent" />
                  <circle cx="88" cy="88" r="80" stroke="#2563EB" strokeWidth="14" fill="transparent" strokeDasharray="502" strokeDashoffset="75" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-[#2563EB]">8.5/10</span>
                </div>
              </div>
              <p className="text-sm font-bold text-[#10B981] bg-green-50 inline-block px-4 py-1.5 rounded-full">Highly Recommended</p>
            </div>

            {/* Provider Rating */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
              <h3 className="text-lg font-black mb-6">Provider Rating</h3>
              <div className="space-y-5 font-bold text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Claim Settlement</span>
                  <span className="text-[#2563EB] bg-blue-50 px-3 py-1 rounded-lg">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Customer Service</span>
                  <span className="text-[#2563EB] bg-blue-50 px-3 py-1 rounded-lg">4.5/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">TAT (Days)</span>
                  <span className="text-[#2563EB] bg-blue-50 px-3 py-1 rounded-lg">7</span>
                </div>
              </div>
            </div>

            {/* Special Offer Card */}
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-[40px] p-8 border border-yellow-300 shadow-lg shadow-yellow-100/50">
              <div className="flex items-center gap-3 mb-4">
                <Star className="text-yellow-600 fill-yellow-600" size={24} />
                <h3 className="font-black text-yellow-900">Special Offer</h3>
              </div>
              <p className="text-sm font-bold text-yellow-800 mb-8 opacity-80">Get 10% discount on annual premium for online purchase</p>
              <button className="w-full py-4 bg-[#2563EB] text-white font-black rounded-2xl shadow-lg shadow-blue-200 hover:scale-105 transition-all">Claim Offer</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for clean code
const DetailBox = ({ label, value }) => (
  <div className="border-l-4 border-blue-50 pl-6">
    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-lg font-black text-[#1E293B]">{value}</p>
  </div>
);

const ListItem = ({ type, text }) => (
  <li className="flex items-start gap-4">
    <div className={`mt-1.5 w-3.5 h-3.5 rounded-full shrink-0 ${type === 'benefit' ? 'bg-[#10B981]' : 'bg-red-500'}`}></div>
    <span className="text-[14px] font-bold text-gray-600 leading-tight">{text}</span>
  </li>
);

export default PolicyDetails;