describe('User gets payment form', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url:'http://classy-news-backend.herokuapp/api/v1/auth',
      response: 'fixture:successful_user_signup.json'
    })
    cy.visit('http://localhost:3001')
  })

  it('Successfully get payment form', () => {
    cy.get('#signup-button').click()
    cy.get('#signup-form').within(()=> {
      cy.get('#nickname-input').type('nickname')
      cy.get('#name-input').type('name')
      cy.get('#city-input').type('city')
      cy.get('#country-input').select('Sweden')
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
      cy.get('#password-confirmation').type('password')
    })
    cy.get('#submit-signup-form').click()
    cy.get('#subscribe-button').click()
    cy.get('#payment-form').should('exist')
  })
})

