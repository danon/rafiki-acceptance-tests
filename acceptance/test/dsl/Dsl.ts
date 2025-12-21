import {assertEquals, assertFalse, assertTrue} from '../vitest';
import {WebPlaywrightDriver} from './client/WebPlaywrightDriver';
import {WebDriver} from './driver/WebDriver';
import {Driver} from './driver/Driver';
import {DslProject} from './DslProject';

export class Dsl {
  private driver: Driver = new WebDriver(new WebPlaywrightDriver());
  public project: DslProject = new DslProject(this);

  async actingAsNewProjectOwner(projectName: string, ownerName: string): Promise<void> {
    await this.driver.registerUserAndLogin(ownerName);
    await this.driver.createProject(projectName);
  }

  async actingAsNewProjectOwnerWithContributor(
    projectName: string,
    contributorName: string,
    ownerName: string,
  ): Promise<void> {
    await this.registerUserAndLogout(contributorName);
    await this.actingAsNewProjectOwner(projectName, ownerName);
    await this.driver.inviteProjectContributor(projectName, contributorName);
  }

  async actingAsNewProjectOwnerWithContributors(projectName: string, contributorNames: string[]): Promise<void> {
    for (const name of contributorNames) {
      await this.registerUserAndLogout(name);
    }
    await this.actingAsNewProjectOwner(projectName, 'Owner');
    for (const name of contributorNames) {
      await this.inviteProjectContributor(projectName, name);
    }
  }

  async actingAsNewProjectContributor(
    projectName: string,
    contributorName: string,
    ownerName: string = 'Owner',
  ): Promise<void> {
    await this.actingAsNewProjectOwnerWithContributor(projectName, contributorName, ownerName);
    await this.logoutAndLoginAs(contributorName);
  }

  private async registerUserAndLogout(userName: string): Promise<void> {
    await this.driver.registerUserAndLogin(userName);
    await this.driver.logoutUser();
  }

  private async logoutAndLoginAs(userName: string): Promise<void> {
    await this.driver.logoutUser();
    await this.driver.loginUser(userName);
  }

  async assertProjectExists(projectName: string): Promise<void> {
    assertTrue(await this.driver.projectExists(projectName));
  }

  async addBill(projectName: string, billDescription: string): Promise<void> {
    await this.driver.addBill(projectName, billDescription, '2000-01-01', 0);
  }

  async assertProjectContainsBill(projectName: string, billDescription: string): Promise<void> {
    assertTrue(await this.driver.projectContainsBill(projectName, billDescription));
  }

  async inviteProjectContributor(projectName: string, projectContributor: string): Promise<void> {
    await this.driver.inviteProjectContributor(projectName, projectContributor);
  }

  async assertUserIsProjectMember(userName: string, projectName: string): Promise<void> {
    assertTrue(await this.driver.isUserProjectMember(userName, projectName));
  }

  async assertUserIsNotProjectMember(userName: string, projectName: string): Promise<void> {
    assertFalse(await this.driver.isUserProjectMember(userName, projectName));
  }

  async removeProjectContributor(projectName: string, projectContributor: string): Promise<void> {
    await this.driver.removeProjectContributor(projectName, projectContributor);
  }

  async createUser(userName: string): Promise<void> {
    await this.registerUserAndLogout(userName);
  }

  async sealBill(projectName: string, billDescription: string): Promise<void> {
    await this.driver.sealBill(projectName, billDescription);
  }

  async addSealedBill(projectName: string, billDescription: string): Promise<void> {
    await this.driver.addBill(projectName, billDescription, '2000-01-01', 0);
    await this.driver.sealBill(projectName, billDescription);
  }

  async addBillWithDate(projectName: string, billDescription: string, date: string): Promise<void> {
    await this.driver.addBill(projectName, billDescription, date, 0);
  }

  async updateBillDate(projectName: string, billDescription: string, date: string): Promise<void> {
    await this.driver.updateBillDate(projectName, billDescription, date);
  }

  async updateBillDescription(projectName: string, billDescription: string, updatedBillDescription: string) {
    await this.driver.updateBillDescription(projectName, billDescription, updatedBillDescription);
  }

  async removeBill(projectName: string, billDescription: string): Promise<void> {
    await this.driver.removeBill(projectName, billDescription);
  }

  async attemptRemoveBill(projectName: string, billDescription: string): Promise<void> {
    await this.driver.attemptRemoveBill(projectName, billDescription);
  }

  async assertBillExists(projectName: string, billDescription: string): Promise<void> {
    assertTrue(await this.driver.projectContainsBill(projectName, billDescription));
  }

  async assertBillNotExists(projectName: string, billDescription: string): Promise<void> {
    assertFalse(await this.driver.projectContainsBill(projectName, billDescription));
  }

  async assertBillDate(projectName: string, billDescription: string, expectedDate: string): Promise<void> {
    assertEquals(expectedDate, await this.driver.findBillDate(projectName, billDescription));
  }

  async assertBillSealed(projectName: string, billDescription: string): Promise<void> {
    assertTrue(await this.driver.billSealed(projectName, billDescription));
  }

  // core.member-support

  async addBillOnBehalf(projectName: string, billDescription: string, contributorName: string): Promise<void> {
    await this.driver.addBillOnBehalf(projectName, billDescription, contributorName);
  }

  async assertBillOwner(projectName: string, billDescription: string, contributorName: string): Promise<void> {
    assertEquals(contributorName, await this.driver.findBillOwner(projectName, billDescription));
  }

  async addBillRateFixed(projectName: string, billDescription: string, fixedAmount: number): Promise<void> {
    await this.driver.addBill(projectName, billDescription, '2000-01-01', fixedAmount);
  }

  async addBillRateHourly(projectName: string, billDescription: string, hours: number, hourlyRate: number): Promise<void> {
    await this.driver.addBill(projectName, billDescription, '2000-01-01', hours * hourlyRate);
  }

  async assertBillEndAmount(projectName: string, billDescription: string, expectedEndAmount: number): Promise<void> {
    assertEquals(expectedEndAmount, await this.driver.findBillEndAmount(projectName, billDescription));
  }

  // core.bill-visibility

  async actingAsUser(userName: string): Promise<void> {
    await this.driver.logoutUser();
    await this.driver.loginUser(userName);
  }

  async actingAsUserAddBill(userName: string, projectName: string, billDescription: string): Promise<void> {
    await this.actingAsUser(userName);
    await this.addBill(projectName, billDescription);
  }

  async filterBillsByMember(userName: string): Promise<void> {
    await this.driver.filterBillsByMember(userName, true);
  }

  async excludeBillsByMember(userName: string): Promise<void> {
    await this.driver.filterBillsByMember(userName, false);
  }

  async actingAsNewUser(userName: string): Promise<void> {
    await this.driver.registerUserAndLogin(userName);
  }

  async assertWalletBalance(expectedBalance: number): Promise<void> {
    assertEquals(expectedBalance, await this.driver.findWalletBalance());
  }

  async walletDeposit(amount: number): Promise<void> {
    await this.driver.walletDeposit(amount);
  }

  async assertWalletTransactionsContains(expectedTransaction: DslTransaction): Promise<void> {
    assertEquals([expectedTransaction], await this.driver.listWalletTransactions());
  }
}

export interface DslTransaction {
  type: 'deposit',
  amount: number
}
