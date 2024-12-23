import { ApiResponse } from "@/types/apiResponse";

export const handleApiResponse = <T>(response: Response, data: ApiResponse<T>): T => {
  if (!response.ok) {
    if (data.status === "Error" && data.data) {
      const errorMessages = typeof data.data === 'object' 
        ? Object.values(data.data).join('; ')
        : String(data.data);
      throw new Error(errorMessages || data.message || "Validation failed");
    }
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  if (data.status !== "Success" || !data.data) {
    throw new Error("Operation failed");
  }

  return data.data;
};