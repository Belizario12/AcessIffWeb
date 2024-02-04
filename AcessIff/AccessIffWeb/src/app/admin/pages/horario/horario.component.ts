import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent {
  horarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.horarioForm = this.fb.group({
      disciplina: ['', Validators.required],
      curso: ['', Validators.required],
      diaSemana: ['', Validators.required],
      inicio: ['', Validators.required],
      termino: ['', Validators.required],
    });
  }

  save() {

  }

  back() {
    window.history.back();
  }
}
