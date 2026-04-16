import { useAuthContext } from "../contexts/AuthContext";
import { apiGet, apiPost, apiPut, apiDelete, apiPostFormData } from "../services/apiClient";

export function useApiClient() {
  const { accessToken } = useAuthContext();

  return {
    get: (path) => apiGet(path, accessToken),
    post: (path, body) => apiPost(path, body, accessToken),
    put: (path, body) => apiPut(path, body, accessToken),
    delete: (path) => apiDelete(path, accessToken),
    postFormData: (path, formData) => apiPostFormData(path, formData, accessToken),
    
  };
}