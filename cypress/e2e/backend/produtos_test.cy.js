import { generateUserData } from '../../factories/user_data';
import { generateProductData } from '../../factories/product_data';

let token;

before(() => {
    cy.createUserAndGetToken({ administrador: 'true' })
        .then(resToken => {
            token = resToken;
        });
});

describe('Testes E2E Backend de Produto', () => {
    it('Criar produto com sucesso', () => {
            let payload = generateProductData();
            cy.createProduct(token, payload)
            .then((response) => {
                
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq("Cadastro realizado com sucesso");
                expect(response.body._id).to.be.a('string');
                expect(response.body._id).to.have.length(16);                
            })
    });

    it('Criar produto sem nome', () => {
            let payload = generateProductData({nome: ''});
            cy.createProduct(token, payload)
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.nome).to.eq("nome não pode ficar em branco");
            })
    });

    it('Criar produto sem token', () => {
        let payload = generateProductData();
        
        cy.createProduct("", payload)
        .then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
        })
    });

    it('Editar produto com sucesso', () => {
        let payload = generateProductData();
        let editedPayload = generateProductData({ nome: `${payload.nome} (Editado)` });
        
        cy.createProduct(token, payload).then((response) => {
            expect(response.status).to.eq(201);
            cy.getProduct(payload.nome).then(({idProduct}) => {
                cy.updateProduct(token, idProduct, editedPayload)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Registro alterado com sucesso");
                })
                })
        })     
    });

    it('Deletar produto com sucesso', () => {
            let payload = generateProductData();
            cy.createProduct(token, payload).then((response) => {
                expect(response.status).to.eq(201);
            })
            cy.getProduct(payload.nome).then(({idProduct}) => {
                cy.deleteProduct(token, idProduct)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Registro excluído com sucesso");
                })
            })
    });

    it('Deletar produto inexistente', () => {
            cy.deleteProduct(token, "1234567890123456")
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq("Nenhum registro excluído");
            })
    });
    
    it('Deletar produto sem token', () => {
        cy.deleteProduct("", "1234567890123456")
        .then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
        })
    });

});
