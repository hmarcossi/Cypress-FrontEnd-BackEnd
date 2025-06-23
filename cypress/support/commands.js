import { generateUserData } from '../factories/user_data';
import loginPage from '../e2e/frontend/page_objects/LoginPage';

/**
 * Cria um usuário administrador via API e faz login na interface.
 */
Cypress.Commands.add('createAdminAndLogin', () => {
    const userData = generateUserData({ administrador: 'true' });

    cy.request({
        method: 'POST',
        url: `${Cypress.env("serverest").apiUrl}/usuarios`,
        body: userData
    }).then(() => {
        loginPage.acessar();
        loginPage.realizaLogin(userData.email, userData.password);
    });
})

/**
 * Realiza o login via API.
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 */
Cypress.Commands.add('login', (email, password) => {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('serverest').apiUrl}/login`,
      body: {
          email: email,
          password: password,
      },
    });
  });

/**
 * Cria um usuário via API usando a factory e retorna o token de autenticação.
 * Permite sobrescrever os dados do usuário.
 * @param {object} overrides - Objeto para sobrescrever os dados padrão do usuário.
 * @returns {Cypress.Chainable<string>} O token de autorização.
 */
Cypress.Commands.add('createUserAndGetToken', (overrides = {}) => {
    const userData = generateUserData(overrides);
    return cy.createUser(userData).then(() => {
      return cy.login(userData.email, userData.password).then((response) => {
        return response.body.authorization;
      });
    });
});

/**
 * Cria um usuário via API.
 * @param {object} payload - Os dados do usuário a serem criados.
 */
Cypress.Commands.add('createUser', (payload) => {
      return cy.request({
        method: 'POST',
        url: `${Cypress.env("serverest").apiUrl}/usuarios`,
        failOnStatusCode: false,
        body: payload,
      });
    });

/**
 * Cria um produto via API.
 * @param {string} token - O token de autorização.
 * @param {object} payload - Os dados do produto a serem criados.
 */
Cypress.Commands.add('createProduct', (token, payload) => {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env("serverest").apiUrl}/produtos`,
      headers: {
        'Authorization': token,
      },
      failOnStatusCode: false,
      body: payload,
    });
});

/**
 * Busca um produto pelo nome via API e retorna seu ID.
 * @param {string} nomeProduct - O nome do produto a ser buscado.
 * @returns {Cypress.Chainable<{idProduct: string}>} O ID do produto.
 */
Cypress.Commands.add('getProduct', (nomeProduct) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('serverest').apiUrl}/produtos?nome=${nomeProduct}`,
    failOnStatusCode: false,
  }).then((response) => {
    const idProduct = response.body.produtos[0]._id;
    return Cypress.Promise.resolve({idProduct});
  })
});

/**
 * Atualiza um produto via API.
 * @param {string} token - O token de autorização.
 * @param {string} idProduct - O ID do produto a ser atualizado.
 * @param {object} payload - Os dados atualizados do produto.
 */
Cypress.Commands.add('updateProduct', (token, idProduct, payload) => {
  return cy.request({
    method: 'PUT',
    url: `${Cypress.env('serverest').apiUrl}/produtos/${idProduct}`,
    headers: {
      'Content-Type': 'application/json', // Corrigido o typo aqui
      'Authorization': token,
    },
    failOnStatusCode: false,
    body: payload,
  });
});


/**
 * Deleta um produto via API.
 * @param {string} token - O token de autorização.
 * @param {string} idProduct - O ID do produto a ser deletado.
 */
Cypress.Commands.add('deleteProduct', (token, idProduct) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('serverest').apiUrl}/produtos/${idProduct}`,
    headers: {
      'Authorization': token,
    },
    failOnStatusCode: false,
  });
});