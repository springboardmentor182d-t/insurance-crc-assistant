import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-lg px-3 py-2">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search policies, claims, recommendations..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      
      <div className="flex items-center gap-6">
       
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>

      
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            // src="https://i.pravatar.cc/40"
            src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">
            User Name
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
