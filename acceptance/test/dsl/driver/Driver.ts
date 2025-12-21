import {DslTransaction} from '../Dsl';

export interface Driver {
  // auth
  registerUserAndLogin(userName: string): Promise<void>;

  logoutUser(): Promise<void>;

  loginUser(userName: string): Promise<void>;

  // core

  createProject(projectName: string): Promise<void>;

  projectExists(projectName: string): Promise<boolean>;

  addBill(projectName: string, billDescription: string, date: string, endAmount: number): Promise<void>;

  projectContainsBill(projectName: string, billDescription: string): Promise<boolean>;

  inviteProjectContributor(projectName: string, projectContributor: string): Promise<void>;

  removeProjectContributor(projectName: string, projectContributor: string): Promise<void>;

  isUserProjectMember(userName: string, projectName: string): Promise<boolean>;

  // core.bill-support

  sealBill(projectName: string, billDescription: string): Promise<void>;

  updateBillDate(projectName: string, billDescription: string, date: string): Promise<void>;

  updateBillDescription(projectName: string, billDescription: string, updatedBillDescription: string): Promise<void>;

  removeBill(projectName: string, billDescription: string): Promise<void>;

  attemptRemoveBill(projectName: string, billDescription: string): Promise<void>;

  findBillDate(projectName: string, billDescription: string): Promise<string>;

  billSealed(projectName: string, billDescription: string): Promise<boolean>;

  addBillOnBehalf(projectName: string, billDescription: string, contributorName: string): Promise<void>;

  findBillOwner(projectName: string, billDescription: string): Promise<string>;

  findBillEndAmount(projectName: string, billDescription: string): Promise<number>;

  filterBillsByMember(userName: string, userIncluded: boolean): Promise<void>;

  findWalletBalance(): Promise<number>;

  walletDeposit(amount: number): Promise<void>;

  listWalletTransactions(): Promise<DslTransaction[]>;
}
