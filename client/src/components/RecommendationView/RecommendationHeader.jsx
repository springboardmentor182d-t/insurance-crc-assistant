import { getInsuranceIcon } from "./insuranceIcons";

export default function RecommendationHeader({ data }) {
  const policy = data?.policy;
  const insuranceType = policy?.category?.toLowerCase();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white shadow-lg">
      <div className="flex items-center justify-between gap-8">

        {/* LEFT */}
        <div className="flex items-center gap-5">

          {/* ICON */}
          <div className="w-14 h-14 rounded-xl bg-white/25 flex items-center justify-center shrink-0">
            {getInsuranceIcon(insuranceType)}
          </div>

          {/* TITLE + PROVIDER */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold leading-tight">
                {policy?.name}
              </h1>

              {/* MATCH */}
              <span className="bg-yellow-400 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
                {data.match}% Match
              </span>
            </div>

            <p className="text-base text-blue-100 mt-1">
              {policy?.provider}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-right">
          <p className="text-sm uppercase tracking-wide text-blue-200">
            Annual Premium
          </p>

          <p className="text-3xl font-bold leading-tight mt-1">
            ₹ {policy?.premium?.toLocaleString()}
          </p>

          {data.savings > 0 && (
            <p className="text-sm text-green-200 mt-1">
              Save ₹ {data.savings.toLocaleString()} vs average
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
