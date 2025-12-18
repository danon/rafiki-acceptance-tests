import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Member support', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project owner can add bill on behalf of contributor', () => {
    // given a project owner
    dsl.project.actingAsNewProjectOwnerWithContributor('Contrib', 'Owner');
    // when he adds a bill on behalf of contributor
    dsl.project.addBillOnBehalf('Exoskeleton', 'Contrib');
    // then the bill is created by the contributor
    dsl.project.assertBillExists('Exoskeleton');
    dsl.project.assertBillOwner('Exoskeleton', 'Contrib');
  });
  describe('Filter bills by member', () => {
    test('Include bills only by member', () => {
      // given
      dsl.project.actingAsNewProjectOwnerWithContributors(['Contrib1', 'Contrib2']);
      dsl.project.actingAsUserAddBill('Contrib1', 'First neural chip');
      dsl.project.actingAsUserAddBill('Contrib2', 'Second neural chip');
      // when bills are filtered to include only the first contributors bill
      dsl.filterBillsByMember('Contrib1');
      // then only the first contributors bill is present
      dsl.project.assertBillExists('First neural chip');
      dsl.project.assertBillNotExists('Second neural chip');
    });
    test('Exclude bills by member', () => {
      // given
      dsl.project.actingAsNewProjectOwnerWithContributors(['Contrib1', 'Contrib2']);
      dsl.project.actingAsUserAddBill('Contrib1', 'First ion engine');
      dsl.project.actingAsUserAddBill('Contrib2', 'Second ion engine');
      // when bills are filtered to include only the first contributors bill
      dsl.excludeBillsByMember('Contrib1');
      // then only the first contributors bill is present
      dsl.project.assertBillNotExists('First ion engine');
      dsl.project.assertBillExists('Second ion engine');
    });
  });
});
