import API from "./axios";

export const getQuotationPdf = async (id) => {
    try {
        const res = await API.get(`/invoice/${id}`, {
            responseType: 'blob',
        });
        return res;
    } catch (err) {
        if (err.response && err.response.status !== 401) {
            console.error("Error in fetching quotation pdf", err);
        }
        throw err;
    }
};