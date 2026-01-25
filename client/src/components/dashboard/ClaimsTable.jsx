import { useNavigate } from "react-router-dom";

export default function ClaimsTable({ claims = [] }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-[var(--bg-card)]
        border border-[var(--border)]
        rounded-xl p-6
        flex flex-col justify-between h-full
      "
    >
      {/* TEXT CONTENT */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-1">
          Claims
        </h2>

        <p className="text-sm text-[var(--text-muted)] mt-2">
          Track status, upload documents, or review submitted claims.
        </p>
      </div>

      {/* BUTTON */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/claims")}
          className="
            mx-auto block
          bg-indigo-600
          text-white
            px-5 py-2 rounded-md
            text-sm font-medium
            transition
            hover:opacity-90
          "
        >
          View your claims →
        </button>
      </div>
    </div>
  );
}
