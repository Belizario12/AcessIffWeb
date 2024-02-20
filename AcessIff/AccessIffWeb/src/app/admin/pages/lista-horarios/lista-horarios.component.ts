import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { AddHorarioModalComponent } from '../../components/add-horario-modal/add-horario-modal.component';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-horarios',
  templateUrl: './lista-horarios.component.html',
  styleUrls: ['./lista-horarios.component.scss']
})
export class ListaHorariosComponent {
  turmas!: any[];
  turmaForm!: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ["HorarioInicio", "HorarioFim", "Disciplina", "Editar", "Excluir"];

  constructor(
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.turmaForm = this.fb.group({
      turmas: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.controller.turmaController.getTurmas(1, 10).subscribe({
      next: (response) => {
        this.turmas = response.metadata.data;
      },
      error: (error) => {
        this.toast.error("Erro ao buscar turmas");
        console.error(error);
      }
    });
  }

  back() {
    window.history.back();
  }

  addHorario() {
    this.router.navigate(["admin/horario"])
  }
}
