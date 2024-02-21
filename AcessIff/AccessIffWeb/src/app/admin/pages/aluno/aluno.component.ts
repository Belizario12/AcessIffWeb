import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent {
  selectedFilter: string | null = 'todos';
  selectedActivateFilter: string | null = '1';
  currentPage = 1;
  totalPages = 1;
  pageSize = 15;
  dataSource = new MatTableDataSource<any>();
  pesquisaControl = new FormControl();
  displayedColumns: string[] = [
    'cpf',
    'name',
    'matricula',
    'edit',
    'delete',
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadAlunos(this.currentPage, this.pageSize);
  }

  applyFilter(pesquisaValue: FormControl) {
    if (pesquisaValue.value === '') {
      this.loadAlunos(this.currentPage, this.pageSize);
    } else {
      this.controller.alunoController
        .GetAlunoByName(pesquisaValue.value.trim().toLowerCase(), this.currentPage=1, this.pageSize)
        .subscribe({
          next: (data) => {
            (data)
            const users = data.metadata.data;
            this.dataSource.data = users;
          },
          error: (error) => {
            (error)
            this.dataSource = new MatTableDataSource<any>();
          },
        });
    }
  }

  loadAlunos(pageNumber: number, pageSize: number) {
    this.controller.alunoController.GetAlunos(pageNumber, pageSize).subscribe({
      next: (result: any) => {
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
      this.loadAlunos(this.currentPage, this.pageSize);
    }
  }

  openModal(type: string, element?: any) {
    type === 'Edit' ? this.dialog.open(EditModalComponent,
      {
        data: {
          type: 'Edit',
          cargo: "aluno",
          element: element,
        }
      }) : null;
    type === 'Delete' ? this.dialog.open(DeleteModalComponent, {
      data: {
        type: 'aluno',
        cargo: "aluno",
        element: element,
      }
    }) : null;
    type === 'Create' ? this.dialog.open(EditModalComponent, {
      width: '690px',
      height: '500px',
      data: {
        type: 'Create',
        cargo: "aluno",
      }
    }) : null;
  }

  back() {
    window.history.back();
  }
}
