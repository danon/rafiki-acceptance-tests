import {Dsl} from './dsl/Dsl';
import {describe, test} from './playwright';

describe('Member support', () => {
  test('Project owner can add bill on behalf of contributor', async (dsl: Dsl) => {
    // given a project owner
    await dsl.project.actingAsNewProjectOwnerWithContributor('Contrib', 'Owner');
    // when he adds a bill on behalf of contributor
    await dsl.project.addBillOnBehalf('Exoskeleton', 'Contrib');
    // then the bill is created by the contributor
    await dsl.project.assertBillExists('Exoskeleton');
    await dsl.project.assertBillOwner('Exoskeleton', 'Contrib');
  });
  describe('Filter bills by member', () => {
    test('Include bills only by member', async (dsl: Dsl) => {
      // given
      await dsl.project.actingAsNewProjectOwnerWithContributors(['Contrib1', 'Contrib2']);
      await dsl.project.actingAsUserAddBill('Contrib1', 'First neural chip');
      await dsl.project.actingAsUserAddBill('Contrib2', 'Second neural chip');
      // when bills are filtered to include only the first contributors bill
      await dsl.filterBillsByMember('Contrib1');
      // then only the first contributors bill is present
      await dsl.project.assertBillExists('First neural chip');
      await dsl.project.assertBillNotExists('Second neural chip');
    });
    test('Exclude bills by member', async (dsl: Dsl) => {
      // given
      await dsl.project.actingAsNewProjectOwnerWithContributors(['Contrib1', 'Contrib2']);
      await dsl.project.actingAsUserAddBill('Contrib1', 'First ion engine');
      await dsl.project.actingAsUserAddBill('Contrib2', 'Second ion engine');
      // when bills are filtered to include only the first contributors bill
      await dsl.excludeBillsByMember('Contrib1');
      // then only the first contributors bill is present
      await dsl.project.assertBillNotExists('First ion engine');
      await dsl.project.assertBillExists('Second ion engine');
    });
  });
});
