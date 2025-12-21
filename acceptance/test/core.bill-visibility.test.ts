import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill visibility', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project contributor cannot access end amount of not own bill', async () => {
    // given two contributors in a project
    await dsl.project.actingAsNewProjectOwnerWithContributors(['Contrib1', 'Contrib2']);
    // when the first contributor adds a bill
    await dsl.actingAsUser('Contrib1');
    await dsl.project.addBillRateFixed('Flux capacitor', 15);
    // then the second contributor cannot access the first contributors bill end amount
    await dsl.actingAsUser('Contrib2');
    await dsl.project.assertBillEndAmount('Flux capacitor', -1);
  });
  test('Project owner can access bill end amount of not own bill', async () => {
    // given a project with a contributor
    await dsl.project.actingAsNewProjectContributor('Contrib', 'Owner');
    // when contributor adds a bill
    await dsl.project.addBillRateFixed('Cryogenic pod', 15);
    // then the project owner can access the bill end amount
    await dsl.actingAsUser('Owner');
    await dsl.project.assertBillEndAmount('Cryogenic pod', 15);
  });
  test('Bill owner can access bill end amount of not own bill', async () => {
    // given a project contributor
    await dsl.project.actingAsNewProjectContributor('Contrib');
    // when contributor adds a bill
    await dsl.project.addBillRateFixed('Emp-rocket', 25);
    // then the contributor can access the bill end amount
    await dsl.project.assertBillEndAmount('Emp-rocket', 25);
  });
});
