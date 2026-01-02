import { ShieldCheck, FileText, Calendar } from "lucide-react";

export default function QuickStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        Quick Stats
      </h3>

      <div className="space-y-4">
        <Stat
          icon={<ShieldCheck className="text-blue-600" />}
          label="Active Policies"
          value={stats.active_policies}
        />
        <Stat
          icon={<FileText className="text-orange-600" />}
          label="Claims Filed"
          value={stats.claims_filed}
        />
        <Stat
          icon={<Calendar className="text-green-600" />}
          label="Member Since"
          value={stats.member_since}
        />
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg border">
          {icon}
        </div>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
