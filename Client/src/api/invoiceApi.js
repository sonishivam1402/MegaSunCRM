import API from "./axios";

export const getQuotationPdf = async (id, type, triggerFrom) => {
    try {
        const res = await API.get(`/invoice/${id}`, {
            responseType: 'blob',
            params: {
                triggerFrom: triggerFrom,
                type: type
            }
        });
        return res;
    } catch (err) {
        if (err.response && err.response.status !== 401) {
            console.error("Error in fetching quotation pdf", err);
        }
        throw err;
    }
};