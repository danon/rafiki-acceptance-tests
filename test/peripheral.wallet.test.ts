import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Wallet', () => {
  let dsl: Dsl;
  beforeEach(() => {
    dsl = new Dsl();
    dsl.actingAsNewUser('Mark');
  });
  test('New user has 0 money in his wallet', () => {
    dsl.assertWalletBalance(0);
  });
  test('Verified user can deposit into his wallet', () => {
    dsl.walletDeposit(10);
    dsl.assertWalletBalance(10);
  });
  test('Verified user can deposit multiple times', () => {
    dsl.walletDeposit(10);
    dsl.walletDeposit(20);
    dsl.assertWalletBalance(30);
  });
  test('User owner can list his transaction history', () => {
    dsl.walletDeposit(10);
    dsl.assertWalletTransactionsContains({type: 'deposit', amount: 10});
  });
  test('User can withdraw money using USDC blockchain address', () => {});
  test('User can withdraw money using USD bank details', () => {});
  test('User can withdraw money to a bank account; wallet goes down', () => {});
  test('User can withdraw money to USD bank account; mural call', () => {});
  test('User can withdraw money to ZAR bank account; mural call', () => {});
  test('User can withdraw money to EUR bank account; mural call', () => {});
});
