// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome) => {
    cy.get('[data-cy="firstName"]')
        .type(nome)
    cy.get('[data-cy="lastName"]')
        .type('Brancher')
    cy.get('[data-cy="email"]')
        .type('giovanni.brancher@gmail.com')
    cy.get('[data-cy="phone"]')
        .type('51999999999')
    cy.get('[data-cy="open-text-area"]')
        .type("Isso é um teste!")
    cy.get('[data-cy="submit"]')
        .click()
    cy.get('span[class="success"] > strong')
        .should('be.visible')
        .should('be.text', 'Mensagem enviada com sucesso.')
})