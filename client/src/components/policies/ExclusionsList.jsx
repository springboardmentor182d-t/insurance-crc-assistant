import { XCircle } from "lucide-react";

export default function ExclusionsList({ exclusions }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="font-semibold mb-4">Exclusions</h2>

      <ul className="space-y-2 text-sm">
        {exclusions.map((e, i) => (
          <li key={i} className="flex gap-2">
            <XCircle size={16} className="text-red-500 mt-0.5" />
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
