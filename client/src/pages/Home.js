import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Search, Car, Plane, Home as HomeIcon, LifeBuoy, LogOut, ChevronDown } from 'lucide-react';

const Home = () => {
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState('');
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend
    fetch('http://127.0.0.1:8000/api/policies').then(res => res.json()).then(data => setPolicies(data));
    const saved = JSON.parse(localStorage.getItem('compareList') || '[]');
    setCompareList(saved);
  }, []);

  const handleCompare = (policy) => {
    let updated = [...compareList];
    if (compareList.find(p => p.id === policy.id)) {
      updated = compareList.filter(p => p.id !== policy.id);
    } else {
      if (compareList.length >= 3) return alert("Select up to 3 policies");
      updated.push(policy);
    }
    setCompareList(updated);
    localStorage.setItem('compareList', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Plus_Jakarta_Sans']">
      {/* Navbar matching Screenshot 71 */}
      <nav className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2563EB] rounded-lg">
            <Shield className="text-white" size={24} />
          </div>
          <span className="font-bold text-2xl text-[#2563EB]">InsureHub</span>
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-500">
            <span className="cursor-pointer hover:text-[#2563EB]">Policies</span>
            <span className="cursor-pointer hover:text-[#2563EB]">Recommendations</span>
            <span className="cursor-pointer hover:text-[#2563EB]">Claims</span>
          </div>
          <div className="flex items-center gap-3 border-l pl-8">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
               <LifeBuoy size={18} className="text-gray-400" />
            </div>
            <span className="font-bold text-gray-700 text-sm">John Doe</span>
            <LogOut size={16} className="text-gray-400 cursor-pointer" />
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-12 py-10">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#1E293B] mb-2">Policy Catalog</h1>
            <p className="text-gray-400 font-bold">Browse and compare insurance policies</p>
          </div>
          <button 
            onClick={() => navigate('/comparison')}
            className="bg-[#2563EB] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            Compare Selected ({compareList.length})
          </button>
        </div>

        <div className="flex gap-10">
          {/* Filters Sidebar */}
          <aside className="w-72 shrink-0">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Shield className="text-[#2563EB]" size={24}/> Filters
              </h3>
              
              <div className="mb-8">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Search</label>
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="text" placeholder="Search policies..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#2563EB] rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-4">Insurance Type</label>
                <div className="space-y-2">
                  <FilterItem icon={<Shield size={18}/>} label="All" active />
                  <FilterItem icon={<Heart size={18}/>} label="Health" />
                  <FilterItem icon={<LifeBuoy size={18}/>} label="Life" />
                  <FilterItem icon={<Car size={18}/>} label="Auto" />
                  <FilterItem icon={<Plane size={18}/>} label="Travel" />
                  <FilterItem icon={<HomeIcon size={18}/>} label="Home" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-4">Premium Range</label>
                <p className="text-[#2563EB] font-bold text-xs mb-3">₹ 0 - ₹ 1,00,000</p>
                <input type="range" className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-[#2563EB]" />
              </div>
            </div>
          </aside>

          {/* Policy Grid */}
          <main className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8">
            {policies.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
              <div key={p.id} className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                {/* Card Header matching Screenshot 71 pastel colors */}
                <div className={`p-8 flex items-center gap-5 ${p.type === 'Health' ? 'bg-red-50/50' : 'bg-blue-50/50'}`}>
                  <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {p.type === 'Health' ? <Heart size={28} className="text-red-500 fill-red-500" /> : <Shield size={28} className="text-[#2563EB] fill-[#2563EB]/10" />}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-[#1E293B]">{p.name}</h3>
                    <p className="text-sm font-bold text-gray-400 tracking-tight">{p.company}</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between mb-8">
                    <div>
                      <p className="text-[11px] font-black text-gray-400 uppercase mb-2">Annual Premium</p>
                      <p className="text-[#2563EB] font-black text-xl">₹ {p.premium.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-gray-400 uppercase mb-2">Coverage</p>
                      <p className="text-[#10B981] font-black text-xl">₹ {p.coverage.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate(`/policy-details/${p.id}`)}
                      className="flex-1 py-3.5 bg-white border-2 border-gray-100 text-[#1E293B] font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleCompare(p)}
                      className={`flex-1 py-3.5 font-bold rounded-2xl transition-all text-sm ${compareList.find(x => x.id === p.id) ? 'bg-orange-500 text-white' : 'bg-[#2563EB] text-white shadow-lg shadow-blue-100'}`}
                    >
                      {compareList.find(x => x.id === p.id) ? 'Selected' : 'Compare'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

const FilterItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl cursor-pointer transition-all ${active ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-200 font-bold' : 'text-gray-500 hover:bg-gray-50 font-semibold'}`}>
    {icon} <span>{label}</span>
  </div>
);

export default Home;