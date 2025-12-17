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
  test('filter/exclude bills by member; assert filtered', () => {
    // TODO implement filtering and excluding
  });
});
