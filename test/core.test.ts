import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Project bills and members', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project owner can creates a project', () => {
    dsl.actingAsNewProjectOwner('Jetpack', 'Owner');
    dsl.assertProjectExists('Jetpack');
  });
  test('Project owner can add a bill', () => {
    // given a project owner
    dsl.actingAsNewProjectOwner('Hoverboard', 'Marty');
    // when he adds a bill
    dsl.addBill('Hoverboard', 'Mount antigravity pads');
    // then the project contains the bill
    dsl.assertProjectContainsBill('Hoverboard', 'Mount antigravity pads');
  });
  test('Project owner can invite a project contributor', () => {
    // given a project owner and another user
    dsl.createUser('George');
    dsl.actingAsNewProjectOwner('Bionic limbs', 'Octavius');
    // when the owner invites the user to the project
    dsl.inviteProjectContributor('Bionic limbs', 'George');
    // then he is the member of the project
    dsl.assertUserIsProjectMember('George', 'Bionic limbs');
  });
  test('Project contributor can add a bill', () => {
    // given a user is a contributor in a project
    dsl.actingAsNewProjectContributor('Teleporter', 'Scotty');
    // when he adds the bill
    dsl.addBill('Teleporter', 'Install quantum-tunneling unit');
    // then the project contains the bill
    dsl.assertProjectContainsBill('Teleporter', 'Install quantum-tunneling unit');
  });
  test('Project owner can remove a project contributor from a project', () => {
    // given a project contributor is a member of a project
    dsl.actingAsNewProjectOwnerWithContributor('Nanobots', 'Steve', 'Owner');
    // when he is removed from a project
    dsl.removeProjectContributor('Nanobots', 'Steve');
    // then he is not a member of the project
    dsl.assertUserIsNotProjectMember('Steve', 'Nanobots');
  });
  test('Project owner is a project member', () => {
    // when user becomes a project owner
    dsl.actingAsNewProjectOwner('Fusion battery', 'Tony');
    // then he is a project member
    dsl.assertUserIsProjectMember('Tony', 'Fusion battery');
  });
});
