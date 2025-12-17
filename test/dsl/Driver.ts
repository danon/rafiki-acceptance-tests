interface ProjectContributor {
  projectName: string;
  contributorName: string;
}

export class Driver {
  private registeredUsers = new Set<string>();
  private projects = new Set<string>();
  private bills = new Map<string, string[]>();
  private currentUser: string|null = null;
  private projectContributors: ProjectContributor[] = [];

  registerUserAndLogin(userName: string): void {
    if (this.registeredUsers.has(userName)) {
      throw new Error('Failed to register a user, user already exists.');
    }
    this.registeredUsers.add(userName);
    this.loginUser(userName);
  }

  createProject(projectName: string): void {
    if (this.projects.has(projectName)) {
      throw new Error('Failed to create a project, project already exists.');
    }
    if (this.currentUser === null) {
      throw new Error('Failed to create a project, user not logged in.');
    }
    this.projects.add(projectName);
    this.inviteProjectContributor(projectName, this.currentUser);
  }

  logoutUser(): void {
    if (this.currentUser === null) {
      throw new Error('Failed to logout user, user is not logged in.');
    }
    this.currentUser = null;
  }

  loginUser(userName: string) {
    if (this.currentUser !== null) {
      throw new Error('Failed to login a user, other user is already logged in.');
    }
    this.currentUser = userName;
  }

  projectExists(projectName: string): boolean {
    return this.projects.has(projectName);
  }

  addBill(projectName: string, billDescription: string): void {
    if (!this.bills.has(projectName)) {
      this.bills.set(projectName, []);
    }
    this.bills.get(projectName)!.push(billDescription);
  }

  projectContainsBill(projectName: string, billDescription: string): boolean {
    if (!this.projectExists(projectName)) {
      throw new Error('Failed to find bill of project, project does not ');
    }
    const bills = this.bills.get(projectName) || [];
    return bills.includes(billDescription);
  }

  inviteProjectContributor(projectName: string, projectContributor: string) {
    this.projectContributors.push({projectName, contributorName: projectContributor});
  }

  removeProjectContributor(projectName: string, projectContributor: string): void {
    this.projectContributors = this.projectContributors.filter(pc => {
      return pc.projectName !== projectName || pc.contributorName !== projectContributor;
    });
  }

  isUserProjectMember(userName: string, projectName: string): boolean {
    const existing = this.projectContributors.filter(pc => {
      return pc.projectName === projectName && pc.contributorName === userName;
    });
    return existing.length > 0;
  }
}
