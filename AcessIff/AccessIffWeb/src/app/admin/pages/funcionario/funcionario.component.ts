import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent {
  selectedFilter: string | null = 'todos';
  selectedActivateFilter: string | null = '1';
  currentPage = 1;
  totalPages = 1;
  pageSize = 15;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'name',
    'email',
    'edit',
    'delete',
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private controler: UnitOfControllerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadFuncionarios(this.currentPage, this.pageSize);
  }

  loadFuncionarios(pageNumber: number, pageSize: number) {
    this.controler.usuarioController.getUsuario(pageNumber, pageSize).subscribe({
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

  openModal(type: string, element?: any) {
    type === 'Edit' ? this.dialog.open(EditModalComponent,
      {
        data: {
          type: 'Edit',
          cargo: "funcionario",
          element: element,
        }
      }) : null;
    type === 'Delete' ? this.dialog.open(DeleteModalComponent, {
      data: {
        type: 'Delete',
        cargo: "funcionario",
        element: element,
      }
    }) : null;
    type === 'Create' ? this.dialog.open(EditModalComponent, {
      data: {
        type: 'Create',
        cargo: "funcionario",
        element: {
          aluno: null
        }
      }
    }) : null;
  }

  back() {
    window.history.back();
  }
}
