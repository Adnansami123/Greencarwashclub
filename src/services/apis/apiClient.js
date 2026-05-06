import axios from "axios";
import CryptoJS from "crypto-js";
//const https = require('https');

const KEY = "12345678901234567890123456789012";
const IV = "Y123456789012345";

export const baseURL = `${process.env.REACT_APP_API_BASEURL}/`;



// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });


console.log("baseURL" + baseURL);
const apiClient = axios.create({
    baseURL: baseURL,
    // timeout: 30000,
    timeout: 0,
});


// Encrypt
const encrypt = (data) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();
    return encrypted;
};

const decrypt = (encrypted) => {
    if (!encrypted?.data) {
        console.error("Encrypted payload missing:", encrypted);
        return null;
    }

    //console.log("Encrypted incoming:", encrypted.data);

    // Base64Url → Base64
    let base64 = encrypted.data.replace(/-/g, "+").replace(/_/g, "/");

    // Add missing Base64 padding
    const padding = base64.length % 4;
    if (padding) {
        base64 += "=".repeat(4 - padding);
    }

    // Convert Base64 string to WordArray
    const encryptedWordArray = CryptoJS.enc.Base64.parse(base64);
    // console.log("WordArray:", encryptedWordArray);

    // AES decrypt
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedWordArray },
        CryptoJS.enc.Utf8.parse(KEY),
        {
            iv: CryptoJS.enc.Utf8.parse(IV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    // Convert decrypted WordArray to UTF-8 string
    let utf8 = CryptoJS.enc.Utf8.stringify(decrypted)
        .replace(/\0/g, "")  // remove null padding bytes
        .trim();

    // console.log("UTF8 decrypted string:", utf8);

    // Convert to object
    try {
        return JSON.parse(utf8);
    } catch (error) {
        console.error("JSON Parse error:", error, utf8);
        return utf8; // return raw string if JSON fails
    }
};


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const usertype = localStorage.getItem("usertype");

    const isSessionExpired = sessionStorage.getItem("isSesssionExpired") || null;

    config.body = { body: config.body };
    config.query = { query: config.query };
    if (!!token) {
        config.headers["Authorization"] = `Bearer ${token}`

        if (isSessionExpired !== null) {
            sessionStorage.removeItem("isSessionExpired");
        }
    }

    return config;

});

apiClient.interceptors.response.use(

    function (response) {


        const res = { ...response };
        console.log("decrypt-2", response?.status)
        // console.log("clean decrypted text:", res);
        if (response?.statusCode === 400) {
            return response.data;
        }
        else if (typeof response?.data?.data === "string") {
            //  console.log("clean decrypted text:", res);
            //   console.log("clean decrypted text:", response.data?.data);
            const d = decrypt({ data: response.data?.data });
            //  console.log("clean decrypted text:", d);

            if (d) {
                res.data = d;
            }
            // console.log("JSON Parse error:", res);
            response = res.data;
            // console.log("JSON Parse error:", response);
        }
        else {
            return response.data;
        }


        return response;
    },

    function ({ response }) {

        //  console.log("decrypt-2")
        // const res = { ...response.data };
        console.log("decrypt-2", response)
        // response.data = res;
        const res = { ...response.data };
        if (response?.statusCode === 400) {
            return response.data;
        }
        else if (typeof response.data?.data === "string") {
            const d = decrypt({ data: response.data?.data });
            if (d) {
                res.data = d;
            }

            response.data = res;
            // console.error("JSON Parse error:", res);
            response.data.data = res;
            // console.error("JSON Parse error:", response);
        }
        else if (response?.data?.message === "Unauthorized") {
            //  window.location.replace("/404");
            window.location.replace("/SessionExpired");
            return sessionStorage.setItem("isSessionExpired", true);

        }
        else if (response?.message === "Forbidden") {
            window.location.replace("/404");
            return sessionStorage.setItem("isSessionExpired", true);
        }
        else {
            return response.data;
        }



        if (response?.message === "Unauthorized" && response?.statusCode === "401") {
            //  window.location.replace("/404");
            return sessionStorage.setItem("isSessionExpired", true);
        }

        else if (response?.message === "Forbidden" && response?.statusCode === "403") {
            window.location.replace("/404");
            return sessionStorage.setItem("isSessionExpired", true);
        }

        return response;
    },
    // ✅ ERROR HANDLER
    function (error) {

        const { response } = error;

        if (!response) {
            return Promise.reject(error);
        }

        // 🔥 401 Unauthorized
        if (response.statusCode === 401) {

            sessionStorage.setItem("isSessionExpired", "true");

            // Redirect to login
            window.location.replace("/login");

            return Promise.reject(error);
        }

        // 🔥 403 Forbidden
        if (response.statusCode === 403) {

            sessionStorage.setItem("isSessionExpired", "true");

            window.location.replace("/404");

            return Promise.reject(error);
        }

        // 400 Handling
        if (response.statusCode === 400) {
            return Promise.reject(response.data);
        }

        return Promise.reject(error);
    }
);

export { apiClient };