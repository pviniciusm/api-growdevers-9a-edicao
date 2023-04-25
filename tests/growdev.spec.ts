describe("Testes de growdevers", () => {
    test("Um growdever deve conter um nome válido", () => {
        const result = {
            nome: "Teste abc",
            idade: 20,
            id: 123,
        };

        expect(result).toBeDefined();
        expect(result).toHaveProperty("nome");
        // expect(result).toHaveProperty("nome", "Teste abc");

        let nome = result.nome;
        expect(nome.split(" ").length).toBeGreaterThanOrEqual(2);
        expect(nome.split(" ")).toHaveLength(2);
    });

    test("Um growdever deve ser maior de idade", () => {
        const result = {
            nome: "Teste abc",
            idade: 20,
            id: 123,
        };

        expect(result).toBeDefined();
        expect(result).toHaveProperty("idade");
        expect(result.idade).toBeGreaterThanOrEqual(18);
    });
});
