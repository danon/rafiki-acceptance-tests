import {assertFalse, assertTrue} from '../vitest';
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
    this.driver.addBill(projectName, billDescription);
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
}
