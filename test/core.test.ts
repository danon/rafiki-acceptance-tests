import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Project bills and members', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('User can create a project', () => {
    dsl.actingAsNewProjectOwner('Jetpack', 'Owner');
    dsl.assertProjectExists('Jetpack');
  });
  test('Project owner can add a bill', () => {
    // given a project owner
    dsl.project.actingAsNewProjectOwner('Owner');
    // when he adds a bill
    dsl.project.addBill('Mount antigravity pads');
    // then the project contains the bill
    dsl.project.assertProjectContainsBill('Mount antigravity pads');
  });
  test('Project owner can invite a project contributor', () => {
    // given a project owner and another user
    dsl.createUser('George');
    dsl.project.actingAsNewProjectOwner('Octavius');
    // when the owner invites the user to the project
    dsl.project.inviteProjectContributor('George');
    // then he is the member of the project
    dsl.project.assertUserIsProjectMember('George');
  });
  test('Project contributor can add a bill', () => {
    // given a user is a contributor in a project
    dsl.project.actingAsNewProjectContributor('Scotty');
    // when he adds the bill
    dsl.project.addBill('Install quantum-tunneling unit');
    // then the project contains the bill
    dsl.project.assertProjectContainsBill('Install quantum-tunneling unit');
  });
  test('Project owner can remove a project contributor from a project', () => {
    // given a project contributor is a member of a project
    dsl.project.actingAsNewProjectOwnerWithContributor('Steve', 'Owner');
    // when he is removed from a project
    dsl.project.removeProjectContributor('Steve');
    // then he is not a member of the project
    dsl.project.assertUserIsNotProjectMember('Steve');
  });
  test('Project owner is a project member', () => {
    // when user becomes a project owner
    dsl.project.actingAsNewProjectOwner('Tony');
    // then he is a project member
    dsl.project.assertUserIsProjectMember('Tony');
  });
});
