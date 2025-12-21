import {Dsl} from './dsl/Dsl';
import {describe, test} from './playwright';

describe('Project bills and members', () => {
  test('User can create a project', async (dsl: Dsl) => {
    await dsl.actingAsNewProjectOwner('Jetpack', 'Owner');
    await dsl.assertProjectExists('Jetpack');
  });
  test('Project owner can add a bill', async (dsl: Dsl) => {
    // given a project owner
    await dsl.project.actingAsNewProjectOwner('Owner');
    // when he adds a bill
    await dsl.project.addBill('Mount antigravity pads');
    // then the project contains the bill
    await dsl.project.assertProjectContainsBill('Mount antigravity pads');
  });
  test('Project owner can invite a project contributor', async (dsl: Dsl) => {
    // given a project owner and another user
    await dsl.createUser('George');
    await dsl.project.actingAsNewProjectOwner('Octavius');
    // when the owner invites the user to the project
    await dsl.project.inviteProjectContributor('George');
    // then he is the member of the project
    await dsl.project.assertUserIsProjectMember('George');
  });
  test('Project contributor can add a bill', async (dsl: Dsl) => {
    // given a user is a contributor in a project
    await dsl.project.actingAsNewProjectContributor('Scotty');
    // when he adds the bill
    await dsl.project.addBill('Install quantum-tunneling unit');
    // then the project contains the bill
    await dsl.project.assertProjectContainsBill('Install quantum-tunneling unit');
  });
  test('Project owner can remove a project contributor from a project', async (dsl: Dsl) => {
    // given a project contributor is a member of a project
    await dsl.project.actingAsNewProjectOwnerWithContributor('Steve', 'Owner');
    // when he is removed from a project
    await dsl.project.removeProjectContributor('Steve');
    // then he is not a member of the project
    await dsl.project.assertUserIsNotProjectMember('Steve');
  });
  test('Project owner is a project member', async (dsl: Dsl) => {
    // when user becomes a project owner
    await dsl.project.actingAsNewProjectOwner('Tony');
    // then he is a project member
    await dsl.project.assertUserIsProjectMember('Tony');
  });
});
