# Rafiki Works

The system facilitates the coordination of worklogs and payments between
the lead contractor (person ordering a service) and the subcontractor
(person providing the service).

## Core functionality

- Subcontractor bills a lead contractor, including the service worklogs.
- Lead contractor pays the subcontractor, using the worklogs.
- Payment is facilitated by an external wallet provider.

  Examples:
    - User deposits money in a wallet.
    - Money is moved from lead contractor's wallet to subcontractor's wallet
      when lead contractor pays the subcontractor.
    - User withdraws money from a wallet.
    - Worklog with an end amount of 0 in any currency is not accepted.
- Lead contractor reads the worklog description provided by the contractor.

## Supporting functionality

- Lead contractor and the subcontractor segregate worklogs by project.

  Examples:
    - Lead contractor adds and removes project members.
    - Members of the same project can access each others worklogs.
    - Project member can access the worklog hours of another member.
    - Project member cannot access or deduce the monetary rate of a worklog
      of another member.
    - Lead contractor can add a worklog on behalf of a subcontractor.
    - Lead contractor can update project name and description.

! Explicit rate, simplicity,
! Rate is supposed to be clear and agreed by both parties.
! changing rate without communicating to the other party is not allowed.

### Usability

- Subcontractor can correct some aspects of an incorrectly placed worklog.

  Examples:
    - Subcontractor can update worklog description and date of the service.
    - Subcontractor can remove a worklog.
    - Worklog used to pay the subcontractor is sealed.
    - Subcontractor cannot remove a sealed worklog.

- Lead contractor filters/excludes worklogs by subcontractor.

### Contract rates

- Lead contractor and subcontractors settle worklogs using a pre-agreed rate.

  Examples:
    - Lead contractor sets an hourly rate, as per an earlier agreement with
      a subcontractor.
    - Subcontractor adds a worklog selecting the hourly rate.
    - Worklog net fee is the product of the worklog hours and the rate.

  User stories:
    - In order to know the amount of reported hours, as lead contractor
      I need to sum up the total hours of the worklogs in the billing period.
    - In order to tell the amount of remaining work, as a subcontractor,
      I need to sum up the total hours of the worklogs in the billing period.

### Invoicing

- Invoice is generated with subcontractor worklogs.
- Invoice item corresponding to the worklog with an hourly rate includes the
  number of hours.
- Lead contractor receives an inbound invoice from a subcontractor.
- Subcontractor issues an outbound invoice to lead contractor.
- Invoice can be accessed as a draft before it is issued.
- A draft invoice is not assigned an invoice number.

### Security

> For the purpose of protecting users from malicious actors, all actions
> in the system must be issued by an authenticated user.

- Reject an action issued by a malicious/unauthenticated actor.

  Examples:
    - Login attempt with invalid password is not successful.
    - Too many failed login attempts results in a temporary blockage.
    - Registration with the same email twice is not allowed.

### Wallet provider verification

> Wallet provider verification must be exercised in acceptance tests,
> despite it not being a system requirement. Verification steps are
> enforced on the system by the wallet provider.

- Unverified user cannot deposit or withdraw money from a wallet.
- User becomes verified if the verification process result is positive.
- User verification status is in progress, if he has started the
  verification process, which has not finished.
- User becomes unverified if verification process result is negative.

## Functionality to be removed

- Subcontractor adds a worklog with a set fee directly, without an hourly rate.
- Lead contractor marks a worklog as sealed without issuing a payment.
