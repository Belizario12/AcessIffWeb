import { Injectable } from '@angular/core';
import { LoginService } from '../Login/login.service';
import { CookieGeneratorService } from '../Cookie/cookie-generator.service';
import { UsuarioService } from '../Usuario/usuario.service';
import { AlunoService } from '../Aluno/aluno.service';
import { CalendarioService } from '../Calendario/calendario.service';
import { AlertasService } from '../Alertas/alertas.service';
import { TurmaService } from '../Turma/turma.service';
import { HorarioService } from '../Horario/horario.service';
import { EventosService } from '../Eventos/eventos.service';
import { AcessoService } from '../Acesso/acesso.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfWorkService {

  constructor(
    public loginService: LoginService,
    public cookieGeneratorService: CookieGeneratorService,
    public usuarioService: UsuarioService,
    public alunoService: AlunoService,
    public calendarioService: CalendarioService,
    public alertaService: AlertasService,
    public turmaService: TurmaService,
    public horarioService: HorarioService,
    public eventosService: EventosService,
    public acessoService: AcessoService
  ) { }
}
