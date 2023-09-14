// cypress/support/page-objects/loginPage.js

class registerPage {    
    selectGender(value) {
        cy.selectRadioByValue('[type="radio"]', value)
    }

    selectFirstName(value) {
        cy.inputField('#FirstName',value)
    }

    selectLastName(value) {
        cy.inputField('#LastName',value)
    }

    selectEmail(value) {
        cy.inputField('#Email',value)
    }

    selectPassword(value) {
        cy.inputField('#Password',value)
    }

    selectConfirmPassword(value) {
        cy.inputField('#ConfirmPassword',value)
    }

    clickRegisterButton() {
      cy.get('#register-button').click()
    }}
  
  export default new registerPage()