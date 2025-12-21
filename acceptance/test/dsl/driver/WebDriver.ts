import {WebPlaywrightDriver} from '../client/WebPlaywrightDriver';
import {DslTransaction} from '../Dsl';
import {functionCallerName} from './debug';
import {Driver} from './Driver';

export class WebDriver implements Driver {
  constructor(private driver: WebPlaywrightDriver) {}

  addBill(projectName: string, billDescription: string, date: string, endAmount: number): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  addBillOnBehalf(projectName: string, billDescription: string, contributorName: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  async attemptRemoveBill(projectName: string, billDescription: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  async billSealed(projectName: string, billDescription: string): Promise<boolean> {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  async createProject(projectName: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  async filterBillsByMember(userName: string, userIncluded: boolean): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  async findBillDate(projectName: string, billDescription: string): Promise<string> {
    throw new Error('Not implemented: ' + functionCallerName());
    return '';
  }

  async findBillEndAmount(projectName: string, billDescription: string): Promise<number> {
    throw new Error('Not implemented: ' + functionCallerName());
    return 0;
  }

  async findBillOwner(projectName: string, billDescription: string): Promise<string> {
    throw new Error('Not implemented: ' + functionCallerName());
    return '';
  }

  async findWalletBalance(): Promise<number> {
    throw new Error('Not implemented: ' + functionCallerName());
    return 0;
  }

  inviteProjectContributor(projectName: string, projectContributor: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  async isUserProjectMember(userName: string, projectName: string): Promise<boolean> {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  async listWalletTransactions(): Promise<DslTransaction[]> {
    throw new Error('Not implemented: ' + functionCallerName());
    return [];
  }

  loginUser(userName: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  logoutUser(): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  async projectContainsBill(projectName: string, billDescription: string): Promise<boolean> {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  async projectExists(projectName: string): Promise<boolean> {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  async registerUserAndLogin(userName: string): Promise<void> {
    await this.driver.fill('authUsername', userName);
    await this.driver.click('authRegister');
  }

  removeBill(projectName: string, billDescription: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  removeProjectContributor(projectName: string, projectContributor: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  sealBill(projectName: string, billDescription: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  updateBillDate(projectName: string, billDescription: string, date: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  updateBillDescription(projectName: string, billDescription: string, updatedBillDescription: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  walletDeposit(amount: number): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }
}
