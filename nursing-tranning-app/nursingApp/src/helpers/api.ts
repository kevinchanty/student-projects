import { showToast } from "stencil-lib/components/ion-toast";

const environment = process.env.NODE_ENV;
export let API_SERVER: any;
let origin = window.location.origin;
// if (environment === "development") {
//     API_SERVER = process.env.REACT_APP_NURSING_DEV_SERVER;
// } else if (environment === "production") {
//     API_SERVER = process.env.REACT_APP_NURSING_SERVER;
// }
if (origin === "http://localhost:3000" || origin === "http://localhost:8100") {
    API_SERVER = "http://localhost:3100";
} else {
    API_SERVER = "https://api.kevincty.com";
}

export async function post(url: string, body: any, contentType?: string) {
    let token = localStorage.getItem("token");
    let res: Response;

    try {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Bearer " + token);
        if (contentType) {
            headers.append("Content-Type", contentType);
        }
        res = await fetch(`${API_SERVER}` + url, {
            method: "POST",
            headers,
            body:
                contentType === "application/json"
                    ? JSON.stringify(body)
                    : body,
        });
    } catch (error) {
        console.error(`Failed to POST:`, url, error);
        showToast({
            message: (error as Error).toString(),
            duration: 3500,
        });
        return
    }
    let json;
    try {
        json = await res.json();
    } catch (error) {
        console.error(`Failed decode json, POST:`, url, error);
        showToast({
            message: (error as Error).toString(),
            duration: 3500,
        });
        return
    }
    if (json.error) {
        console.error(`Failed to POST API:`, url, json.error);
        showToast({
            message: json.error,
            duration: 3500,
        });
    }
    return json as any;
}

export async function get(url: string) {
    let token = localStorage.getItem("token");
    let res: Response;
    let json;
    try {
        res = await fetch(`${API_SERVER}` + url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    } catch (error) {
        console.error(`Failed to GET:`, url, error);
        showToast({
            message: (error as Error).toString(),
            duration: 3500,
        });
        throw error;
    }
    try {
        json = await res.json();
    } catch (error) {
        console.error(`Failed to GET:`, url, error);
        showToast({
            message: (error as Error).toString(),
            duration: 3500,
        });
        return { error };
    }
    if (json.error) {
        console.error(res.status, res.statusText, json.error);
        showToast({
            message: json.error,
            duration: 3500,
        });
    }
    return json;
}
