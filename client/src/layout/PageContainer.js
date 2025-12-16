const PageContainer = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
      {children}
    </main>
  );
};

export default PageContainer;
