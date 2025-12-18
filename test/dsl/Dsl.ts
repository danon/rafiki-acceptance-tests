import {assertEquals, assertFalse, assertTrue} from '../vitest';
import {Driver} from './Driver';
import {DslProject} from './DslProject';

export class Dsl {
  private driver: Driver = new Driver();
  public project: DslProject = new DslProject(this);

  actingAsNewProjectOwner(projectName: string, ownerName: string): void {
    this.driver.registerUserAndLogin(ownerName);
    this.driver.createProject(projectName);
  }

  actingAsNewProjectOwnerWithContributor(projectName: string, contributorName: string, ownerName: string): void {
    this.registerUserAndLogout(contributorName);
    this.actingAsNewProjectOwner(projectName, ownerName);
    this.driver.inviteProjectContributor(projectName, contributorName);
  }

  actingAsNewProjectOwnerWithContributors(projectName: string, contributorNames: string[]): void {
    contributorNames.forEach(name => this.registerUserAndLogout(name));
    this.actingAsNewProjectOwner(projectName, 'Owner');
    contributorNames.forEach(name => this.inviteProjectContributor(projectName, name));
  }

  actingAsNewProjectContributor(projectName: string, contributorName: string, ownerName: string = 'Owner'): void {
    this.actingAsNewProjectOwnerWithContributor(projectName, contributorName, ownerName);
    this.logoutAndLoginAs(contributorName);
  }

  private registerUserAndLogout(userName: string): void {
    this.driver.registerUserAndLogin(userName);
    this.driver.logoutUser();
  }

  private logoutAndLoginAs(userName: string): void {
    this.driver.logoutUser();
    this.driver.loginUser(userName);
  }

  assertProjectExists(projectName: string): void {
    assertTrue(this.driver.projectExists(projectName));
  }

  addBill(projectName: string, billDescription: string): void {
    this.driver.addBill(projectName, billDescription, '2000-01-01', 0);
  }

  assertProjectContainsBill(projectName: string, billDescription: string): void {
    assertTrue(this.driver.projectContainsBill(projectName, billDescription));
  }

  inviteProjectContributor(projectName: string, projectContributor: string): void {
    this.driver.inviteProjectContributor(projectName, projectContributor);
  }

  assertUserIsProjectMember(userName: string, projectName: string): void {
    assertTrue(this.driver.isUserProjectMember(userName, projectName));
  }

  assertUserIsNotProjectMember(userName: string, projectName: string): void {
    assertFalse(this.driver.isUserProjectMember(userName, projectName));
  }

  removeProjectContributor(projectName: string, projectContributor: string): void {
    this.driver.removeProjectContributor(projectName, projectContributor);
  }

  createUser(userName: string): void {
    this.registerUserAndLogout(userName);
  }

  sealBill(projectName: string, billDescription: string): void {
    this.driver.sealBill(projectName, billDescription);
  }

  addSealedBill(projectName: string, billDescription: string): void {
    this.driver.addBill(projectName, billDescription, '2000-01-01', 0);
    this.driver.sealBill(projectName, billDescription);
  }

  addBillWithDate(projectName: string, billDescription: string, date: string): void {
    this.driver.addBill(projectName, billDescription, date, 0);
  }

  updateBillDate(projectName: string, billDescription: string, date: string): void {
    this.driver.updateBillDate(projectName, billDescription, date);
  }

  updateBillDescription(projectName: string, billDescription: string, updatedBillDescription: string) {
    this.driver.updateBillDescription(projectName, billDescription, updatedBillDescription);
  }

  removeBill(projectName: string, billDescription: string): void {
    this.driver.removeBill(projectName, billDescription);
  }

  attemptRemoveBill(projectName: string, billDescription: string): void {
    this.driver.attemptRemoveBill(projectName, billDescription);
  }

  assertBillExists(projectName: string, billDescription: string): void {
    assertTrue(this.driver.projectContainsBill(projectName, billDescription));
  }

  assertBillNotExists(projectName: string, billDescription: string): void {
    assertFalse(this.driver.projectContainsBill(projectName, billDescription));
  }

  assertBillDate(projectName: string, billDescription: string, expectedDate: string): void {
    assertEquals(expectedDate, this.driver.findBillDate(projectName, billDescription));
  }

  assertBillSealed(projectName: string, billDescription: string): void {
    assertTrue(this.driver.billSealed(projectName, billDescription));
  }

  // core.member-support

  addBillOnBehalf(projectName: string, billDescription: string, contributorName: string): void {
    this.driver.addBillOnBehalf(projectName, billDescription, contributorName);
  }

  assertBillOwner(projectName: string, billDescription: string, contributorName: string): void {
    assertEquals(contributorName, this.driver.findBillOwner(projectName, billDescription));
  }

  addBillRateFixed(projectName: string, billDescription: string, fixedAmount: number): void {
    this.driver.addBill(projectName, billDescription, '2000-01-01', fixedAmount);
  }

  addBillRateHourly(projectName: string, billDescription: string, hours: number, hourlyRate: number): void {
    this.driver.addBill(projectName, billDescription, '2000-01-01', hours * hourlyRate);
  }

  assertBillEndAmount(projectName: string, billDescription: string, expectedEndAmount: number): void {
    assertEquals(expectedEndAmount, this.driver.findBillEndAmount(projectName, billDescription));
  }

  // core.bill-visibility

  actingAsUser(userName: string): void {
    this.driver.logoutUser();
    this.driver.loginUser(userName);
  }

  actingAsUserAddBill(userName: string, projectName: string, billDescription: string): void {
    this.actingAsUser(userName);
    this.addBill(projectName, billDescription);
  }

  filterBillsByMember(userName: string): void {
    this.driver.filterBillsByMember(userName, true);
  }

  excludeBillsByMember(userName: string): void {
    this.driver.filterBillsByMember(userName, false);
  }

  actingAsNewUser(userName: string): void {
    this.driver.registerUserAndLogin(userName);
  }

  assertWalletBalance(expectedBalance: number): void {
    assertEquals(expectedBalance, this.driver.findWalletBalance());
  }

  walletDeposit(amount: number): void {
    this.driver.walletDeposit(amount);
  }

  assertWalletTransactionsContains(expectedTransaction: DslTransaction): void {
    assertEquals([expectedTransaction], this.driver.listWalletTransactions());
  }
}

export interface DslTransaction {
  type: 'deposit',
  amount: number
}
