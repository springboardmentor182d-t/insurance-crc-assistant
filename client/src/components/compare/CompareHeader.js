const CompareHeader = ({ policies }) => (
  <div className="compare-header">
    {policies.map(policy => (
      <div className="compare-card" key={policy.id}>
        <h3>{policy.name}</h3>
        <p>{policy.category}</p>
        <button className="btn-primary">Buy Now</button>
      </div>
    ))}
  </div>
);

export default CompareHeader;
