export default function CoverageDetails({ policy }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="font-semibold mb-4">Coverage Details</h2>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-slate-500">Policy Term</p>
          <p>{policy.term}</p>
        </div>
        <div>
          <p className="text-slate-500">Deductible</p>
          <p>{policy.deductible ?? "N/A"}</p>
        </div>
        <div>
          <p className="text-slate-500">Waiting Period</p>
          <p>{policy.waitingPeriod}</p>
        </div>
        <div>
          <p className="text-slate-500">Room Rent Limit</p>
          <p>{policy.roomRent ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
