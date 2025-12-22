import { Catalog } from "../layout/Sidebar";
import { PolicyLandingCointainer } from "../layout/PageContainer";

export function PolicyLanding({ policies }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <Catalog policies={policies || []} />

  
      <div className="flex-1 flex flex-col">
           <header className="bg-white shadow px-8 py-5 text-blue-600 font-bold text-lg">
          Insurance Policies
        </header>

   
        <main className="flex-1 p-6">
          <PolicyLandingCointainer />
        </main>
      </div>
    </div>
  );
}
