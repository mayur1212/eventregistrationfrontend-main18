import API_BASE_URL from "../api";

const DEFAULT_AVATAR = "https://i.pravatar.cc/300";
const ADMIN_EMAILS = [
  "takkemayur456@gmail.com",
  "digambarmarathe.9@gmail.com",
  "digambarmarathe.380@gmail.com",
].map((email) => email.toLowerCase());

const cleanEmail = (value) => String(value || "").trim().toLowerCase();

const ensureLeadingSlash = (value) =>
  String(value || "").startsWith("/") ? String(value) : `/${value}`;

export const getBackendBaseUrl = () => API_BASE_URL.replace(/\/api\/?$/, "");

export const buildSafeUser = (rawUser = {}, token = "", fallbackEmail = "") => {
  const email = cleanEmail(rawUser?.email || fallbackEmail);
  const resolvedName =
    rawUser?.clientName || rawUser?.name || rawUser?.fullName || "User";
  const resolvedContact = rawUser?.contactNumber || rawUser?.phone || "";

  return {
    id: rawUser?.id || rawUser?._id || "",
    name: resolvedName,
    clientName: resolvedName,
    email,
    contactNumber: resolvedContact,
    role: ADMIN_EMAILS.includes(email) ? "admin" : "user",
    profileImg: rawUser?.profileImg || DEFAULT_AVATAR,
    token: rawUser?.token || token || "",
  };
};

export const getGoogleCallbackUrl = () => {
  const callbackPath = ensureLeadingSlash(
    process.env.REACT_APP_GOOGLE_CALLBACK_PATH || "/auth/google/callback"
  );
  return `${window.location.origin}${callbackPath}`;
};

export const getGoogleAuthUrl = () => {
  const configuredPath = process.env.REACT_APP_GOOGLE_AUTH_PATH || "/api/auth/google";
  const callbackUrl = getGoogleCallbackUrl();
  const params = new URLSearchParams({
    redirect: callbackUrl,
    redirect_uri: callbackUrl,
  });

  if (/^https?:\/\//i.test(configuredPath)) {
    const separator = configuredPath.includes("?") ? "&" : "?";
    return `${configuredPath}${separator}${params.toString()}`;
  }

  const authPath = ensureLeadingSlash(configuredPath);
  return `${getBackendBaseUrl()}${authPath}?${params.toString()}`;
};

export const startGoogleAuth = () => {
  window.location.assign(getGoogleAuthUrl());
};
