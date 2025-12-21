import {DslTransaction} from '../Dsl';
import {Driver} from './Driver';

export class WebDriver implements Driver {
  addBill(projectName: string, billDescription: string, date: string, endAmount: number): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  addBillOnBehalf(projectName: string, billDescription: string, contributorName: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  attemptRemoveBill(projectName: string, billDescription: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  billSealed(projectName: string, billDescription: string): boolean {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  createProject(projectName: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  filterBillsByMember(userName: string, userIncluded: boolean): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  findBillDate(projectName: string, billDescription: string): string {
    throw new Error('Not implemented: ' + functionCallerName());
    return '';
  }

  findBillEndAmount(projectName: string, billDescription: string): number {
    throw new Error('Not implemented: ' + functionCallerName());
    return 0;
  }

  findBillOwner(projectName: string, billDescription: string): string {
    throw new Error('Not implemented: ' + functionCallerName());
    return '';
  }

  findWalletBalance(): number {
    throw new Error('Not implemented: ' + functionCallerName());
    return 0;
  }

  inviteProjectContributor(projectName: string, projectContributor: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  isUserProjectMember(userName: string, projectName: string): boolean {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  listWalletTransactions(): DslTransaction[] {
    throw new Error('Not implemented: ' + functionCallerName());
    return [];
  }

  loginUser(userName: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  logoutUser(): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  projectContainsBill(projectName: string, billDescription: string): boolean {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  projectExists(projectName: string): boolean {
    throw new Error('Not implemented: ' + functionCallerName());
    return false;
  }

  registerUserAndLogin(userName: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  removeBill(projectName: string, billDescription: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  removeProjectContributor(projectName: string, projectContributor: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  sealBill(projectName: string, billDescription: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  updateBillDate(projectName: string, billDescription: string, date: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  updateBillDescription(projectName: string, billDescription: string, updatedBillDescription: string): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }

  walletDeposit(amount: number): void {
    throw new Error('Not implemented: ' + functionCallerName());
  }
}

function functionCallerName(): string {
  const error = new Error('dummy');
  return error.stack!
    .split('\n')[2]
    .replace(/^\s+at\s+(.+?)\s.+/g, '$1');
}
