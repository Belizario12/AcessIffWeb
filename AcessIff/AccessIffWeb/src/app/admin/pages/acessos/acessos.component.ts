import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { RelatorioAcessosComponent } from '../../components/relatorio-acessos/relatorio-acessos.component';

@Component({
  selector: 'app-acessos',
  templateUrl: './acessos.component.html',
  styleUrls: ['./acessos.component.scss']
})
export class AcessosComponent {
  selectedFilter: string | null = 'todos';
  selectedActivateFilter: string | null = '1';
  currentPage = 1;
  totalPages = 1;
  pageSize = 15;
  dataSource = new MatTableDataSource<any>();
  pesquisaControl = new FormControl();
  displayedColumns: string[] = [
    'matricula',
    'name',
    'email',
    'relatorio'
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadAlunos(this.currentPage, this.pageSize);
    this.openReport(this.dataSource.data[0]);
  }

  applyFilter(pesquisaValue: FormControl) {
    if (pesquisaValue.value === '') {
      this.loadAlunos(this.currentPage, this.pageSize);
    } else {
      console.log(pesquisaValue.value.trim().toLowerCase())
      this.controller.alunoController
      .GetAlunoByName(pesquisaValue.value.trim().toLowerCase(), this.currentPage=1, this.pageSize)
        .subscribe({
          next: (data: any) => {
            console.log(data)
            const users = data.metadata.data;
            this.dataSource.data = users;
          },
          error: (error) => {
            console.log(error)
            this.dataSource = new MatTableDataSource<any>();
          },
        });
    }
  }

  loadAlunos(pageNumber: number, pageSize: number) {
    this.controller.alunoController.GetAlunos(pageNumber, pageSize).subscribe({
      next: (result: any) => {
        console.log(result);
        this.dataSource.data = result.metadata.data;
      },
      error: (error: any) => {
        this.toastr.error("Não foi possível buscar os alunos!", "Erro!");
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(
        `Ordenado por ${sortState.active} ${sortState.direction}`
      );
    } else {
      this._liveAnnouncer.announce('Ordenamento removido');
    }
  }

  openReport(element: any) {
    this.dialog.open(RelatorioAcessosComponent, {
      width: '60%',
      height: '80%',
      data: {
        element: element
      }
    })
  }

  back() {
    window.history.back();
  }
}
