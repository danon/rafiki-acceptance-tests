import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Member support', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project owner can add bill on behalf of contributor', () => {
    // given a project owner
    dsl.actingAsNewProjectOwnerWithContributor('Exoskeleton', 'Contrib', 'Owner');
    // when he adds a bill on behalf of contributor
    dsl.addBillOnBehalf('Exoskeleton', 'Bill', 'Contrib');
    // then the bill is created by the contributor
    dsl.assertBillExists('Exoskeleton', 'Bill');
    dsl.assertBillOwner('Exoskeleton', 'Bill', 'Contrib');
  });
  describe('Filter bills by member', () => {
    test('Include bills only by member', () => {
      // given
      dsl.actingAsNewProjectOwnerWithContributors('Neural chip', ['Contrib1', 'Contrib2']);
      dsl.actingAsUserAddBill('Contrib1', 'Neural chip', 'First');
      dsl.actingAsUserAddBill('Contrib2', 'Neural chip', 'Second');
      // when bills are filtered to include only the first contributors bill
      dsl.filterBillsByMember('Contrib1');
      // then only the first contributors bill is present
      dsl.assertBillExists('Neural chip', 'First');
      dsl.assertBillNotExists('Neural chip', 'Second');
    });
    test('Exclude bills by member', () => {
      // given
      dsl.actingAsNewProjectOwnerWithContributors('Ion engine', ['Contrib1', 'Contrib2']);
      dsl.actingAsUserAddBill('Contrib1', 'Ion engine', 'First');
      dsl.actingAsUserAddBill('Contrib2', 'Ion engine', 'Second');
      // when bills are filtered to include only the first contributors bill
      dsl.excludeBillsByMember('Contrib1');
      // then only the first contributors bill is present
      dsl.assertBillNotExists('Ion engine', 'First');
      dsl.assertBillExists('Ion engine', 'Second');
    });
  });
});
