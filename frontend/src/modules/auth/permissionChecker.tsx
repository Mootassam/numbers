class PermissionChecker {
  currentUser;
  constructor(currentUser) {
    this.currentUser = currentUser;
  }

  get isAuthenticated() {
    return false;
  }
}

export default PermissionChecker
