import {DslTransaction} from '../Dsl';

export interface Driver {
  // auth
  registerUserAndLogin(userName: string): void;

  logoutUser(): void;

  loginUser(userName: string): void;

  // core

  createProject(projectName: string): void;

  projectExists(projectName: string): boolean;

  addBill(projectName: string, billDescription: string, date: string, endAmount: number): void;

  projectContainsBill(projectName: string, billDescription: string): boolean;

  inviteProjectContributor(projectName: string, projectContributor: string): void;

  removeProjectContributor(projectName: string, projectContributor: string): void;

  isUserProjectMember(userName: string, projectName: string): boolean;

  // core.bill-support

  sealBill(projectName: string, billDescription: string): void;

  updateBillDate(projectName: string, billDescription: string, date: string): void;

  updateBillDescription(projectName: string, billDescription: string, updatedBillDescription: string): void;

  removeBill(projectName: string, billDescription: string): void;

  attemptRemoveBill(projectName: string, billDescription: string): void;

  findBillDate(projectName: string, billDescription: string): string;

  billSealed(projectName: string, billDescription: string): boolean;

  addBillOnBehalf(projectName: string, billDescription: string, contributorName: string): void;

  findBillOwner(projectName: string, billDescription: string): string;

  findBillEndAmount(projectName: string, billDescription: string): number;

  filterBillsByMember(userName: string, userIncluded: boolean): void;

  findWalletBalance(): number;

  walletDeposit(amount: number): void;

  listWalletTransactions(): DslTransaction[];
}
