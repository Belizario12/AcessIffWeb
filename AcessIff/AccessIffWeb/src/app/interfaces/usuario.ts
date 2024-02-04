export interface Usuario {
  id?: string,
  matricula?: string,
  nome: string,
  email: string,
  senha: string,
  cargo: Cargo,
}

export const enum Cargo {
  Administrador = 1,
  Funcionario = 2,
  Aluno = 3,

}
