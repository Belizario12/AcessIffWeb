import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { horarioPadrao } from 'src/app/utils/horarioPadrao';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-horarios',
  templateUrl: './lista-horarios.component.html',
  styleUrls: ['./lista-horarios.component.scss']
})
export class ListaHorariosComponent {
  turmas!: any[];
  turmaForm!: FormGroup;
  displayedColumns: string[] = ["HorarioInicio", "HorarioFim", "Disciplina", "Editar", "Excluir"];

  diasSemana = [
    { nome: 'Segunda-Feira', dataSource: new MatTableDataSource<any>() },
    { nome: 'Terca-Feira', dataSource: new MatTableDataSource<any>() },
    { nome: 'Quarta-Feira', dataSource: new MatTableDataSource<any>() },
    { nome: 'Quinta-Feira', dataSource: new MatTableDataSource<any>() },
    { nome: 'Sexta-Feira', dataSource: new MatTableDataSource<any>() }
  ];

  constructor(
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.turmaForm = this.fb.group({
      turmas: ['', Validators.required]
    });

    this.diasSemana.forEach(dia => {
      // Faça uma cópia profunda dos dados do horarioPadrao
      const horariosDoDia = JSON.parse(JSON.stringify(horarioPadrao));

      // Atualize o campo "dia" de cada objeto nos dados
      horariosDoDia.forEach((horario: any) => {
        horario.dia = dia.nome;
      });
      dia.dataSource.data = horariosDoDia;
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

  onSelection(event: any) {
    this.controller.horarioController.getHorarios(event.value, 1, 10).subscribe({
      next: (response) => {
        response.metadata.data.forEach((response: any) => {
          this.diasSemana.forEach((dia) => {
            if (dia.nome === response.dia) {
              dia.dataSource.data.forEach((element: any) => {
                if (element.horarioInicio === response.horarioInicio) {
                  element.disciplina = response.disciplina;
                  element.id = response.id;
                }
              })
              dia.dataSource = new MatTableDataSource(dia.dataSource.data);
            }
          });
        })
      },
      error: (error) => {
        this.toast.error("Erro ao buscar horários");
        console.error(error);
      }
    });
  }

  imprimir (element: any) {
    (element);
  }

  edit(element: any) {
    this.router.navigate(["admin/horario", element.id, this.turmas[0].id, element.dia, element.horarioInicio, element.horarioFim, element.disciplina]);
  }

  openModal(type: string, element?: any) {
    type === 'Delete' ? this.dialog.open(DeleteModalComponent, {
      data: {
        type: 'horario',
        element: element,
      }
    }) : null;
  }
}
