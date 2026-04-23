const API_BASE_URL = "http://localhost:8080";

async function parseResponse(response) {
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        if (typeof data == "string") {
            throw new Error(data || "Request failed");
        }
        throw new Error(data.message || "Request failed")
    }
    return data;
}

function buildUrl(path, queryParams = null) {
    if (!queryParams) {
        return `${API_BASE_URL}${path}`;
    }

    const params = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
            return;
        }

        params.append(key, String(value));
    });

    const queryString = params.toString();
    return queryString
        ? `${API_BASE_URL}${path}?${queryString}`
        : `${API_BASE_URL}${path}`;
}

export async function apiRequest(path, options = {}, accessToken = null, queryParams = null) {
    const headers = {
        ...(options.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    const response = await fetch(buildUrl(path, queryParams), {
        ...options,
        headers,
        credentials: "include",
    });

    return parseResponse(response);
}

export async function apiGet(path, accessToken = null, queryParams = null) {
    return apiRequest(path, { method: "GET" }, accessToken, queryParams);
}

export async function apiPost(path, body = undefined, accessToken = null) {
    const options = {
        method: "POST",
        headers: {},
    };

    if (body !== undefined && body != null) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    return apiRequest(path, options, accessToken);
}

export async function apiPut(path, body = undefined, accessToken = null) {
    const options = {
        method: "PUT",
        headers: {},
    };

    if (body !== undefined && body !== null) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    return apiRequest(path, options, accessToken);
}

export async function apiDelete(path, accessToken = null) {
    return apiRequest(path, { method: "DELETE"}, accessToken);
}

export async function apiPostFormData(path, formData, accessToken = null) {
    return apiRequest(
        path,
        {
            method: "POST",
            body: formData,
        },
        accessToken
    )
}

