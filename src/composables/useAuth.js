const AUTH_KEY = "auth_user";

export function getAuthUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setAuthUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearAuthUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return !!getAuthUser();
}

export function hasRole(roles) {
  const user = getAuthUser();
  if (!user) return false;
  if (!roles) return true;
  if (Array.isArray(roles)) return roles.includes(user.role);
  return user.role === roles;
}
