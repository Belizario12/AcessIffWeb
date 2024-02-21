import { Component } from '@angular/core';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TurmasModalComponent } from '../../components/turmas-modal/turmas-modal.component';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent {
  selectedFilter: string | null = 'todos';
  selectedActivateFilter: string | null = '1';
  currentPage = 1;
  totalPages = 1;
  pageSize = 15;
  dataSource = new MatTableDataSource<any>();
  pesquisaControl = new FormControl();
  displayedColumns: string[] = [
    'nome',
    'edit',
    'delete',
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadTurmas(this.currentPage, this.pageSize);
  }

  applyFilter(pesquisaValue: FormControl) {
    (pesquisaValue.value)
    if (pesquisaValue.value === '') {
      this.loadTurmas(this.currentPage, this.pageSize);
    } else {
      this.controller.turmaController
        .getTurmaByNome(pesquisaValue.value.trim().toLowerCase(), this.currentPage=1, this.pageSize)
        .subscribe({
          next: (data: any) => {
            const turma = data.metadata.data;
            this.dataSource.data = turma;
          },
          error: () => {
            this.dataSource = new MatTableDataSource<any>();
          },
        });
    }
  }

  loadTurmas(pageNumber: number, pageSize: number) {
    this.controller.turmaController.getTurmas(pageNumber, pageSize).subscribe({
      next: (result: any) => {
        this.dataSource.data = result.metadata.data;
      },
      error: () => {
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
      this.loadTurmas(this.currentPage, this.pageSize);
    }
  }

  openModal(type?: string, element?: any) {
    type === 'Create' ? this.dialog.open(TurmasModalComponent, {
      width: '500px',
      data: {
        type: 'Create',
        element: {
          nome: '',
        }
      }
    }) : null;
    type === 'Edit' ? this.dialog.open(TurmasModalComponent, {
      width: '500px',
      data: {
        type: 'Edit',
        element: element,
      }
    }) : null;
    type === 'Delete' ? this.dialog.open(TurmasModalComponent, {
      width: '500px',
      data: {
        type: 'Delete',
        element: element,
      }
    }) : null;
  }

  redirect() {
    this.openModal('Create');
  }

  back() {
    window.history.back();
  }
}
