import {Dsl} from './dsl/Dsl';
import {beforeEach, describe, test} from './vitest';

describe('Bill rate', () => {
  let dsl: Dsl;
  beforeEach(() => dsl = new Dsl());
  test('Add bill with custom/fixed amount', () => {
    // given a project owner
    dsl.actingAsNewProjectOwner('Force-field', 'Owner');
    // when he adds a bill with fixed amount of 15
    dsl.addBillRateFixed('Force-field', 'Bill', 15);
    // then the end amount is 15
    dsl.assertBillEndAmount('Force-field', 'Bill', 15);
  });
  test('Add bill with an hourly rate', () => {
    // given a project owner
    dsl.actingAsNewProjectOwner('Neural implant', 'Owner');
    // when he adds an hourly bill of 2 hours for 10
    dsl.addBillRateHourly('Neural implant', 'Bill', 2, 10);
    // then the end amount is 10
    dsl.assertBillEndAmount('Neural implant', 'Bill', 20);
  });
});
