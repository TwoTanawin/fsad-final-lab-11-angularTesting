describe('Signup Component', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });
  
    it('should display correct display', () => {
      cy.get('h1').contains('Student Signup Form');
    });
  
    it('should disable submit button without input', () => {
      cy.get('#submit').should('exist').and('be.disabled');
    });
  
    it('should signup with correct credentials', () => {
      cy.get('#firstName').type('Test3');
      cy.get('#lastName').type('User3');
      cy.get('#email').type('test3@user3.com');
      cy.get('#password').type('password3   ');
      cy.get('#submit').should('exist').and('not.be.disabled');
      cy.get('#submit').click();
      cy.url().should('include', '/success');
    });
  });
  