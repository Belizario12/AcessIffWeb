import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioControllerService {

  constructor(
    private context: UnitOfWorkService,
  ) { }

  public getUsuario(pageNumber: number, pageSize: number) {
    return this.context.usuarioService.getUsuario(pageNumber, pageSize);
  }

  public postUsuario(usuario: any) {
    return this.context.usuarioService.postUsuario(usuario);
  }

  public putUsuario(usuario: any) {
    return this.context.usuarioService.putUsuario(usuario);
  }

  public deleteUsuario(id: string) {
    return this.context.usuarioService.deleteUsuario(id);
  }

  public returnUsuarioEmpty() {
    const usuario: Usuario = {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cargo: 1,
    }
    return usuario;
  }
}
