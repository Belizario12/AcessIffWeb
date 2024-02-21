import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';

@Component({
  selector: 'app-relatorio-acessos',
  templateUrl: './relatorio-acessos.component.html',
  styleUrls: ['./relatorio-acessos.component.scss']
})
export class RelatorioAcessosComponent {
  selectedFilter: string | null = 'todos';
  selectedActivateFilter: string | null = '1';
  currentPage = 1;
  totalPages = 1;
  pageSize = 15;
  dataSource = new MatTableDataSource<any>();
  pesquisaControl = new FormControl();
  displayedColumns: string[] = [
    'horario',
    'tipo',
    'matricula',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RelatorioAcessosComponent>,
  ) {}

  ngOnInit(): void {
    (this.data)
  }

  selection() {
    this.controller.acessoController.getAcessos(this.data.element.matricula, this.pesquisaControl.value).subscribe({
      next: (response) => {
        if(response.metadata.data.length === 0) {
          this.toastr.warning("Não ná nenhum acesso nesta data.", "Aviso")
        }
        this.dataSource.data = response.metadata.data;
      },
      error: (error) => {

        this.toastr.error(error.error.erros[0].message, "Erro")
      }
    })
  }

  back() {
    this.dialogRef.close()
  }
}
