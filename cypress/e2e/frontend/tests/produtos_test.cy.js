import loginPage from "../page_objects/LoginPage"
import homeAdminPage from "../page_objects/HomeAdminPage"
import createProductPage from "../page_objects/CreateProductPage"

import { generateProductData } from "../../../factories/product_data"
import { generateUserData } from "../../../factories/user_data"


describe('Testes Frontend de cadastro de produtos', () => {

    beforeEach(() => {
        cy.createAdminAndLogin();
        homeAdminPage.homeButton().should('be.visible');
    })

    it('Criar um produto com sucesso', () => {
        const product_data = generateProductData();

        homeAdminPage.createProductButton().click()
        createProductPage.createProduct(product_data.nome, product_data.preco, product_data.descricao, product_data.quantidade)
        createProductPage.checkProduct(product_data.nome)
    })

    it('Editar um produto com sucesso', () => {
        const initialProduct = generateProductData();
        const editedProduct = generateProductData({
            nome: `${initialProduct.nome} (Editado)`
        });

        homeAdminPage.createProductButton().click()
        createProductPage.createProduct(initialProduct.nome, initialProduct.preco, initialProduct.descricao, initialProduct.quantidade)
        createProductPage.checkProduct(initialProduct.nome)

        createProductPage.editButton().click()
        cy.url().should('include', '/editar-produtos')
        createProductPage.editProduct(editedProduct.nome, editedProduct.preco, editedProduct.descricao, editedProduct.quantidade)
        createProductPage.checkProduct(editedProduct.nome)
    })

    it('Excluir um produto com sucesso', () => {
        const product_data = generateProductData();

        homeAdminPage.createProductButton().click()
        createProductPage.createProduct(product_data.nome, product_data.preco, product_data.descricao, product_data.quantidade)
        createProductPage.checkProduct(product_data.nome)
        createProductPage.deleteButton().click()
    })

})
