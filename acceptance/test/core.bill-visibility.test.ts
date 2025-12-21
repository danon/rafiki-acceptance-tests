import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill visibility', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project contributor cannot access end amount of not own bill', () => {
    // given two contributors in a project
    dsl.project.actingAsNewProjectOwnerWithContributors(['Contrib1', 'Contrib2']);
    // when the first contributor adds a bill
    dsl.actingAsUser('Contrib1');
    dsl.project.addBillRateFixed('Flux capacitor', 15);
    // then the second contributor cannot access the first contributors bill end amount
    dsl.actingAsUser('Contrib2');
    dsl.project.assertBillEndAmount('Flux capacitor', -1);
  });
  test('Project owner can access bill end amount of not own bill', () => {
    // given a project with a contributor
    dsl.project.actingAsNewProjectContributor('Contrib', 'Owner');
    // when contributor adds a bill
    dsl.project.addBillRateFixed('Cryogenic pod', 15);
    // then the project owner can access the bill end amount
    dsl.actingAsUser('Owner');
    dsl.project.assertBillEndAmount('Cryogenic pod', 15);
  });
  test('Bill owner can access bill end amount of not own bill', () => {
    // given a project contributor
    dsl.project.actingAsNewProjectContributor('Contrib');
    // when contributor adds a bill
    dsl.project.addBillRateFixed('Emp-rocket', 25);
    // then the contributor can access the bill end amount
    dsl.project.assertBillEndAmount('Emp-rocket', 25);
  });
});
