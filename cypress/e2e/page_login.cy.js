// page - register 1
import loginPage from '../support/page-objects/loginPage'
describe('page login', () => {
  beforeEach(()=> {
    //go to landing page
    cy.visit(Cypress.env('prod'))
    cy.verifyImage('[alt="Tricentis Demo Web Shop"]','/Themes/DefaultClean/Content/images/logo.png')
  })
  it('positive case', () => {
    cy.fixture('registerData.json').then(logins => {
      logins.valid.forEach((loginData) => {
        cy.verifyMenuHeader('.ico-login','Log in')
        cy.clickMenuHeader('.ico-login')
        cy.verifyUrlContains('/login')
        cy.verifyByTag('h1','Welcome, Please Sign In!')
        loginPage.inputEmail(loginData.email)
        loginPage.inputPassword(loginData.password)
        loginPage.clickLoginButton()
        cy.verifyByTag('h2','Welcome to our store')
        cy.clickMenuHeader('.ico-logout')
      })
    })
  })

  it('negative case - do not input email or password', () => {
    cy.fixture('loginData.json').then(logins => {
      logins.invalidEmptyEmailOrPassword.forEach((loginData) => {
        cy.verifyMenuHeader('.ico-login','Log in')
        cy.clickMenuHeader('.ico-login')
        cy.verifyUrlContains('/login')
        cy.verifyByTag('h1','Welcome, Please Sign In!')
        loginPage.inputEmail(loginData.email)
        loginPage.inputPassword(loginData.password)
        loginPage.clickLoginButton()
        cy.verifyByTag('span','Login was unsuccessful. Please correct the errors and try again.')
      })
    })
  })

  it('negative case - input wrong email or password', () => {
    cy.fixture('loginData.json').then(logins => {
      logins.invalidPasswordOrEmailIncorrect.forEach((loginData) => {
        cy.verifyMenuHeader('.ico-login','Log in')
        cy.clickMenuHeader('.ico-login')
        cy.verifyUrlContains('/login')
        cy.verifyByTag('h1','Welcome, Please Sign In!')
        loginPage.inputEmail(loginData.email)
        loginPage.inputPassword(loginData.password)
        loginPage.clickLoginButton()
        cy.verifyByTag('span','Login was unsuccessful. Please correct the errors and try again.')
      })
    })
  })

  it('negative case - input wrong format email', () => {
    cy.fixture('loginData.json').then(logins => {
      logins.invalidFormatEmail.forEach((loginData) => {
        cy.verifyMenuHeader('.ico-login','Log in')
        cy.clickMenuHeader('.ico-login')
        cy.verifyUrlContains('/login')
        cy.verifyByTag('h1','Welcome, Please Sign In!')
        loginPage.inputEmail(loginData.email)
        loginPage.inputPassword(loginData.password)
        loginPage.clickLoginButton()
        cy.verifyByTag('span','Please enter a valid email address.')
      })
    })
  })

  it('positive case - Forgot Password', () => {
    cy.verifyMenuHeader('.ico-login','Log in')
    cy.clickMenuHeader('.ico-login')
    cy.verifyUrlContains('/login')
    cy.verifyByTag('h1','Welcome, Please Sign In!')
    cy.clickByTag('a','Forgot password?')
    cy.verifyUrlContains('/passwordrecovery')
    cy.verifyByTag('h1','Password recovery')
    loginPage.inputEmail('cc@mail.com')
    loginPage.clickRecoverButton()
    cy.verifyByClass('.result','Email with instructions has been sent to you.')
  })

  it('negative case - Forgot Password with wrong format email', () => {
    cy.verifyMenuHeader('.ico-login','Log in')
    cy.clickMenuHeader('.ico-login')
    cy.verifyUrlContains('/login')
    cy.verifyByTag('h1','Welcome, Please Sign In!')
    cy.clickByTag('a','Forgot password?')
    cy.verifyUrlContains('/passwordrecovery')
    cy.verifyByTag('h1','Password recovery')
    loginPage.inputEmail('cc')
    loginPage.clickRecoverButton()
    cy.verifyByTag('span','Wrong email')
  })

  afterEach(()=> {
    if (cy.verifyMenuHeader('.ico-register','Register')) {
      
    } else {
      cy.clickMenuHeader('.ico-logout')
    }
  })
})