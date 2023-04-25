class Calculadora {
    public somar(v1: number, v2: number): number {
        return v1 + v2;
    }
}

describe("Testes de uma calculadora", () => {
    test("Verifica se 1 + 1 é igual a 2", () => {
        const calculadora = new Calculadora();

        const result = calculadora.somar(1, 1);

        expect(result).toBeDefined();
        expect(result).toBeGreaterThan(1);
        expect(result).toBe(2);
    });
});
