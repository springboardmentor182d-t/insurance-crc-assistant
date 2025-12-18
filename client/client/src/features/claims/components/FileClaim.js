function FileClaim() {

  const submitClaim = async () => {
    await fetch("http://127.0.0.1:8000/claims/create", {
      method: "POST"
    });
    alert("Claim submitted");
  };

  return (
    <div>
      <h2>File Claim</h2>

      <input type="text" placeholder="Claim Type" />
      <br /><br />

      <input type="number" placeholder="Amount" />
      <br /><br />

      <button onClick={submitClaim}>Submit Claim</button>
    </div>
  );
}

export default FileClaim;
