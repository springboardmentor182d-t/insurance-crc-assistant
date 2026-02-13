import { CheckCircle } from "lucide-react";

export default function BenefitsList({ benefits }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="font-semibold mb-4">Benefits Included</h2>

      <ul className="space-y-2 text-sm">
        {benefits.map((b, i) => (
          <li key={i} className="flex gap-2">
            <CheckCircle size={16} className="text-green-500 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
