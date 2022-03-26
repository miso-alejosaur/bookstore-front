describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/authors/list')
    cy.contains('Stephen King')
  })
})
