import { ShieldCheck, Check } from "lucide-react";

export default function PolicyIllustration() {
  return (
    <div className="relative w-[420px] max-w-full bg-blue-50 flex items-center justify-center p-6">
      
      {/* Rupee badge */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2
        w-9 h-9 rounded-full bg-orange-100 text-orange-500
        flex items-center justify-center text-sm font-semibold">
        ₹
      </div>

      {/* Check badge */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2
        w-9 h-9 rounded-full bg-green-100 text-green-600
        flex items-center justify-center">
        <Check size={16} />
      </div>

      {/* Document */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm w-56 p-4">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <ShieldCheck className="text-blue-600" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-2 bg-slate-200 rounded" />
          <div className="h-2 bg-slate-200 rounded w-4/5 mx-auto" />
          <div className="h-2 bg-slate-200 rounded w-3/5 mx-auto" />
        </div>

        <div className="flex gap-2">
          <span className="flex-1 bg-blue-100 text-blue-600 text-xs py-1 rounded-md text-center">
            Coverage
          </span>
          <span className="flex-1 bg-yellow-100 text-yellow-700 text-xs py-1 rounded-md text-center">
            Premium
          </span>
        </div>
      </div>
    </div>
  );
}
