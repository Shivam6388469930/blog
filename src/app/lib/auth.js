// Authentication utility functions

export const getUserAuth = () => {
  if (typeof window === "undefined") return null;
  
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");
  
  if (!token || !userName || !userEmail) return null;
  
  return {
    token,
    userName,
    userEmail,
    role: userRole || "user",
    isAuthenticated: true,
    isUser: true,
    isAdmin: false
  };
};

export const getAdminAuth = () => {
  if (typeof window === "undefined") return null;
  
  const token = localStorage.getItem("adminToken");
  const userName = localStorage.getItem("adminUserName");
  const userEmail = localStorage.getItem("adminUserEmail");
  const userRole = localStorage.getItem("adminRole");
  
  if (!token || !userName || !userEmail) return null;
  
  return {
    token,
    userName,
    userEmail,
    role: userRole || "admin",
    isAuthenticated: true,
    isUser: false,
    isAdmin: true
  };
};

export const getCurrentAuth = () => {
  const userAuth = getUserAuth();
  const adminAuth = getAdminAuth();
  
  // Admin takes precedence if both are present
  if (adminAuth) return adminAuth;
  if (userAuth) return userAuth;
  
  return null;
};

export const clearUserAuth = () => {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("Image");
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};

export const clearAdminAuth = () => {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("adminUserName");
  localStorage.removeItem("adminUserEmail");
  localStorage.removeItem("adminImage");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRole");
};

export const clearAllAuth = () => {
  clearUserAuth();
  clearAdminAuth();
};

export const isUserLoggedIn = () => {
  const auth = getUserAuth();
  return auth !== null;
};

export const isAdminLoggedIn = () => {
  const auth = getAdminAuth();
  return auth !== null;
};

export const requireUserAuth = (redirectTo = "/user/login") => {
  if (!isUserLoggedIn()) {
    if (typeof window !== "undefined") {
      window.location.href = redirectTo;
    }
    return false;
  }
  return true;
};

export const requireAdminAuth = (redirectTo = "/admin/adminlogin") => {
  if (!isAdminLoggedIn()) {
    if (typeof window !== "undefined") {
      window.location.href = redirectTo;
    }
    return false;
  }
  return true;
};
