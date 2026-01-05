import { REASON_ICONS } from "./reasonIcons";

export default function RecommendationReason({ reasons = [] }) {
  if (!reasons.length) return null;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border">
      <h2 className="text-xl font-semibold mb-6">
        Why We Recommend This
      </h2>

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {reasons.map((r) => (
          <Reason key={r.key} reason={r} />
        ))}
      </div>
    </div>
  );
}

function Reason({ reason }) {
  const Icon = REASON_ICONS[reason.icon];

  const ICON_STYLES = {
    shield: "bg-orange-50 text-orange-600",
    wallet: "bg-green-50 text-green-600",
    trending: "bg-orange-50 text-orange-600",
    star: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="flex items-start gap-4">
      {/* ICON */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center
        ${ICON_STYLES[reason.icon] ?? "bg-blue-50 text-blue-600"}`}
      >
        {Icon && <Icon className="w-6 h-6" />}
      </div>

      {/* TEXT */}
      <div>
        <p className="text-base font-semibold text-gray-900">
          {reason.title}
        </p>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          {reason.description}
        </p>
      </div>
    </div>
  );
}
