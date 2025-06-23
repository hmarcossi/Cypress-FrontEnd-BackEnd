import { faker } from "@faker-js/faker";

/**
 * Gera dados de produto falsos para testes.
 * A função permite sobrescrever qualquer campo para cenários de teste específicos.
 * Exemplo: gerar um produto sem nome: const productData = generateProductData({nome: ''})
 * @param {object} overrides - Um objeto para sobrescrever os dados padrão gerados.
 * @returns {{nome: string, preco: string, descricao:string, quantidade: string}}
 */

export function generateProductData(overrides = {}) {
    const defaultData = {
        nome: faker.commerce.productName(),
        preco: faker.commerce.price({min: 1, max: 1000, dec: 2}),
        descricao: faker.commerce.productDescription(),
        quantidade: faker.string.numeric(3)
    };

    return {
        ...defaultData,
        ...overrides
    };
}