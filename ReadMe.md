# Rafiki Works

The system facilitates the coordination of payments and work logs between
the lead contractor (person ordering a service) and the subcontractor
(person providing the service).

- Wallet Provider Verification

  > Wallet provider verification must be exercised in acceptance tests,
  > despite it not being a system requirement. Verification steps are
  > enforced on the system by the wallet provider.

    - newly registered are not verified, status is "not-started"
    - when user starts, then status is "ready-to-submit"
    - user needs to supply a legal entity, once done the status is "in-progress":
    - when user is approved, then status is "approved"
    - when user is rejected, then status is "rejected"
    - when user makes an error, then status is "error"

- Authentication
  > In order to protect users from malicious actors, all actions
  > in the system must be issued by an authenticated user.

    1. Reject an action issued by a malicious/unauthenticated actor.
    2. Allow the user to register.
    3. Allow the user to log out of the system.
    4. Allow the user to login after registration.
    5. Inform the user of invalid password.
    6. Inform the user of too many attempts.
    7. Keep the user logged in after registration.
    8. Prevent registration with the same email twice.

## User stories:

- In order for the user to feel safe about his money,
  he needs to access his full transaction history: deposit,withdraw,move
