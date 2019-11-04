describe('user can view listed articles', () => {
  it('sees articles displayed', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://classy-news-backend.herokuapp/api/v1/articles',
      response: 'fixture:articles.json'
    })
    cy.visit('http://localhost:3001')
    cy.get('h1').should('contain', 'Classy News')
    cy.get('h2')
      .should('contain', 'Leonardo da Vinci five centuries on:')
      .should('contain', 'Some Title')
    cy.contains('The Louvre museum in Paris,')
    cy.contains('Some good content')
    cy.contains('Lauren Lion')
    cy.contains('Some awesome author')
    cy.contains('20 October 2019')
  })

  it('sees error message for no articles', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://classy-news-backend.herokuapp/api/v1/articles',
      status: 400,
    })
    cy.visit('http://localhost:3001')
    cy.contains('Network Error')
  })
})