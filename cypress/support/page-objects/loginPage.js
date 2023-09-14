// cypress/support/page-objects/loginPage.js

class loginPage {
    inputEmail(value) {
        cy.inputField('#Email',value)
    }

    inputPassword(value) {
        cy.inputField('#Password',value)
    }

    clickLoginButton() {
      cy.get('.login-button').click()
    }

    clickRecoverButton() {
        cy.get('.password-recovery-button').click()
    }
}
  
export default new loginPage()