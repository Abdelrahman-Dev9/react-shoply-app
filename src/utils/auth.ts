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

const USER_ID_KEY = "adminId";

export const setAdminId = (id: string) => {
  localStorage.setItem(USER_ID_KEY, id);
};

export const getAdminId = (): string | null => {
  return localStorage.getItem(USER_ID_KEY);
};

export const removeAdminId = () => {
  localStorage.removeItem(USER_ID_KEY);
};
