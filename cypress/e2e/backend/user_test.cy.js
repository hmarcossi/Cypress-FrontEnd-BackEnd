import { generateUserData } from '../../factories/user_data';

describe('Testes E2E Backend de usuários', () => {

    it('Criar usuário com sucesso', () => {
        let payload = generateUserData();
        cy.createUser(payload)
        .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            expect(response.body._id).to.have.length(16);
        })
    })

    it('Criar usuário Admin com sucesso', () => {
        let payload = generateUserData({administrador: 'true'});

        cy.createUser(payload)
        .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            expect(response.body._id).to.have.length(16);
        })
    })

    it('Criar usuário sem nome', () => {

        let payload = generateUserData({nome: ''});

        cy.createUser(payload)
        .then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.nome).to.eq('nome não pode ficar em branco');
        })
    })

    it('Criar usuário sem email', () => {
        let payload = generateUserData({email: ''});

        cy.createUser(payload)
        .then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.email).to.eq('email não pode ficar em branco');
        })
    })

    it('Criar usuário sem senha', () => {
        let payload = generateUserData({password: ''});

        cy.createUser(payload)
        .then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.password).to.eq('password não pode ficar em branco');
        })
    })

    it('Criar usuário com email já cadastrado', () => {
        const payload = generateUserData();

        cy.createUser(payload)
        .then((response) => {
            expect(response.status).to.eq(201);
            cy.createUser(payload)
            .then((response) => {   
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq('Este email já está sendo usado');
            })
        })
    })
})
