import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill support', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project owner can seal bills', () => {
    // given a bill exists in a project
    dsl.actingAsNewProjectOwner('Hologram', 'Power ranger');
    dsl.addBill('Hologram', 'Install holographic projector');
    // when the project owner seals the bill
    dsl.sealBill('Hologram', 'Install holographic projector');
    // then the bill is sealed
    dsl.assertBillSealed('Hologram', 'Install holographic projector');
  });
  test('Bill owner can remove bill', () => {
    // given an existing bill in a project
    dsl.actingAsNewProjectOwner('Cloaking device', 'Predator');
    dsl.addBill('Cloaking device', 'Add light bending');
    // when the bill owner removes the bill
    dsl.removeBill('Cloaking device', 'Add light bending');
    // then the bill is removed
    dsl.assertBillNotExists('Cloaking device', 'Add light bending');
  });
  test('Bill owner cannot remove if bill is sealed', () => {
    // given a sealed bill is added to a project
    dsl.actingAsNewProjectOwner('Lightsaber', 'Skywalker');
    dsl.addSealedBill('Lightsaber', 'Add tokamak reactor');
    // when the owner attempts to remove a sealed bill
    dsl.attemptRemoveBill('Lightsaber', 'Add tokamak reactor');
    // then the bills is not removed
    dsl.assertBillExists('Lightsaber', 'Add tokamak reactor');
  });
  test('Bill owner can update date', () => {
    // given a bill with date is added to a project
    dsl.actingAsNewProjectOwner('Plasma-gun', 'Shepard');
    dsl.addBillWithDate('Plasma-gun', 'Bill', '1999-12-12');
    // when the bill owner updates the date of the bill
    dsl.updateBillDate('Plasma-gun', 'Bill', '2025-01-01');
    // then
    dsl.assertBillDate('Plasma-gun', 'Bill', '2025-01-01');
  });
  test('Bill owner can edit description', () => {
    // given a bill exists in a project
    dsl.actingAsNewProjectOwner('Sonic screwdriver', 'Doctor');
    dsl.addBill('Sonic screwdriver', 'Install sonic motor');
    // when the bill owner updates the bill description
    dsl.updateBillDescription(
      'Sonic screwdriver',
      'Install sonic motor',
      'Install sonic diesel-motor');
    // then
    dsl.assertBillNotExists('Sonic screwdriver', 'Install sonic motor');
    dsl.assertBillExists('Sonic screwdriver', 'Install sonic diesel-motor');
  });
});
