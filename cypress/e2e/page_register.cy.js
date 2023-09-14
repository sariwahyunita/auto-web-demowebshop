// page - register 1
import registerPage from '../support/page-objects/registerPage'
describe('page register', () => {
  beforeEach(()=> {
    //go to landing page
    cy.visit(Cypress.env('prod'))
    cy.verifyImage('[alt="Tricentis Demo Web Shop"]','/Themes/DefaultClean/Content/images/logo.png')
  })
  
  it.skip('test random',() => {
    let random = ''
    let numb = 0
    cy.readFile("cypress/fixtures/registerData.json", (err, data) => {
      if (err) {
          return console.error(err);
      };
    }).then((registers) => {
      registers.valid.forEach((registerData) => {
        random = registerPage.randomEmail(6)
        registerData.email = random+'@gmail.com'
        registerData.password = random
        cy.writeFile("cypress/fixtures/registerData.json", JSON.stringify(registers))
      })
    })
  })

  it.only('positive case', () => {
    let random = ''
    let numb = 0
    cy.readFile("cypress/fixtures/registerData.json", (err, data) => {
      if (err) {
          return console.error(err);
      };
    }).then(registers => {
      registers.valid.forEach((registerData) => {
        random = registerPage.randomEmail(6)
        cy.verifyMenuHeader('.ico-register','Register')
        cy.clickMenuHeader('.ico-register')
        cy.verifyUrlContains('/register')
        cy.verifyByTag('h1','Register')
        registerPage.selectGender(registerData.gender)
        registerPage.inputFirstName(registerData.firstName)
        registerPage.inputLastName(registerData.lastName)
        registerPage.inputEmail(random+'@gmail.com')
        registerData.email = random+'@gmail.com'
        registerPage.inputPassword(random)
        registerData.password = random
        registerPage.inputConfirmPassword(random)
        registerData.confirmPassword = random
        registerPage.clickRegisterButton()
        cy.verifyByClass('.result','Your registration completed')
        cy.clickMenuHeader('.ico-logout')
        cy.writeFile("cypress/fixtures/registerData.json", JSON.stringify(registers))
      })
    })
  })

  it.skip('negatif case - no input mandatory filed', () => {
    cy.fixture('registerData.json').then(registers => {
      registers.invalidMandatoryField.forEach((registerData) => {
        cy.verifyMenuHeader('.ico-register','Register')
        cy.clickMenuHeader('.ico-register')
        cy.verifyUrlContains('/register')
        cy.verifyByTag('h1','Register')
        registerPage.selectGender(registerData.gender)
        registerPage.inputFirstName(registerData.firstName)
        registerPage.inputLastName(registerData.lastName)
        registerPage.inputEmail(registerData.email)
        registerPage.inputPassword(registerData.password)
        registerPage.inputConfirmPassword(registerData.confirmPassword)
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

  it.skip('negatif case - input duplicate email', () => {
    cy.fixture('registerData.json').then(registers => {
      registers.invalidDuplicateEmail.forEach((registerData) => {
        cy.verifyMenuHeader('.ico-register','Register')
        cy.clickMenuHeader('.ico-register')
        cy.verifyUrlContains('/register')
        cy.verifyByTag('h1','Register')
        registerPage.selectGender(registerData.gender)
        registerPage.inputFirstName(registerData.firstName)
        registerPage.inputLastName(registerData.lastName)
        registerPage.inputEmail(registerData.email)
        registerPage.inputPassword(registerData.password)
        registerPage.inputConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByTag('li','The specified email already exists')
      })
    })
  })

  it.skip('negatif case - confirmation password does not match with password', () => {
    cy.fixture('registerData.json').then(registers => {
      registers.invalidWrongConfirmPassword.forEach((registerData) => {
        cy.verifyMenuHeader('.ico-register','Register')
        cy.clickMenuHeader('.ico-register')
        cy.verifyUrlContains('/register')
        cy.verifyByTag('h1','Register')
        registerPage.selectGender(registerData.gender)
        registerPage.inputFirstName(registerData.firstName)
        registerPage.inputLastName(registerData.lastName)
        registerPage.inputEmail(registerData.email)
        registerPage.inputPassword(registerData.password)
        registerPage.inputConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByTag('span','The password and confirmation password do not match.')
      })
    })
  })

  it.skip('negatif case - input wrong format email', () => {
    cy.fixture('registerData.json').then(registers => {
      registers.invalidWrongFormatEmail.forEach((registerData) => {
        cy.verifyMenuHeader('.ico-register','Register')
        cy.clickMenuHeader('.ico-register')
        cy.verifyUrlContains('/register')
        cy.verifyByTag('h1','Register')
        registerPage.selectGender(registerData.gender)
        registerPage.inputFirstName(registerData.firstName)
        registerPage.inputLastName(registerData.lastName)
        registerPage.inputEmail(registerData.email)
        registerPage.inputPassword(registerData.password)
        registerPage.inputConfirmPassword(registerData.confirmPassword)
        registerPage.clickRegisterButton()
        cy.verifyByTag('span','Wrong email')
      })
    })
  })

  it.skip('negatif case - input email less than 6 char', () => {
    cy.fixture('registerData.json').then(registers => {
      registers.invalidPasswordLessThan6Char.forEach((registerData) => {
        cy.verifyMenuHeader('.ico-register','Register')
        cy.clickMenuHeader('.ico-register')
        cy.verifyUrlContains('/register')
        cy.verifyByTag('h1','Register')
        registerPage.selectGender(registerData.gender)
        registerPage.inputFirstName(registerData.firstName)
        registerPage.inputLastName(registerData.lastName)
        registerPage.inputEmail(registerData.email)
        registerPage.inputPassword(registerData.password)
        registerPage.inputConfirmPassword(registerData.confirmPassword)
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