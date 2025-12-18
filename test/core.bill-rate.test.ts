import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill rate', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Add bill with custom/fixed amount', () => {
    // given a project owner
    dsl.project.actingAsNewProjectOwner('Owner');
    // when he adds a bill with fixed amount of 15
    dsl.project.addBillRateFixed('Force-field', 15);
    // then the end amount is 15
    dsl.project.assertBillEndAmount('Force-field', 15);
  });
  test('Add bill with an hourly rate', () => {
    // given a project owner
    dsl.project.actingAsNewProjectOwner('Owner');
    // when he adds an hourly bill of 2 hours for 10
    dsl.project.addBillRateHourly('Neural implant', 2, 10);
    // then the end amount is 10
    dsl.project.assertBillEndAmount('Neural implant', 20);
  });
});
