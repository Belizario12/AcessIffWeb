import { Injectable } from '@angular/core';
import { LoginService } from '../Login/login.service';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';
import { UsuarioService } from '../Usuario/usuario.service';
import { AlunoService } from '../Aluno/aluno.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfWorkService {

  constructor(
    public loginService: LoginService,
    public cookieGeneratorService: CookieGeneratorService,
    public usuarioService: UsuarioService,
    public alunoService: AlunoService,
  ) { }
}
