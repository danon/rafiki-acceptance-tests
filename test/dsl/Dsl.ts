import {assertEquals, assertFalse, assertTrue} from '../vitest';
import {Driver} from './Driver';

export class Dsl {
  private driver: Driver = new Driver();

  actingAsNewProjectOwner(projectName: string, ownerName: string): void {
    this.driver.registerUserAndLogin(ownerName);
    this.driver.createProject(projectName);
  }

  actingAsNewProjectOwnerWithContributor(projectName: string, contributorName: string, ownerName: string): void {
    this.registerUserAndLogout(contributorName);
    this.actingAsNewProjectOwner(projectName, ownerName);
    this.driver.inviteProjectContributor(projectName, contributorName);
  }

  actingAsNewProjectContributor(projectName: string, contributorName: string): void {
    this.actingAsNewProjectOwnerWithContributor(projectName, contributorName, 'Owner');
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

  createProject(projectName: string): void {
    this.driver.registerUserAndLogin('Owner');
    this.driver.createProject(projectName);
  }

  assertProjectExists(projectName: string): void {
    assertTrue(this.driver.projectExists(projectName));
  }

  addBill(projectName: string, billDescription: string): void {
    this.driver.addBill(projectName, billDescription, '2000-01-01');
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
    this.driver.addBill(projectName, billDescription, '2000-01-01');
    this.driver.sealBill(projectName, billDescription);
  }

  addBillWithDate(projectName: string, billDescription: string, date: string): void {
    this.driver.addBill(projectName, billDescription, date);
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
}
