import {
  FileText,
  AlertCircle,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function Metrics() {
  const metrics = [
    {
      label: "Total Claims",
      value: "1,240 today",
      change: "+5.2%",
      icon: <FileText className="text-purple-600" />,
    },
    {
      label: "Flagged Claims",
      value: "85",
      change: "+12",
      status: "Action Needed",
      icon: <AlertCircle className="text-red-600" />,
    },
    {
      label: "Risk Exposure",
      value: "$450k est.",
      status: "Pending",
      icon: <ShieldCheck className="text-yellow-500" />,
    },
    {
      label: "Avg Fraud Score",
      value: "42 /100",
      status: "Stable",
      icon: <Activity className="text-green-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <p className="text-2xl font-bold">{item.value}</p>
          {item.change && <p className="text-green-600 text-sm">{item.change}</p>}
          {item.status && <p className="text-xs text-gray-400">{item.status}</p>}
        </div>
      ))}
    </div>
  );
}