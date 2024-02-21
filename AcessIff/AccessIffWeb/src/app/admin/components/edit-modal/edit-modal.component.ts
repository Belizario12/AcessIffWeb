import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { Aluno } from 'src/app/interfaces/aluno';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  showTemplate: string = "Create";
  alunoForm!: FormGroup;
  funcionarioForm!: FormGroup;
  alertaForm!: FormGroup;
  alunoObj: Aluno = this.controller.alunoController.getAlunoEmpty();
  funcionarioObj: Usuario = this.controller.usuarioController.returnUsuarioEmpty();
  opcoes: any[] = [];
  hide: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
  ) {
    if (data.cargo === 'funcionario') {
      this.funcionarioForm = this.fb.group({
        matricula: [data.element && data.element.matricula || '', Validators.required],
        nome: [data.element && data.element.nome || '', Validators.required],
        email: [data.element && data.element.email || '', Validators.required],
        senha: [data.element && data.element.senha || '', Validators.required],
      })
    }
    if(data.cargo === 'aluno') {
      this.alunoForm = this.fb.group({
        matricula: [data.element && data.element.aluno.matricula || '', Validators.required],
        nome: [data.element && data.element.nome || '', Validators.required],
        email: [data.element && data.element.email || '', Validators.required],
        senha: [data.element && data.element.senha || '', Validators.required],
        rg: [data.element && data.element.aluno.rg || ''],
        cpf: [data.element && data.element.aluno.cpf || '', Validators.required],
        dataNascimento: [data.element && data.element.aluno.dataNascimento || '', Validators.required],
        genero: [data.element && data.element.aluno.genero || ''],
        endereco: [data.element && data.element.aluno.endereco || '', Validators.required],
        telefone: [data.element && data.element.aluno.telefone || '', Validators.required],
        turma: [data.element && data.element.aluno.turma || '', Validators.required],
      })
    }

    if(data.type === "alerta") {
      this.alertaForm = this.fb.group({
        titulo: [data.element && data.element.titulo || '', Validators.required],
        descricao: [data.element && data.element.descricao || '', Validators.required],
      })
    }
  }

  ngOnInit(): void {
    if(this.data.cargo === 'aluno') {
      this.controller.turmaController.getTurmas(1, 100).subscribe({
        next: (result: any) => {
          this.opcoes = result.metadata.data;
        },
        error: (error: any) => {
          this.toastr.error("Não foi possível carregar as turmas!", "Erro!");
        }
      })
    }

    if(this.data.type === "Edit" && this.data.cargo === 'aluno') {
      this.controller.alunoController.GetAlunoByMatricula(this.data.element.matricula).subscribe({
        next: (response: any) => {
          this.alunoForm.get('turma')?.setValue(response.metadata.data.turma.nome);
          this.alunoObj.turmaId = response.metadata.data.turma.id;
        },
        error: (error: any) => {

          this.toastr.error("Não foi possível carregar as turmas!", "Erro!");
        }
      })
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  saveAluno(): void {
    if(this.data.type === "Create") {
      this.alunoObj.matricula = this.alunoForm.get('matricula')?.value?.toString();
      this.alunoObj.nome = this.alunoForm.get('nome')?.value;
      this.alunoObj.email = this.alunoForm.get('email')?.value;
      this.alunoObj.senha = this.alunoForm.get('senha')?.value;
      this.alunoObj.rg = this.alunoForm.get('rg')?.value?.toString();
      this.alunoObj.cpf = this.alunoForm.get('cpf')?.value?.toString();
      this.alunoObj.dataNascimento = this.alunoForm.get('dataNascimento')?.value;
      this.alunoObj.genero = this.alunoForm.get('genero')?.value;
      this.alunoObj.endereco = this.alunoForm.get('endereco')?.value;
      this.alunoObj.telefone = this.alunoForm.get('telefone')?.value;
      this.alunoObj.turmaId = this.opcoes.find((turma: any) => turma.nome === this.alunoForm.get('turma')?.value).id;
      this.controller.alunoController.PostAluno(this.alunoObj).subscribe({
        next: (result: any) => {
          this.toastr.success(result.message, "Sucesso!");
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error: any) => {

          this.toastr.error("Não foi possível criar o aluno!", "Erro!");
        }
      })
    } else if (this.data.type === "Edit") {
      this.alunoObj.id = this.data.element.id;
      this.alunoObj.matricula = this.alunoForm.get('matricula')?.value?.toString();
      this.alunoObj.nome = this.alunoForm.get('nome')?.value;
      this.alunoObj.email = this.alunoForm.get('email')?.value;
      this.alunoObj.senha = this.alunoForm.get('senha')?.value;
      this.alunoObj.rg = this.alunoForm.get('rg')?.value?.toString();
      this.alunoObj.cpf = this.alunoForm.get('cpf')?.value?.toString();
      this.alunoObj.dataNascimento = this.alunoForm.get('dataNascimento')?.value;
      this.alunoObj.genero = this.alunoForm.get('genero')?.value;
      this.alunoObj.endereco = this.alunoForm.get('endereco')?.value;
      this.alunoObj.telefone = this.alunoForm.get('telefone')?.value;
      this.controller.alunoController.PutAluno(this.alunoObj).subscribe({
        next: (result: any) => {
          this.toastr.success(result.message, "Sucesso!");
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error: any) => {

          this.toastr.error("Não foi possível atualizar o aluno!", "Erro!");
        }
      })
    }
  }

  saveFuncionario(): void {
    if(this.data.type === "Create") {
      this.funcionarioObj.matricula = this.funcionarioForm.get('matricula')?.value?.toString();
      this.funcionarioObj.nome = this.funcionarioForm.get('nome')?.value;
      this.funcionarioObj.email = this.funcionarioForm.get('email')?.value;
      this.funcionarioObj.senha = this.funcionarioForm.get('senha')?.value;
      this.funcionarioObj.cargo = 2;
      this.controller.usuarioController.postUsuario(this.funcionarioObj).subscribe({
        next: (result: any) => {
          this.toastr.success(result.message, "Sucesso!");
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error: any) => {

          this.toastr.error("Não foi possível criar o funcionário!", "Erro!");
        }
      })
    } else if (this.data.type === "Edit") {
      this.funcionarioObj.id = this.data.element.id;
      this.funcionarioObj.matricula = this.funcionarioForm.get('matricula')?.value?.toString();
      this.funcionarioObj.nome = this.funcionarioForm.get('nome')?.value;
      this.funcionarioObj.email = this.funcionarioForm.get('email')?.value;
      this.funcionarioObj.cargo = 2;
      this.controller.usuarioController.putUsuario(this.funcionarioObj).subscribe({
        next: (result: any) => {
          this.toastr.success(result.message, "Sucesso!");
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error: any) => {

          this.toastr.error("Não foi possível atualizar o funcionário!", "Erro!");
        }
      })
    }
  }

  saveAlerta(): void {
    this.controller.alertaController.putAlerta(this.alertaForm.value, this.data.element.id).subscribe({
      next: (result: any) => {
        this.toastr.success(result.message, "Sucesso!");
        this.dialogRef.close();
        window.location.reload();
      },
      error: (error: any) => {

        this.toastr.error("Não foi possível atualizar o alerta!", "Erro!");
      }
    })
  }
}
