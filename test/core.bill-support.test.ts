import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill support', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Project owner can seal bills', () => {
    // given a bill exists in a project
    dsl.project.actingAsNewProjectOwner('Power ranger');
    dsl.project.addBill('Install holographic projector');
    // when the project owner seals the bill
    dsl.project.sealBill('Install holographic projector');
    // then the bill is sealed
    dsl.project.assertBillSealed('Install holographic projector');
  });
  test('Bill owner can remove bill', () => {
    // given an existing bill in a project
    dsl.project.actingAsNewProjectOwner('Predator');
    dsl.project.addBill('Cloaking device');
    // when the bill owner removes the bill
    dsl.project.removeBill('Cloaking device');
    // then the bill is removed
    dsl.project.assertBillNotExists('Cloaking device');
  });
  test('Bill owner cannot remove if bill is sealed', () => {
    // given a sealed bill is added to a project
    dsl.project.actingAsNewProjectOwner('Skywalker');
    dsl.project.addSealedBill('Add tokamak reactor');
    // when the owner attempts to remove a sealed bill
    dsl.project.attemptRemoveBill('Add tokamak reactor');
    // then the bills is not removed
    dsl.project.assertBillExists('Add tokamak reactor');
  });
  test('Bill owner can update date', () => {
    // given a bill with date is added to a project
    dsl.project.actingAsNewProjectOwner('Shepard');
    dsl.project.addBillWithDate('Plasma-gun', '1999-12-12');
    // when the bill owner updates the date of the bill
    dsl.project.updateBillDate('Plasma-gun', '2025-01-01');
    // then the date is the updated date
    dsl.project.assertBillDate('Plasma-gun', '2025-01-01');
  });
  test('Bill owner can edit description', () => {
    // given a bill exists in a project
    dsl.project.actingAsNewProjectOwner('Doctor');
    dsl.project.addBill('Install sonic motor');
    // when the bill owner updates the bill description
    dsl.project.updateBillDescription(
      'Install sonic motor',
      'Install sonic diesel-motor');
    // then the bill description is renamed
    dsl.project.assertBillNotExists('Install sonic motor');
    dsl.project.assertBillExists('Install sonic diesel-motor');
  });
});
