const config = {
    local: {
        api: {
            baseUrl: "http://localhost:2345/api",
        }
    },
    prod: {
        api: {
            baseUrl: "https://smart-hire-api.onrender.com/api",
        }
    }
};

const env = process.env.REACT_APP_STAGE || "local";

export default config[env];
