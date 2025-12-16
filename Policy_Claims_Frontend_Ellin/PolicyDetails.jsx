import { useParams } from "react-router-dom";
import Header from "../components/Header";

const PolicyDetails = () => {
  const { id } = useParams();

  // 🔹 Policy details INSIDE this file (6 items)
  const policyData = {
    1: {
      title: "Health Shield Plan",
      policyNumber: "HSP-398274",
      holder: "John Doe",
      type: "Health Insurance",
      start: "13 Jan 2022",
      end: "2 Jan 2027",
      payment: "Monthly",
      coverage: "5,00,000",
      nominee: "John Doe (Spouse)",
      hospital: "5,00,000",
      accidental: "2,00,000",
    },

    2: {
      title: "Family Care Plus",
      policyNumber: "FCP-782341",
      holder: "Anita Sharma",
      type: "Family Insurance",
      start: "05 Mar 2021",
      end: "04 Mar 2026",
      payment: "Yearly",
      coverage: "10,00,000",
      nominee: "Rahul Sharma",
      hospital: "10,00,000",
      accidental: "3,00,000",
    },

    3: {
      title: "Secure Life Policy",
      policyNumber: "TSP-552341",
      holder: "Alex John",
      type: "Travel Insurance",
      start: "20 Dec 2024",
      end: "20 Dec 2025",
      payment: "One Time",
      coverage: "2,00,000",
      nominee: "Self",
      hospital: "2,00,000",
      accidental: "1,00,000",
    },

    4: {
      title: "Senior Health Plan",
      policyNumber: "SHP-998231",
      holder: "Ramesh Kumar",
      type: "Senior Citizen Insurance",
      start: "01 Jan 2023",
      end: "01 Jan 2028",
      payment: "Monthly",
      coverage: "6,00,000",
      nominee: "Suresh Kumar",
      hospital: "6,00,000",
      accidental: "1,50,000",
    },

    5: {
      title: "Accident Guard",
      policyNumber: "AG-663218",
      holder: "Priya Singh",
      type: "Accident Insurance",
      start: "10 Jun 2022",
      end: "10 Jun 2027",
      payment: "Yearly",
      coverage: "3,00,000",
      nominee: "Father",
      hospital: "3,00,000",
      accidental: "3,00,000",
    },

    6: {
      title: "Child Future Plan",
      policyNumber: "CFP-441287",
      holder: "Vikram Rao",
      type: "Child Insurance",
      start: "15 Aug 2020",
      end: "15 Aug 2035",
      payment: "Yearly",
      coverage: "15,00,000",
      nominee: "Child",
      hospital: "5,00,000",
      accidental: "2,00,000",
    },
    7: {
      title: "Retirement  Plans",
      policyNumber: "RP-441287",
      holder: "Vikram",
      type: "Retirement Insurance",
      start: "15 Aug 2020",
      end: "15 Aug 2035",
      payment: "Yearly",
      coverage: "15,00,000",
      nominee: "Father",
      hospital: "5,00,000",
      accidental: "2,00,000",
    },
    8: {
      title: "Term Life Insurance",
      policyNumber: "TLI-441287",
      holder: "Sakthi",
      type: "Life Insurance",
      start: "15 Aug 2020",
      end: "15 Aug 2035",
      payment: "Yearly",
      coverage: "15,00,000",
      nominee: "Mother",
      hospital: "5,00,000",
      accidental: "2,00,000",
    },
    9: {
      title: "Endowment Plans",
      policyNumber: "EP-441287",
      holder: "Raj",
      type: "Savings Plan",
      start: "15 Aug 2020",
      end: "15 Aug 2035",
      payment: "Yearly",
      coverage: "15,00,000",
      nominee: "Child",
      hospital: "5,00,000",
      accidental: "2,00,000",
    }
  };

  const policy = policyData[id];

  if (!policy) {
    return <p className="p-8">Policy not found</p>;
  }
  // 🔹 Simple premium calculation logic
const calculatePremium = () => {
  let basePremium = 0;

  // Convert coverage to number
  const coverageValue = Number(policy.coverage.replace(/,/g, ""));

  // Base premium: 1% of coverage
  basePremium = coverageValue * 0.01;

  // Policy type adjustment
  if (policy.type.includes("Health")) basePremium += 500;
  if (policy.type.includes("Travel")) basePremium += 300;
  if (policy.type.includes("Accident")) basePremium += 200;

  // Payment frequency adjustment
  if (policy.payment === "Monthly") basePremium /= 12;
  if (policy.payment === "Yearly") basePremium = basePremium;

  return Math.round(basePremium);
};


  return (
    <>
      <Header />

      <div className="bg-gray-50 min-h-screen p-8">

        <h1 className="text-2xl font-semibold mb-2">Policy Details</h1>

        <p className="text-gray-500 mb-6">
          Home / My Policy / Policy Details
        </p>

        <div className="grid grid-cols-2 gap-6">

          {/* Left Top */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold">{policy.title}</h2>
            <p className="mt-2 text-gray-700">Policy Number</p>
            <p className="font-medium">{policy.policyNumber}</p>

            <span className="inline-block mt-3 bg-blue-600 text-white text-sm px-4 py-1 rounded-full">
              ACTIVE
            </span>

            <p className="mt-4 text-gray-700">
              Renewal Date: <b>12 Jan 2026</b>
            </p>

            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
              Renew Date
            </button>
          </div>

          {/* Right Top */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">
              Detailed policy Information
            </h2>

            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
              <span>Policy Holder Name</span><span>{policy.holder}</span>
              <span>Policy Type</span><span>{policy.type}</span>
              <span>Start Date</span><span>{policy.start}</span>
              <span>End Date</span><span>{policy.end}</span>
              <span>Payment Frequency</span><span>{policy.payment}</span>
              <span>Coverage Amount</span><span>{policy.coverage}</span>
              <span>Nominee</span><span>{policy.nominee}</span>
            </div>
          </div>

          {/* Left Bottom */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">
              Coverage & Benefits
            </h2>

            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
              <span>Hospital Cover</span><span>{policy.hospital}</span>
              <span>Accidental Cover</span><span>{policy.accidental}</span>
              <span>Critical illness</span><span>Included</span>
              <span>Pre/Post Hospitalization</span><span>Included</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-gray-800 font-semibold">
            <span>Estimated Premium</span>
            <span>₹ {calculatePremium()}</span>
            </div>

          </div>

          {/* Right Bottom */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">
              Documents
            </h2>

            <ul className="space-y-3 text-blue-600 font-medium">
              <li>📄 Policy Document Pdf</li>
              <li>📄 Terms & Conditions</li>
              <li>📄 Claim Form</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
};

export default PolicyDetails;
