/// <reference types="Cypress" />

describe('Curso Cypress - Básico', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('../../src/index.html')
  })

  it('EX0 - preenche os campos obrigatórios e envia o formulário', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('[data-cy="firstName"]')
      .type('Giovanni')
    cy.get('[data-cy="lastName"]')
      .type('Brancher')
    cy.get('[data-cy="email"]')
      .type('giovanni.brancher@gmail.com')
    cy.get('[data-cy="phone"]')
      .type('51999999999')
    cy.get('[data-cy="open-text-area"]')
      .type("Isso é um teste!")
    cy.get('[data-cy="submit"]')
      .click()
    cy.get('span[class="success"] > strong')
      .should('be.visible')
      .should('be.text', 'Mensagem enviada com sucesso.')
  })

  it('EX1 - alterando delay do type', () => {
    cy.get('[data-cy="open-text-area"]')
      .type('Lorem ipsum dolor sit {enter}amet. Aut iste quos vel {enter}pariatur omnis {enter}et facere atque qui odio omnis ut explicabo unde sit dignissimos error ut iste explicabo. A laudantium quasi ea nemo officiis id voluptatibus excepturi aut mollitia maiores in dolorem dolor sit quia quasi. 33 omnis dignissimos eum laudantium velit est adipisci libero et laborum fugiat ut voluptatem laudantium! Est temporibus eaque eos quas quidem non reiciendis ducimus et reiciendis voluptatem ad quasi minus a fugiat eaque ut doloribus voluptatem.', {
        delay: 0
      })
  })

  it('EX2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[data-cy="firstName"]')
      .type('Giovanni')
    cy.get('[data-cy="lastName"]')
      .type('Brancher')
    cy.get('[data-cy="email"]')
      .type('giovanni.brancher@@gmail.com') // Erro forçado aqui
    cy.get('[data-cy="phone"]')
      .type('51999999999')
    cy.get('[data-cy="open-text-area"]')
      .type("Isso é um teste!")
    cy.get('[data-cy="submit"]')
      .click()
    cy.get('span[class="error"] > strong')
      .should('be.visible')
      .should('be.text', 'Valide os campos obrigatórios!')
  })

  it('EX3 - validando erro quando valor não-numérico é informado no campo telefone', () => {
    cy.get('[data-cy="phone"]')
      .type('51999a99999')
      .should('have.value', '5199999999')
  })

  it('EX4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[data-cy="firstName"]')
      .type('Giovanni')
    cy.get('[data-cy="lastName"]')
      .type('Brancher')
    cy.get('[data-cy="email"]')
      .type('giovanni.brancher@gmail.com')
    cy.get('[data-cy="open-text-area"]')
      .type("Isso é um teste!")
    cy.get('[data-cy="phone-checkbox"]')
      .check()
    cy.get('[data-cy="submit"]')
      .click()
    cy.get('span[class="error"] > strong')
      .should('be.visible')
      .should('be.text', 'Valide os campos obrigatórios!')
  })

  it('EX5 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[data-cy="firstName"]')
      .type('Giovanni')
      .should('have.value', 'Giovanni')
      .clear()
      .should('have.value', '')
    cy.get('[data-cy="lastName"]')
      .type('Brancher')
      .should('have.value', 'Brancher')
      .clear()
      .should('have.value', '')
    cy.get('[data-cy="email"]')
      .type('giovanni.brancher@@gmail.com')
      .should('have.value', 'giovanni.brancher@@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('[data-cy="phone"]')
      .type('51999999999')
      .should('have.value', '51999999999')
      .clear()
      .should('have.value', '')
  })

  it('EX6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('[data-cy="submit"]')
      .click()
    cy.get('span[class="error"] > strong')
      .should('be.visible')
      .should('be.text', 'Valide os campos obrigatórios!')
  })

  it('EX7 - envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('TESTE PARAM')
  })

  it('EX8 - alterar todos os locais onde identificamos o botão para posterior clique, onde em vez de identificarmos tal elemento com o cy.get(), iremos usar o cy.contains().', () => {
    cy.get('[data-cy="firstName"]')
      .type('Giovanni')
    cy.get('[data-cy="lastName"]')
      .type('Brancher')
    cy.get('[data-cy="email"]')
      .type('giovanni.brancher@gmail.com')
    cy.get('[data-cy="phone"]')
      .type('51999999999')
    cy.get('[data-cy="open-text-area"]')
      .type("Isso é um teste!")
    cy.contains('button', 'Enviar')
      .click()
    cy.get('span[class="success"] > strong')
      .should('be.visible')
      .should('be.text', 'Mensagem enviada com sucesso.')
  })

  it('EX9 - seleciona um produto (YouTube) por seu texto', () => {
    cy.get('[data-cy="product"]')
      .select('YouTube') // texto do option selecionado
      .find('option:selected')
      .should('have.text', 'YouTube')
  })

  it('EX10 - seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('[data-cy="product"]')
      .select('mentoria') // value do option selecionado
      .find('option:selected')
      .should('have.value', 'mentoria')
  })


  it('EX11 - seleciona um produto (Blog) por seu índice', () => {
    cy.get('[data-cy="product"]')
      .select(1) // indice do option selecionado
      .find('option:selected')
      .should('have.value', 'blog')
  })

  it('EX12 - marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[name="atendimento-tat"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('EX13 - marca cada tipo de atendimento', () => {
    const tipo_atendimento = cy.get('input[name="atendimento-tat"]')
      .should('have.length', 3)
    tipo_atendimento.each(tipo => {
      cy.wrap(tipo)
        .check()
        .should('be.checked')
    });

    // Outra maneira
    cy.get('input[name="atendimento-tat"]')
      .should('have.length', 3)
      .each(tipo => {
        cy.wrap(tipo)
          .check()
          .should('be.checked')
      });
  })

  it('EX14 - marca ambos checkboxes, depois marca o ultimo', () => {
    cy.get('[data-cy="email-checkbox"]')
      .check()
      .should('be.checked')
    cy.get('[data-cy="phone-checkbox"]')
      .check()
      .should('be.checked')
      .uncheck()
      .should('not.be.checked')

    // Outra maneira
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('EX15 - seleciona um arquivo da pasta fixtures', () => {
    cy.get('[id="file-upload"]')
      .should('not.have.value')
      .selectFile('./Cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('EX16 - seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('[id="file-upload"]')
      .should('not.have.value')
      .selectFile('./Cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('EX17 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('[id="file-upload"]')
      .selectFile('@sampleFile')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('EX18 - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy > a')
      .should('have.attr', 'target', '_blank')

    // Outra maneira (doc do cypress)
    cy.get('#privacy > a')
      .should($link => {
        expect($link.attr('href')).to.equal('privacy.html')
        expect($link.attr('target')).to.equal('_blank')
      })
  })

  it('EX19 - acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy > a')
      .invoke('removeAttr', 'target')
      .click()
    cy.title()
      .should('include', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
      .location('pathname')
      .should('equal', '/src/privacy.html')
  })

  it('EX20 - testa a página da política de privacidade de forma independente', () => {
    cy.get('#privacy > a')
      .invoke('removeAttr', 'target')
      .click()

    // Valida informacoes da pagina aberta
    cy.title()
      .should('include', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
      .location('pathname')
      .should('equal', '/src/privacy.html')
      .get('#title').should('be.text', 'CAC TAT - Política de privacidade')
      .get('#white-background').should('contain', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
  })

  it('EX21 - ', () => {
    
  })
})
