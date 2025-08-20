export const fetchWithAuth = async (url: string, options = { headers: {} }) => {
  const token = localStorage.getItem('token');
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, options);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
