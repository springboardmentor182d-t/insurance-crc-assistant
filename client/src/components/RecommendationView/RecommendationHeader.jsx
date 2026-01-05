import { getInsuranceIcon } from "./insuranceIcons";

export default function RecommendationHeader({ data }) {
  const insuranceType = data?.type?.toLowerCase(); // ✅ safety

  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white shadow">

      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* INSURANCE ICON */}
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            {getInsuranceIcon(insuranceType)}
          </div>

          {/* TITLE + MATCH */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold leading-tight">
                {data.title}
              </h1>

              {/* MATCH SCORE */}
              <span className="self-center bg-yellow-400 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
                {data.match}% Match
              </span>
            </div>

            <p className="text-sm opacity-90 leading-tight">
              {data.provider}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-right leading-tight">
          <p className="text-xs opacity-80">
            Annual Premium
          </p>
          <p className="text-lg font-bold">
            ₹ {data.premium?.toLocaleString()}
          </p>
          <p className="text-xs text-green-200">
            Save ₹ {data.savings?.toLocaleString()} vs average
          </p>
        </div>

      </div>
    </div>
  );
}
