import {Dsl} from './Dsl';

export class DslProject {
  private projectName: string = 'Project';

  constructor(private dsl: Dsl) {}

  async actingAsNewProjectOwner(userName: string): Promise<void> {
    await this.dsl.actingAsNewProjectOwner(this.projectName, userName);
  }

  async actingAsNewProjectContributor(userName: string, ownerName: string = 'Owner'): Promise<void> {
    await this.dsl.actingAsNewProjectContributor(this.projectName, userName, ownerName);
  }

  async addBill(billDescription: string): Promise<void> {
    await this.dsl.addBill(this.projectName, billDescription);
  }

  async assertProjectContainsBill(billDescription: string): Promise<void> {
    await this.dsl.assertProjectContainsBill(this.projectName, billDescription);
  }

  async inviteProjectContributor(userName: string): Promise<void> {
    await this.dsl.inviteProjectContributor(this.projectName, userName);
  }

  async assertUserIsProjectMember(userName: string): Promise<void> {
    await this.dsl.assertUserIsProjectMember(userName, this.projectName);
  }

  async actingAsNewProjectOwnerWithContributor(contributorName: string, ownerName: string): Promise<void> {
    await this.dsl.actingAsNewProjectOwnerWithContributor(this.projectName, contributorName, ownerName);
  }

  async actingAsNewProjectOwnerWithContributors(contributorNames: string[]): Promise<void> {
    await this.dsl.actingAsNewProjectOwnerWithContributors(this.projectName, contributorNames);
  }

  async removeProjectContributor(projectContributor: string): Promise<void> {
    await this.dsl.removeProjectContributor(this.projectName, projectContributor);
  }

  async assertUserIsNotProjectMember(userName: string): Promise<void> {
    await this.dsl.assertUserIsNotProjectMember(userName, this.projectName);
  }

  async addBillOnBehalf(billDescription: string, contributorName: string): Promise<void> {
    await this.dsl.addBillOnBehalf(this.projectName, billDescription, contributorName);
  }

  async assertBillExists(billDescription: string): Promise<void> {
    await this.dsl.assertBillExists(this.projectName, billDescription);
  }

  async assertBillNotExists(billDescription: string): Promise<void> {
    await this.dsl.assertBillNotExists(this.projectName, billDescription);
  }

  async assertBillOwner(billDescription: string, contributorName: string): Promise<void> {
    await this.dsl.assertBillOwner(this.projectName, billDescription, contributorName);
  }

  async addSealedBill(billDescription: string): Promise<void> {
    await this.dsl.addSealedBill(this.projectName, billDescription);
  }

  async attemptRemoveBill(billDescription: string): Promise<void> {
    await this.dsl.attemptRemoveBill(this.projectName, billDescription);
  }

  async assertBillEndAmount(billDescription: string, expectedEndAmount: number): Promise<void> {
    await this.dsl.assertBillEndAmount(this.projectName, billDescription, expectedEndAmount);
  }

  async addBillRateFixed(billDescription: string, fixedAmount: number): Promise<void> {
    await this.dsl.addBillRateFixed(this.projectName, billDescription, fixedAmount);
  }

  async addBillRateHourly(billDescription: string, hours: number, hourlyRate: number): Promise<void> {
    await this.dsl.addBillRateHourly(this.projectName, billDescription, hours, hourlyRate);
  }

  async sealBill(billDescription: string): Promise<void> {
    await this.dsl.sealBill(this.projectName, billDescription);
  }

  async assertBillSealed(billDescription: string): Promise<void> {
    await this.dsl.assertBillSealed(this.projectName, billDescription);
  }

  async removeBill(billDescription: string): Promise<void> {
    await this.dsl.removeBill(this.projectName, billDescription);
  }

  async addBillWithDate(billDescription: string, date: string): Promise<void> {
    await this.dsl.addBillWithDate(this.projectName, billDescription, date);
  }

  async updateBillDate(billDescription: string, date: string): Promise<void> {
    await this.dsl.updateBillDate(this.projectName, billDescription, date);
  }

  async assertBillDate(billDescription: string, expectedDate: string): Promise<void> {
    await this.dsl.assertBillDate(this.projectName, billDescription, expectedDate);
  }

  async updateBillDescription(billDescription: string, updateBillDescription: string): Promise<void> {
    await this.dsl.updateBillDescription(this.projectName, billDescription, updateBillDescription);
  }

  async actingAsUserAddBill(userName: string, billDescription: string): Promise<void> {
    await this.dsl.actingAsUserAddBill(userName, this.projectName, billDescription);
  }
}
