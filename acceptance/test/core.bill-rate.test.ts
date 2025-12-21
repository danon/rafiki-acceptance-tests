import {Dsl} from './dsl/Dsl';
import {describe, test} from './playwright';

describe('Bill rate', () => {
  test('Add bill with custom/fixed amount', async (dsl: Dsl) => {
    // given a project owner
    await dsl.project.actingAsNewProjectOwner('Owner');
    // when he adds a bill with fixed amount of 15
    await dsl.project.addBillRateFixed('Force-field', 15);
    // then the end amount is 15
    await dsl.project.assertBillEndAmount('Force-field', 15);
  });
  test('Add bill with an hourly rate', async (dsl: Dsl) => {
    // given a project owner
    await dsl.project.actingAsNewProjectOwner('Owner');
    // when he adds an hourly bill of 2 hours for 10
    await dsl.project.addBillRateHourly('Neural implant', 2, 10);
    // then the end amount is 10
    await dsl.project.assertBillEndAmount('Neural implant', 20);
  });
});
