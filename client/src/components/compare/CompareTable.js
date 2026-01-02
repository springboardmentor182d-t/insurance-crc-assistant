const CompareRow = ({ label, values }) => (
  <tr>
    <th>{label}</th>
    {values.map((val, i) => (
      <td key={i}>{val}</td>
    ))}
  </tr>
);

const CompareTable = ({ policies }) => (
  <table className="compare-table">
    <tbody>
      <CompareRow
        label="Annual Premium"
        values={policies.map(p => `₹ ${p.premium}`)}
      />
      <CompareRow
        label="Sum Insured"
        values={policies.map(p => `₹ ${p.sum_insured}`)}
      />
      <CompareRow
        label="Waiting Period"
        values={policies.map(p => p.waiting_period)}
      />
      <CompareRow
        label="Claim Settlement"
        values={policies.map(p => p.claim_settlement)}
      />
      <CompareRow
        label="Room Rent Limit"
        values={policies.map(p => p.room_rent)}
      />
      <CompareRow
        label="Health Check-up"
        values={policies.map(p => p.health_checkup ? "✔️" : "❌")}
      />
    </tbody>
  </table>
);

export default CompareTable;
