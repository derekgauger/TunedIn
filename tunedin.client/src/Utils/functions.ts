import { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction;

export function getUnixTime(): number {
  return Math.floor(Date.now() / 1000);
}

export function parsePhoneNumber(phone: string): string {
  const match = phone.match(/\d+/g);
  return match ? match.join("") : "";
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const checkTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const isTokenExpired = tokenPayload.exp * 1000 < Date.now();
  return isTokenExpired;
};

export const initializeNavigation = (navigationFunction: NavigateFunction) => {
  navigate = navigationFunction;
};

export const handleNavigation = (
  path: string,
  options?: {
    replace?: boolean;
    scroll?: boolean;
    state?: any;
  }
) => {
  if (!navigate) {
    console.warn(
      "Navigation not initialized. Please call initializeNavigation first."
    );
    return;
  }

  const { replace = false, scroll = true, state = undefined } = options || {};

  navigate(path, { replace, state });

  if (scroll) {
    // Small delay to ensure navigation has started
    setTimeout(() => scrollToTop(), 0);
  }
};
