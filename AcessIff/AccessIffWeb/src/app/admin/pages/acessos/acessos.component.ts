import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';

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
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadFuncionarios(this.currentPage, this.pageSize);
  }

  applyFilter(pesquisaValue: FormControl) {
    if (pesquisaValue.value === '') {
      this.loadFuncionarios(this.currentPage, this.pageSize);
    } else {
      console.log(pesquisaValue.value.trim().toLowerCase())
      this.controller.usuarioController
        .getUsuarioByName(pesquisaValue.value.trim().toLowerCase(), this.currentPage=1, this.pageSize)
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

  loadFuncionarios(pageNumber: number, pageSize: number) {
    this.controller.usuarioController.getUsuario(pageNumber, pageSize).subscribe({
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

  loadNextPage() {
    if((this.totalPages / this.pageSize) > this.currentPage) {
      this.currentPage++;
      //this.loadUsers(Number(this.selectedActivateFilter!), this.currentPage, this.pageSize);
    }
  }

  back() {
    window.history.back();
  }
}
