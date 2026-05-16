const TOKEN_KEY = "adminToken";

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const getAdminToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAdminToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAdminToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
