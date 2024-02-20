import { AlertasService } from './../../../services/Alertas/alertas.service';
import { Component } from '@angular/core';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-alertas',
  templateUrl: './lista-alertas.component.html',
  styleUrls: ['./lista-alertas.component.scss']
})
export class ListaAlertasComponent {
  selectedFilter: string | null = 'todos';
  selectedActivateFilter: string | null = '1';
  currentPage = 1;
  totalPages = 1;
  pageSize = 15;
  dataSource = new MatTableDataSource<any>();
  pesquisaControl = new FormControl();
  displayedColumns: string[] = [
    'titulo',
    'descricao',
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
    this.loadAlertas(this.currentPage, this.pageSize);
  }

  applyFilter(pesquisaValue: FormControl) {
    console.log(pesquisaValue.value)
    if (pesquisaValue.value === '') {
      this.loadAlertas(this.currentPage, this.pageSize);
    } else {
      this.controller.alertaController
        .getAlertaByNome(pesquisaValue.value.trim().toLowerCase(), this.currentPage=1, this.pageSize)
        .subscribe({
          next: (data) => {
            const users = data.metadata.data;
            this.dataSource.data = users;
          },
          error: () => {
            this.dataSource = new MatTableDataSource<any>();
          },
        });
    }
  }

  loadAlertas(pageNumber: number, pageSize: number) {
    this.controller.alertaController.getAlertas(pageNumber, pageSize).subscribe({
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
      this.loadAlertas(this.currentPage, this.pageSize);
    }
  }

  openModal(type?: string, element?: any) {
    type === 'Delete' ? this.dialog.open(DeleteModalComponent, {
      data: {
        type: 'alerta',
        cargo: "aluno",
        element: element,
      }
    }) : null;
    type === 'Edit' ? this.dialog.open(EditModalComponent, {
      width: '500px',
      data: {
        type: 'alerta',
        element: element,
      }
    }) : null;
  }

  redirect() {
    this.route.navigate(['/admin/emitir-alertas']);
  }

  back() {
    window.history.back();
  }
}
