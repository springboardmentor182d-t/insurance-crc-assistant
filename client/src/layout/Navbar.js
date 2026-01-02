const Navbar = () => {
  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6">
      <div className="font-bold text-blue-600 text-lg">InsureHub</div>

      <div className="flex items-center gap-6 text-sm text-gray-600">
        <span>Policies</span>
        <span>Recommendations</span>
        <span>Claims</span>
        <span className="font-medium">John Doe</span>
      </div>
    </div>
  );
};

export default Navbar;
