// cypress/support/page-objects/loginPage.js

class registerPage {    
    randomEmail(length){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result+= characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    selectGender(value) {
        cy.selectRadioByValue('[type="radio"]', value)
    }

    inputFirstName(value) {
        cy.inputField('#FirstName',value)
    }

    inputLastName(value) {
        cy.inputField('#LastName',value)
    }

    inputEmail(value) {
        cy.inputField('#Email',value)
    }

    inputPassword(value) {
        cy.inputField('#Password',value)
    }

    inputConfirmPassword(value) {
        cy.inputField('#ConfirmPassword',value)
    }

    clickRegisterButton() {
      cy.get('#register-button').click()
    }
}
  
export default new registerPage()