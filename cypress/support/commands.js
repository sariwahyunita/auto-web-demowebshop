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

//verify
Cypress.Commands.add('verifyImage', (locator, src) => { 
    cy.get(locator)
    .should('have.attr', 'src', src)
})

Cypress.Commands.add('verifyMenuHeader', (locator, wording) => { 
    cy.get(locator)
    .should('be.visible')
    .should('have.text', wording)
})

Cypress.Commands.add('verifyUrlContains', (url) => { 
    cy.url()
    .should('include', url)
})

Cypress.Commands.add('verifyByClass', (kelas, wording) => { 
    cy.get(kelas)
    .contains(wording).should('be.visible')
})

Cypress.Commands.add('verifyByTag', (tag, wording) => { 
    cy.get(tag)
    .contains(wording).should('be.visible')
})

// action
Cypress.Commands.add('clickMenuHeader', (locator) => { 
    cy.get(locator)
    .click()
})

Cypress.Commands.add('selectRadioByValue', (locator, data) => {
    cy.get(locator)
    .check(data)
})

Cypress.Commands.add('inputField', (locator, value) => {
    if (value == null) {
        cy.get(locator)
        .should('be.visible')
        .focus()
        .clear()
    } else {
        cy.get(locator)
        .should('be.visible')
        .focus()
        .clear()
        .type(value)
    }
})

Cypress.Commands.add('clickByTag', (locator,wording) => { 
    cy.get(locator)
    .contains(wording).click()
})

