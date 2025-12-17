import {assertEquals, test} from './vitest';

/*
  Glossary:
  - project             - link between two parties, one providing a service for the other
  - project member      - project owner or a project contributor
  - project owner       - user who created the project (person requiring the service or
                          providing a service for somebody outside the project)
  - project contributor - a person invited to the project, not the owner (person providing
                          a service to the project owner)
  - bill                - project entry indicating a payable item, expected to be paid
 */

// core (project-bills-and-members)
// project owner creates a project; assert project exists
// project owner can add a bill; assert bill is added
// project owner can invite a project member; assert user is a member
// project contributor can add a bill; assert bill is added;
// project owner can remove a project member from a project; assert user is not a member
// user cannot access a project he's not a member of; assert cannot access

// core-bill-support
// project owner can seal bills; assert bill is sealed
// bill owner can remove bill; assert bill does not exist
// ?? bill owner cannot remove if bill is sealed; assert not removed
// bill owner can edit date; assert date updated
// bill owner can edit description; assert description updated

// core-member-support
// project owner can add bill on behalf of contributor; assert bill created and owner is contributor
// filter/exclude bills by member; assert filtered? ?? that's view kind of thingy
// ?? gray-area: prevent members from creating bills for others? nowhere it specifies that he can

// core-bill-rate
// add bill with custom/fixed amount; assert end amount
// add bill with an hourly rate; assert end amount

// core-bill-visibility
// project owner can see bills of a contributor; assert can access
// project member can see bills of other contributor; assert can access
// project member cannot access rate or a total of a bill; assert cannot access

// invoicing
// project owner can generate a client invoice, containing project bills; assert invoice contains bills
// project owner can download an invoice as a pdf; assert pdf is downloaded (approval tests?)
// project contributor can generate a contributor invoice, containing his project bills; assert contains own bills
// hourly bill is represented in invoice with an hour and rate; assert invoice contains hours and rates

// wallet
// User has 0 money in his wallet.
// Verified user can topup his wallet; asset money in wallet
// User owner can list his transaction history; assert transaction history has items
// User can withdraw money using USDC blockchain address
// User can withdraw money using USD bank details
// User can withdraw money to a bank account; wallet goes down
// User can withdraw money to USD bank account; mural call
// User can withdraw money to ZAR bank account; mural call
// User can withdraw money to EUR bank account; mural call

// wallet-payment
// Project owner pays a contributor;
// - owner wallet goes down
// - contributor wallet goes up
// Project owner pays a bill with his wallet;
// - bill exists
// - owner pays
// - bill is sealed?

// wallet-verification
// newly user is unverified
// submitted verification is in progress
// submit as individual
// submit as business
// when wallet provider results with positive, then it's verified
// when wallet provider results with negative, then it's unverified
// when wallet provider results with negative, then it's unverified and show error

// core-project-support
// read/update project description and name
// create/update project validation: name not empty, description not empty

// accidental-auth
// 1. allow a new user to sign up - that's accidental
// 2. should show loading state during state - that's ui
// 3. prevent registration with duplicate email
// 4. logout
// 5. login after registration (since registering already logs in? - Yea)
// 6. show error message for invalid password
// 7. show error message for too many attempts

test('Example', () => {
  assertEquals('Foo', 'Foo');
});
