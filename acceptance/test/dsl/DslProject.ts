import {Dsl} from './Dsl';

export class DslProject {
  private projectName: string = 'Project';

  constructor(private dsl: Dsl) {}

  actingAsNewProjectOwner(userName: string): void {
    this.dsl.actingAsNewProjectOwner(this.projectName, userName);
  }

  actingAsNewProjectContributor(userName: string, ownerName: string = 'Owner'): void {
    this.dsl.actingAsNewProjectContributor(this.projectName, userName, ownerName);
  }

  addBill(billDescription: string): void {
    this.dsl.addBill(this.projectName, billDescription);
  }

  assertProjectContainsBill(billDescription: string): void {
    this.dsl.assertProjectContainsBill(this.projectName, billDescription);
  }

  inviteProjectContributor(userName: string): void {
    this.dsl.inviteProjectContributor(this.projectName, userName);
  }

  assertUserIsProjectMember(userName: string): void {
    this.dsl.assertUserIsProjectMember(userName, this.projectName);
  }

  actingAsNewProjectOwnerWithContributor(contributorName: string, ownerName: string): void {
    this.dsl.actingAsNewProjectOwnerWithContributor(this.projectName, contributorName, ownerName);
  }

  actingAsNewProjectOwnerWithContributors(contributorNames: string[]): void {
    this.dsl.actingAsNewProjectOwnerWithContributors(this.projectName, contributorNames);
  }

  removeProjectContributor(projectContributor: string): void {
    this.dsl.removeProjectContributor(this.projectName, projectContributor);
  }

  assertUserIsNotProjectMember(userName: string): void {
    this.dsl.assertUserIsNotProjectMember(userName, this.projectName);
  }

  addBillOnBehalf(billDescription: string, contributorName: string): void {
    this.dsl.addBillOnBehalf(this.projectName, billDescription, contributorName);
  }

  assertBillExists(billDescription: string): void {
    this.dsl.assertBillExists(this.projectName, billDescription);
  }

  assertBillNotExists(billDescription: string): void {
    this.dsl.assertBillNotExists(this.projectName, billDescription);
  }

  assertBillOwner(billDescription: string, contributorName: string): void {
    this.dsl.assertBillOwner(this.projectName, billDescription, contributorName);
  }

  addSealedBill(billDescription: string): void {
    this.dsl.addSealedBill(this.projectName, billDescription);
  }

  attemptRemoveBill(billDescription: string): void {
    this.dsl.attemptRemoveBill(this.projectName, billDescription);
  }

  assertBillEndAmount(billDescription: string, expectedEndAmount: number): void {
    this.dsl.assertBillEndAmount(this.projectName, billDescription, expectedEndAmount);
  }

  addBillRateFixed(billDescription: string, fixedAmount: number): void {
    this.dsl.addBillRateFixed(this.projectName, billDescription, fixedAmount);
  }

  addBillRateHourly(billDescription: string, hours: number, hourlyRate: number): void {
    this.dsl.addBillRateHourly(this.projectName, billDescription, hours, hourlyRate);
  }

  sealBill(billDescription: string): void {
    this.dsl.sealBill(this.projectName, billDescription);
  }

  assertBillSealed(billDescription: string): void {
    this.dsl.assertBillSealed(this.projectName, billDescription);
  }

  removeBill(billDescription: string): void {
    this.dsl.removeBill(this.projectName, billDescription);
  }

  addBillWithDate(billDescription: string, date: string) {
    this.dsl.addBillWithDate(this.projectName, billDescription, date);
  }

  updateBillDate(billDescription: string, date: string) {
    this.dsl.updateBillDate(this.projectName, billDescription, date);
  }

  assertBillDate(billDescription: string, expectedDate: string): void {
    this.dsl.assertBillDate(this.projectName, billDescription, expectedDate);
  }

  updateBillDescription(billDescription: string, updateBillDescription: string): void {
    this.dsl.updateBillDescription(this.projectName, billDescription, updateBillDescription);
  }

  actingAsUserAddBill(userName: string, billDescription: string): void {
    this.dsl.actingAsUserAddBill(userName, this.projectName, billDescription);
  }
}
