class PermissionChecker {
  currentUser;
  constructor(currentUser) {
    this.currentUser = currentUser;
  }

  get isAuthenticated() {
    return Boolean(this.currentUser);
  }
}

export default PermissionChecker;
