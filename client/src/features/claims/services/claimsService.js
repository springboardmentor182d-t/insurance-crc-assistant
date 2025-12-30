import axios from 'axios';

const API_URL = 'http://localhost:8000/api/claims';

export const createClaim = async (claimData) => {
    const response = await axios.post(`${API_URL}/`, claimData);
    return response.data;
};

export const uploadDocument = async (claimId, file, docType) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_URL}/${claimId}/documents?doc_type=${docType}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getClaims = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};
