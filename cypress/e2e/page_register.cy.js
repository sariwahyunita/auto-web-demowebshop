// page - register 1
import registerPage from '../support/page-objects/registerPage'
describe('page register', () => {
  beforeEach(()=> {
    //go to landing page
    cy.visit(Cypress.env('prod'))
    cy.verifyImage('[alt="Tricentis Demo Web Shop"]','/Themes/DefaultClean/Content/images/logo.png')
  })
  it('positive case', () => {
    cy.verifyMenuHeader('.ico-register','Register')
    cy.clickMenuHeader('.ico-register')
    cy.verifyUrlContains('/register')
    cy.verifyByTag('h1','Register')
    cy.fixture('registerData.json').then(registers => {
      registers.valid.forEach((registerData) => {
        registerPage.selectGender(registerData.gender)
        registerPage.selectFirstName(registerData.firstName)
        registerPage.selectLastName(registerData.lastName)
        registerPage.selectEmail(registerData.email)
        registerPage.selectPassword(registerData.password)
        registerPage.selectConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByClass('.result','Your registration completed')
      })
    })
  })

  it('negatif case - no input mandatory filed', () => {
    cy.verifyMenuHeader('.ico-register','Register')
    cy.clickMenuHeader('.ico-register')
    cy.verifyUrlContains('/register')
    cy.verifyByTag('h1','Register')
    cy.fixture('registerData.json').then(registers => {
      registers.invalidMandatoryField.forEach((registerData) => {
        registerPage.selectGender(registerData.gender)
        registerPage.selectFirstName(registerData.firstName)
        registerPage.selectLastName(registerData.lastName)
        registerPage.selectEmail(registerData.email)
        registerPage.selectPassword(registerData.password)
        registerPage.selectConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        if (registerData.firstName == null) {
          cy.verifyByTag('span','First name is required.')
        } 

        if (registerData.lastName == null) {
          cy.verifyByTag('span','Last name is required.')
        } 

        if (registerData.email == null) {
          cy.verifyByTag('span','Email is required.')
        } 

        if (registerData.password == null) {
          cy.verifyByTag('span','Password is required.')
        } 

        if (registerData.confirmPassword == null) {
          cy.verifyByTag('span','Password is required.')
        } 
      })
    })
  })

  it('negatif case - input duplicate email', () => {
    cy.verifyMenuHeader('.ico-register','Register')
    cy.clickMenuHeader('.ico-register')
    cy.verifyUrlContains('/register')
    cy.verifyByTag('h1','Register')
    cy.fixture('registerData.json').then(registers => {
      registers.invalidDuplicateEmail.forEach((registerData) => {
        registerPage.selectGender(registerData.gender)
        registerPage.selectFirstName(registerData.firstName)
        registerPage.selectLastName(registerData.lastName)
        registerPage.selectEmail(registerData.email)
        registerPage.selectPassword(registerData.password)
        registerPage.selectConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByTag('li','The specified email already exists')
      })
    })
  })

  it('negatif case - confirmation password does not match with password', () => {
    cy.verifyMenuHeader('.ico-register','Register')
    cy.clickMenuHeader('.ico-register')
    cy.verifyUrlContains('/register')
    cy.verifyByTag('h1','Register')
    cy.fixture('registerData.json').then(registers => {
      registers.invalidWrongConfirmPassword.forEach((registerData) => {
        registerPage.selectGender(registerData.gender)
        registerPage.selectFirstName(registerData.firstName)
        registerPage.selectLastName(registerData.lastName)
        registerPage.selectEmail(registerData.email)
        registerPage.selectPassword(registerData.password)
        registerPage.selectConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByTag('span','The password and confirmation password do not match.')
      })
    })
  })

  it('negatif case - input wrong format email', () => {
    cy.verifyMenuHeader('.ico-register','Register')
    cy.clickMenuHeader('.ico-register')
    cy.verifyUrlContains('/register')
    cy.verifyByTag('h1','Register')
    cy.fixture('registerData.json').then(registers => {
      registers.invalidWrongFormatEmail.forEach((registerData) => {
        registerPage.selectGender(registerData.gender)
        registerPage.selectFirstName(registerData.firstName)
        registerPage.selectLastName(registerData.lastName)
        registerPage.selectEmail(registerData.email)
        registerPage.selectPassword(registerData.password)
        registerPage.selectConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByTag('span','Wrong email')
      })
    })
  })

  it('negatif case - input email less than 6 char', () => {
    cy.verifyMenuHeader('.ico-register','Register')
    cy.clickMenuHeader('.ico-register')
    cy.verifyUrlContains('/register')
    cy.verifyByTag('h1','Register')
    cy.fixture('registerData.json').then(registers => {
      registers.invalidPasswordLessThan6Char.forEach((registerData) => {
        registerPage.selectGender(registerData.gender)
        registerPage.selectFirstName(registerData.firstName)
        registerPage.selectLastName(registerData.lastName)
        registerPage.selectEmail(registerData.email)
        registerPage.selectPassword(registerData.password)
        registerPage.selectConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByTag('span','The password should have at least 6 characters.')
      })
    })
  })

  afterEach(()=> {
    if (cy.verifyMenuHeader('.ico-register','Register')) {
      cy.log('failed register')
    } else {
      cy.clickMenuHeader('.ico-logout')
    }
  })
})