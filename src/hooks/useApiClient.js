import { useMemo } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { apiGet, apiPost, apiPut, apiDelete, apiPostFormData } from "../services/apiClient";

export function useApiClient() {
  const { authedRequest } = useAuthContext();

  return useMemo(() => ({
    get: (path, queryParams) => authedRequest(token => apiGet(path, token, queryParams)),
    post: (path, body) => authedRequest(token => apiPost(path, body, token)),
    put: (path, body) => authedRequest(token => apiPut(path, body, token)),
    delete: (path) => authedRequest(token => apiDelete(path, token)),
    postFormData: (path, formData) => authedRequest(token => apiPostFormData(path, formData, token)),
  }), [authedRequest]);
}
