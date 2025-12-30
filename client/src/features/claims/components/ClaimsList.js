import React, { useEffect, useState } from 'react';
import { getClaims } from '../services/claimsService';
import { Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

const ClaimsList = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const data = await getClaims();
                setClaims(data);
            } catch (error) {
                console.error('Error fetching claims:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClaims();
    }, []);

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock className="text-yellow-500" size={20} />;
            case 'approved': return <CheckCircle className="text-green-500" size={20} />;
            case 'rejected': return <AlertCircle className="text-red-500" size={20} />;
            default: return <Clock className="text-gray-500" size={20} />;
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading claims...</div>;

    return (
        <div className="p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Claims</h1>
                <button 
                    onClick={() => window.location.href = '/file-claim'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    File New Claim
                </button>
            </div>

            {claims.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-lg">You haven't filed any claims yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Claim Number</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {claims.map((claim) => (
                                <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-blue-600">{claim.claim_number}</td>
                                    <td className="px-6 py-4 text-gray-700">{claim.claim_type}</td>
                                    <td className="px-6 py-4 text-gray-700">{claim.incident_date}</td>
                                    <td className="px-6 py-4 text-gray-700">${claim.amount_claimed}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(claim.status)}
                                            <span className="font-medium text-gray-800">{claim.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600">
                                            <ChevronRight size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClaimsList;
