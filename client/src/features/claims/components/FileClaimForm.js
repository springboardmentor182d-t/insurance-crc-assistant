import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, Shield, FileText, Calendar, DollarSign } from 'lucide-react';
import { createClaim, uploadDocument } from '../services/claimsService';

const FileClaimForm = () => {
    const [step, setStep] = useState(1);
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedClaim, setSubmittedClaim] = useState(null);
    
    const [formData, setFormData] = useState({
        user_policy_id: 1, // Mocked for now
        claim_type: 'Vehicle Accident',
        incident_date: '2025-12-28',
        amount_claimed: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // 1. Create the claim
            const claim = await createClaim({
                ...formData,
                amount_claimed: parseFloat(formData.amount_claimed)
            });
            
            // 2. Upload documents if any
            for (const file of selectedFiles) {
                await uploadDocument(claim.id, file, 'General');
            }
            
            setSubmittedClaim(claim);
            setStep(3);
        } catch (error) {
            console.error('Error submitting claim:', error);
            alert('Failed to submit claim. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-10 bg-white shadow-md rounded-lg">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">File a Claim</h1>
                <p className="text-gray-500 text-lg mt-1">Submit your insurance claim in a few simple steps</p>
            </div>

            {/* Step Indicator */}
            <div className="flex border-b border-gray-200 mb-10">
                <div className={`py-3 px-4 border-b-2 transition-colors ${step === 1 ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500'}`}>
                    <span className="text-lg">Step 1: Claim Details</span>
                </div>
                <div className={`py-3 px-4 border-b-2 transition-colors ${step === 2 ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500'}`}>
                    <span className="text-lg">Step 2: Upload Documents</span>
                </div>
                <div className={`py-3 px-4 border-b-2 transition-colors ${step === 3 ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500'}`}>
                    <span className="text-lg">Step 3: Review & Submit</span>
                </div>
            </div>

            {step === 1 && (
                <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="col-span-2 space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Claim Details</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                            <select className="w-full p-3 border rounded-lg bg-gray-50" name="user_policy_id" value={formData.user_policy_id} onChange={handleInputChange}>
                                <option value={1}>POL-2024-A123B45</option>
                                <option value={2}>POL-2023-C678D90</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Claim Type</label>
                            <select className="w-full p-3 border rounded-lg bg-gray-50" name="claim_type" value={formData.claim_type} onChange={handleInputChange}>
                                <option>Vehicle Accident</option>
                                <option>Home Damage</option>
                                <option>Medical Emergency</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Incident</label>
                                <input type="date" className="w-full p-3 border rounded-lg bg-gray-50" name="incident_date" value={formData.incident_date} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Claim Amount ($)</label>
                                <input type="number" className="w-full p-3 border rounded-lg bg-gray-50" placeholder="e.g., 1500.00" name="amount_claimed" value={formData.amount_claimed} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea rows="4" className="w-full p-3 border rounded-lg bg-gray-50" placeholder="Describe the incident in detail..." name="description" value={formData.description} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setStep(2)} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Next Step</button>
                        </div>
                    </div>

                    <div className="col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Policy Summary</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Policy Name</p>
                                <p className="font-semibold text-gray-800">Comprehensive Vehicle Insurance</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Policy Number</p>
                                <p className="font-semibold text-gray-800">POL-2024-A123B45</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Coverage Amount</p>
                                <p className="font-semibold text-gray-800">$25,000</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Documents</h2>
                    <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-blue-400 transition-colors"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop files here
                        </p>
                        <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileSelect} />
                        <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG</p>
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="space-y-3">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-blue-500" />
                                        <span className="text-sm font-medium text-gray-700">{file.name}</span>
                                    </div>
                                    <button onClick={() => removeFile(index)} className="text-red-500 text-sm hover:underline">Remove</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between pt-6">
                        <button onClick={() => setStep(1)} className="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg">Back</button>
                        <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50">
                            {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && submittedClaim && (
                <div className="text-center py-10">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600 w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Claim Submitted Successfully!</h2>
                    <p className="text-gray-600 text-lg mb-8">Your claim number is <span className="font-bold text-blue-600">{submittedClaim.claim_number}</span>. We'll review it and get back to you soon.</p>
                    
                    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg border text-left space-y-4 mb-10">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Claim Type</span>
                            <span className="font-medium">{submittedClaim.claim_type}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Incident Date</span>
                            <span className="font-medium">{submittedClaim.incident_date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount Claimed</span>
                            <span className="font-medium">${submittedClaim.amount_claimed}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span className="text-blue-600 font-semibold">{submittedClaim.status}</span>
                        </div>
                    </div>

                    <button onClick={() => window.location.reload()} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                        File Another Claim
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileClaimForm;
