import axios from "axios";

let axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => {
        if(response.status ===200){
            console.log("refeashed the access token")
        }
        return response
    },
    async (error) => {
        const originalRequest = error.config;

        console.log('Interceptor caught error:', error.response?.status);
        // If unauthorized and not already trying to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (originalRequest.url.includes(`/refresh-token`)) {
                return Promise.reject(error); // don't refresh again
            }

            originalRequest._retry = true; // prevent infinite loop
            try {
                await axiosInstance.get(`/refresh-token`);
                return axiosInstance(originalRequest); // retry original
            } catch (refreshError) {
                window.dispatchEvent(new CustomEvent('authError', {
                    detail: "Session expired, please login again"
                }));
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
