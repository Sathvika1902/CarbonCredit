const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchData = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: options.body ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API request failed");
        }

        return await response.json();
    } catch (error) {
        console.error("API fetch error:", error.message);
        return null;
    }
};
