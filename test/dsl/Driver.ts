interface ProjectContributor {
  projectName: string;
  contributorName: string;
}

interface Bill {
  projectName: string;
  description: string;
  date: string;
  sealed: boolean;
  owner: string;
  endAmount: number;
}

type Predicate<T> = (argument: T) => boolean;

function billMatches(projectName: string, billDescription: string): Predicate<Bill> {
  return bill => bill.projectName === projectName
    && bill.description === billDescription;
}

export class Driver {
  private registeredUsers = new Set<string>();
  private projects = new Set<string>();
  private bills: Bill[] = [];
  private currentUser: string|null = null;
  private projectContributors: ProjectContributor[] = [];

  // auth

  registerUserAndLogin(userName: string): void {
    if (this.registeredUsers.has(userName)) {
      throw new Error('Failed to register a user, user already exists.');
    }
    this.registeredUsers.add(userName);
    this.loginUser(userName);
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

  // core

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

  projectExists(projectName: string): boolean {
    return this.projects.has(projectName);
  }

  addBill(projectName: string, billDescription: string, date: string, endAmount: number): void {
    if (this.currentUser === null) {
      throw new Error('Failed to add a bill, user not logged in.');
    }
    this.bills.push({
      projectName,
      description: billDescription,
      date,
      sealed: false,
      owner: this.currentUser,
      endAmount,
    });
  }

  projectContainsBill(projectName: string, billDescription: string): boolean {
    if (!this.projectExists(projectName)) {
      throw new Error('Failed to find bill of project, project does not exist.');
    }
    return !!this.findBillOptional(projectName, billDescription);
  }

  private findBillOptional(projectName: string, billDescription: string): Bill|null {
    const bill = this.bills.find(billMatches(projectName, billDescription));
    return bill || null;
  }

  private findBill(projectName: string, billDescription: string): Bill {
    const bill = this.findBillOptional(projectName, billDescription);
    if (!bill) {
      throw new Error('Failed to find project bill, bill does not exist.');
    }
    return bill;
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

  // core.bill-support

  sealBill(projectName: string, billDescription: string): void {
    const bill = this.findBill(projectName, billDescription);
    if (bill.sealed) {
      throw new Error('Failed to seal bill, bill already sealed.');
    }
    bill.sealed = true;
  }

  updateBillDate(projectName: string, billDescription: string, date: string): void {
    this.findBill(projectName, billDescription).date = date;
  }

  updateBillDescription(projectName: string, billDescription: string, updatedBillDescription: string): void {
    this.findBill(projectName, billDescription).description = updatedBillDescription;
  }

  removeBill(projectName: string, billDescription: string): void {
    const billIndex = this.bills.findIndex(billMatches(projectName, billDescription));
    this.bills.splice(billIndex, 1);
  }

  attemptRemoveBill(projectName: string, billDescription: string): void {
    // TODO does this step even make sense,
    // if the protocol does not allow something like that?
  }

  findBillDate(projectName: string, billDescription: string): string {
    return this.findBill(projectName, billDescription).date;
  }

  billSealed(projectName: string, billDescription: string): boolean {
    return this.findBill(projectName, billDescription).sealed;
  }

  addBillOnBehalf(projectName: string, billDescription: string, contributorName: string): void {
    if (!this.registeredUsers.has(contributorName)) {
      throw new Error('Failed to add bill on behalf of user, user does not exists.');
    }
    this.bills.push({
      projectName,
      description: billDescription,
      date: '2000-01-01',
      sealed: false,
      owner: contributorName,
      endAmount: 0,
    });
  }

  findBillOwner(projectName: string, billDescription: string): string {
    return this.findBill(projectName, billDescription).owner;
  }

  findBillEndAmount(projectName: string, billDescription: string): number {
    return this.findBill(projectName, billDescription).endAmount;
  }
}
