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
