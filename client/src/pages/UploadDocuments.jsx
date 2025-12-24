import "./uploadDocuments.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadDocuments } from "../api/claimsApi"; // 🔹 API import

function UploadDocuments() {
  const navigate = useNavigate();
  const { state } = useLocation(); // policy / claim data
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📁 FILE SELECT
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // ❌ REMOVE FILE
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // 🚀 SUBMIT CLAIM + UPLOAD
  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload at least one document");
      return;
    }

    try {
      setLoading(true);

      await uploadDocuments({
        claimId: state?.claimId || 1, // temp id
        files,
      });

      alert("✅ Claim submitted successfully!");
      navigate("/"); // back to Track Claims
    } catch (error) {
      alert("❌ Failed to upload documents");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      {/* STEPPER */}
      <div className="stepper">
        <div className="step done">✓ Select Policy</div>
        <div className="line"></div>
        <div className="step done">✓ Incident Details</div>
        <div className="line"></div>
        <div className="step active">Upload Documents</div>
      </div>

      <h1>Upload Documents</h1>
      <p className="subtitle">Upload supporting documents for your claim</p>

      {/* REQUIRED DOCS */}
      <div className="required-box">
        <h4>Required Documents:</h4>
        <ul>
          <li>Medical bills and receipts</li>
          <li>Doctor’s prescription and reports</li>
          <li>Discharge summary (if applicable)</li>
          <li>Identity proof</li>
          <li>Policy documents</li>
        </ul>
      </div>

      {/* UPLOAD BOX */}
      <div className="upload-box">
        <div className="upload-icon">⬆</div>
        <p><b>Drag & Drop Files Here</b></p>
        <span>or</span>

        <label className="browse-btn">
          Browse Files
          <input type="file" multiple onChange={handleFileChange} hidden />
        </label>

        <small>Supported formats: PDF, JPG, PNG (Max 10MB each)</small>
      </div>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div className="uploaded-box">
          <h4>Uploaded Files ({files.length})</h4>

          {files.map((file, index) => (
            <div className="file-item" key={index}>
              <div className="file-info">
                <div className="file-icon">📄</div>
                <div>
                  <p>{file.name}</p>
                  <small>{(file.size / 1024).toFixed(1)} KB</small>
                </div>
              </div>
              <button onClick={() => removeFile(index)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button className="back" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Claim"}
        </button>
      </div>

    </div>
  );
}

export default UploadDocuments;
