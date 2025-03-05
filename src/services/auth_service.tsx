import api from "./api";

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error.response?.data?.error || "Erro ao fazer login";
  }
};
