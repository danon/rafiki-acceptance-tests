import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill visibility', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project contributor cannot access end amount of not own bill', () => {
    // given two contributors in a project
    dsl.actingAsNewProjectOwnerWithContributors('Flux capacitor', ['Contrib1', 'Contrib2']);
    // when the first contributor adds a bill
    dsl.actingAsUser('Contrib1');
    dsl.addBillRateFixed('Flux capacitor', 'Bill', 15);
    // then the second contributor cannot access the first contributors bill end amount
    dsl.actingAsUser('Contrib2');
    dsl.assertBillEndAmount('Flux capacitor', 'Bill', -1);
  });
  test('Project owner can access bill end amount of not own bill', () => {
    // given a project with a contributor
    dsl.actingAsNewProjectContributor('Cryogenic pod', 'Contrib', 'Owner');
    // when contributor adds a bill
    dsl.addBillRateFixed('Cryogenic pod', 'Bill', 15);
    // then the project owner can access the bill end amount
    dsl.actingAsUser('Owner');
    dsl.assertBillEndAmount('Cryogenic pod', 'Bill', 15);
  });
  test('Bill owner can access bill end amount of not own bill', () => {
    // given a project contributor
    dsl.actingAsNewProjectContributor('Emp-rocket', 'Contrib');
    // when contributor adds a bill
    dsl.addBillRateFixed('Emp-rocket', 'Bill', 25);
    // then the contributor can access the bill end amount
    dsl.assertBillEndAmount('Emp-rocket', 'Bill', 25);
  });
});
