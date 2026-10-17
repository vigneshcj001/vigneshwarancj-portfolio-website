const DEFAULT_API_URL = "https://vigneshwarancj-portfolio-backend.onrender.com";

export const API_BASE_URL = (process.env.PORTFOLIO_API_URL || DEFAULT_API_URL).replace(/\/$/, "");

export const apiUrl = (path) => `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
