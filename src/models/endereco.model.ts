export class Endereco {
    constructor(
        public id: string,
        public rua: string,
        public cidade: string,
        public estado: string,
        public cep: number
    ) {}
}
