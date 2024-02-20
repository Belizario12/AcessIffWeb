import { Injectable } from '@angular/core';
import { LoginControllerService } from '../LoginController/login-controller.service';
import { CookieControllerService } from '../CookieController/cookie-controller.service';
import { AlunoControllerService } from '../AlunoController/aluno-controller.service';
import { UsuarioControllerService } from '../UsuarioController/usuario-controller.service';
import { AlertaControllerService } from '../AlertaController/alerta-controller.service';
import { TurmaControllerService } from '../TurmaController/turma-controller.service';
import { HorarioService } from '../HorarioController/horario.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfControllerService {

  constructor(
    public loginController: LoginControllerService,
    public cookieController: CookieControllerService,
    public alunoController: AlunoControllerService,
    public usuarioController: UsuarioControllerService,
    public alertaController: AlertaControllerService,
    public turmaController: TurmaControllerService,
    public horarioController: HorarioService,
  ) { }
}
