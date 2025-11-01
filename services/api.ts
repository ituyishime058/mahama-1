import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper to get the token from local storage
const getToken = () => localStorage.getItem('authToken');

// Create an Axios instance that will be used for all API calls
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to automatically add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- AUTHENTICATION ---
export const login = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  return response.data;
};

export const register = (userData: any) => api.post('/auth/register', userData);

export const getCurrentUser = async () => {
    if (!getToken()) {
        return Promise.resolve(null);
    }
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('authToken'); // Token might be invalid
        return Promise.resolve(null);
    }
};


// --- ARTICLES & CONTENT ---
export const getArticles = () => api.get('/articles');
export const getArticle = (id: string | number) => api.get(`/articles/${id}`);
export const getCategories = () => api.get('/categories');
export const getTags = () => api.get('/tags');
export const getPodcasts = () => api.get('/podcasts');
export const getStreamingContent = () => api.get('/streaming');

// --- ADS ---
// For public-facing ad display
export const getActiveAds = () => api.get('/ads');

// --- COMMENTS ---
export const getCommentsForArticle = (articleId: string | number) => api.get(`/comments/article/${articleId}`);
export const postComment = (commentData: any) => api.post('/comments', commentData);

// --- SEARCH ---
export const search = (query: string, filter?: string, sort?: string) => {
  return api.get('/search', { params: { query, filter, sort } });
};

// --- AI SERVICES ---
export const summarizeText = (text: string, options?: any) => api.post('/ai/summarize', { text, ...options });
export const explainText = (text: string, options?: any) => api.post('/ai/explain', { text, ...options });
export const getCounterpoints = (topic: string, options?: any) => api.post('/ai/counterpoints', { topic, ...options });
export const generateQuiz = (text: string, options?: any) => api.post('/ai/quiz', { text, ...options });
export const getTopicDeepDive = (topic: string) => api.post('/ai/deep-dive', { topic });
export const factCheck = (claim: string) => api.post('/ai/fact-check', { claim });


// --- ADMIN PANEL ---

// Dashboard
export const getAdminDashboardAnalytics = () => api.get('/admin/dashboard/analytics');

// User Management
export const getAdminUsers = () => api.get('/admin/users');
export const updateAdminUserRole = (userId: string, role: string) => api.put(`/admin/users/${userId}/role`, { role });
export const deleteAdminUser = (userId: string) => api.delete(`/admin/users/${userId}`);

// Ad Management
export const getAdminAds = () => api.get('/admin/ads/all'); // Fetch all ads for the admin panel
export const createAdminAd = (adData: any) => api.post('/admin/ads', adData);
export const updateAdminAd = (adId: string, adData: any) => api.put(`/admin/ads/${adId}`, adData);
export const deleteAdminAd = (adId: string) => api.delete(`/admin/ads/${adId}`);

// Article Management (Admin)
export const getAdminArticles = () => api.get('/admin/articles'); // Assuming an admin route for articles
export const approveAdminArticle = (articleId: string) => api.put(`/admin/articles/${articleId}/approve`);
export const createArticle = (articleData: any) => api.post('/articles', articleData);
export const updateArticle = (articleId: string, articleData: any) => api.put(`/articles/${articleId}`, articleData);


// --- NOTIFICATIONS ---
export const getNotifications = () => api.get('/notifications');
