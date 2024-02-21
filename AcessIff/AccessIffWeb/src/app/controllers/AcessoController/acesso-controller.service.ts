import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataResponse } from 'src/app/interfaces/metadata';
import { UnitOfWorkService } from 'src/app/services/UnitOfWork/unit-of-work.service';

@Injectable({
  providedIn: 'root'
})
export class AcessoControllerService {

  constructor(
    private context: UnitOfWorkService
  ) { }

  getAcessos(matricula: string, data: string): Observable<MetadataResponse> {
    return this.context.acessoService.getAcessos(matricula, data);
  }
}
