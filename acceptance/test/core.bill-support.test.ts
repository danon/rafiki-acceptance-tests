import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill support', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project owner can seal bills', async () => {
    // given a bill exists in a project
    await dsl.project.actingAsNewProjectOwner('Power ranger');
    await dsl.project.addBill('Install holographic projector');
    // when the project owner seals the bill
    await dsl.project.sealBill('Install holographic projector');
    // then the bill is sealed
    await dsl.project.assertBillSealed('Install holographic projector');
  });
  test('Bill owner can remove bill', async () => {
    // given an existing bill in a project
    await dsl.project.actingAsNewProjectOwner('Predator');
    await dsl.project.addBill('Cloaking device');
    // when the bill owner removes the bill
    await dsl.project.removeBill('Cloaking device');
    // then the bill is removed
    await dsl.project.assertBillNotExists('Cloaking device');
  });
  test('Bill owner cannot remove if bill is sealed', async () => {
    // given a sealed bill is added to a project
    await dsl.project.actingAsNewProjectOwner('Skywalker');
    await dsl.project.addSealedBill('Add tokamak reactor');
    // when the owner attempts to remove a sealed bill
    await dsl.project.attemptRemoveBill('Add tokamak reactor');
    // then the bills is not removed
    await dsl.project.assertBillExists('Add tokamak reactor');
  });
  test('Bill owner can update date', async () => {
    // given a bill with date is added to a project
    await dsl.project.actingAsNewProjectOwner('Shepard');
    await dsl.project.addBillWithDate('Plasma-gun', '1999-12-12');
    // when the bill owner updates the date of the bill
    await dsl.project.updateBillDate('Plasma-gun', '2025-01-01');
    // then the date is the updated date
    await dsl.project.assertBillDate('Plasma-gun', '2025-01-01');
  });
  test('Bill owner can edit description', async () => {
    // given a bill exists in a project
    await dsl.project.actingAsNewProjectOwner('Doctor');
    await dsl.project.addBill('Install sonic motor');
    // when the bill owner updates the bill description
    await dsl.project.updateBillDescription(
      'Install sonic motor',
      'Install sonic diesel-motor');
    // then the bill description is renamed
    await dsl.project.assertBillNotExists('Install sonic motor');
    await dsl.project.assertBillExists('Install sonic diesel-motor');
  });
});
