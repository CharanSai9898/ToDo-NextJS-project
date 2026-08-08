const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token || "",
    },
  });

  if (response.status === 401) {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  return response.json();
};

export default apiFetch;
