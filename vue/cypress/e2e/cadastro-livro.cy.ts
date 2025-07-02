describe('Fluxo de Cadastro de Livros', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/autores/', { fixture: 'autores.json' }).as('getAutores');
        cy.intercept('GET', '**/api/generos/', { fixture: 'generos.json' }).as('getGeneros');

        cy.visit('/livros/cadastro');
    });

    it('deve preencher o formulário e cadastrar um novo livro com sucesso', () => {
        cy.wait(['@getAutores', '@getGeneros']);

        cy.get('#titulo').type('O Senhor dos Anéis');
        cy.get('#titulo_original').type('The Lord of the Rings');

        cy.get('#autor').select('Tolkien');
        cy.get('#genero').select('Romance');

        cy.get('#ano_publicacao').type('1954');
        cy.get('#lido').check();

        cy.intercept('POST', '**/api/livros/', {
            statusCode: 201,
            body: { id: 101, titulo: 'O Senhor dos Anéis' },
        }).as('postLivro');

        cy.get('form').submit();

        cy.wait('@postLivro');

        cy.url().should('include', '/livros');
    });
});
