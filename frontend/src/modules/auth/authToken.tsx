class authToken {
  static set(token) {
    localStorage.setItem("token", token || null);
  }

  static get() {
    return localStorage.getItem("token") || null;
  }
}
export default authToken;
