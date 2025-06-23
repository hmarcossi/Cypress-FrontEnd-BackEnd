import loginPage from "../page_objects/LoginPage"
import homeAdminPage from "../page_objects/HomeAdminPage"
import createUserPage from "../page_objects/CreateUserPage"
import createProductPage from "../page_objects/CreateProductPage"

import { faker } from "@faker-js/faker"


describe('Testes Frontend de cadastro de usuário', () => {
    const nomeAdmin = faker.person.firstName();
    const emailAdmin = faker.internet.email();
    const passAdmin = faker.internet.password();
    
    const nomeUser = faker.person.firstName();
    const emailUser = faker.internet.email();
    const passUser = faker.internet.password();

    const nomeProduct = faker.string.alpha(15);
    const priceProduct = faker.string.numeric(2);
    const descriptionProduct = faker.string.alpha(30);
    const amountProduct = faker.string.numeric(3);

    beforeEach(() => {
        loginPage.acessar();
    })

    it('Criar Usuário Admin com sucesso', () => {
        loginPage.createUserButton().click()
        createUserPage.createAdmin(nomeAdmin, emailAdmin, passAdmin)
        createUserPage.messageSuccess().should('be.visible')
    })

    it('Criar Usuário Admin sem email' , () => {
        loginPage.createUserButton().click()
        createUserPage.createAdmin(nomeAdmin, ' ', passAdmin)
        createUserPage.messageError().should('be.visible')
    })

    it('Login Admin com Sucesso', () => {
        loginPage.realizaLogin(emailAdmin, passAdmin)
        homeAdminPage.homeButton().should('be.visible')
    })
    it('Criar Usuário sem acesso admin com sucesso', () => {
        loginPage.realizaLogin(emailAdmin, passAdmin)
        homeAdminPage.createUserButton().click()
        createUserPage.createUser(nomeUser, emailUser, passUser)
        homeAdminPage.listUsersButton().click()
        createUserPage.checkUser(emailUser)
        
    })
    it('Criar um produto com acesso Admin - Sucesso', () => {
        loginPage.realizaLogin(emailAdmin, passAdmin)
        homeAdminPage.createProductButton().click()
        createProductPage.createProduct(nomeProduct, priceProduct, descriptionProduct, amountProduct)
        createProductPage.checkProduct(nomeProduct)
    })

})