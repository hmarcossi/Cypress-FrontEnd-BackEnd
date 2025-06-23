import { faker } from "@faker-js/faker";

/**
 * Gera dados de usuario falsos para testes.
 * É possível sobrescrever qualquer campo para cenários de teste específicos.
 * Exemplo: gerar um admin: const adminData = generateUserData({administrador: 'true'})
 * @param {object} overrides - Um objeto para sobrescrever os dados padrão gerados.
 * @returns {{nome: string, email: string, password: string, administrador: boolean}}
 **/

export function generateUserData(overrides = {}) {
    const defaultData = {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'false'
    };

    return {
        ...defaultData,
        ...overrides
    };
}

