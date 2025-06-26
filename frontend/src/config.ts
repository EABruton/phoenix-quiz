export const config = {
  // if the "||" backup is removed, jest will get angry that import.meta.env is not defined
  apiBaseURL:
    import.meta?.env?.VITE_API_BASE_URL || "http://localhost:4000/api",
};
