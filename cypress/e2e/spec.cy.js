
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.mailslurp()
      .then(mailslurp => mailslurp.createInbox())
      .then(inbox => {
        cy.wrap(inbox.id).as('inboxId');
        cy.wrap(inbox.emailAddress).as('emailAddress');
      })
  })
})