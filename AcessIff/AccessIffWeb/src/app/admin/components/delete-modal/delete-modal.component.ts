import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  constructor(
    private matDialogRef: MatDialogRef<DeleteModalComponent>,
    private toastr: ToastrService,
    private controller: UnitOfControllerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  save() {
    this.controller.alunoController.DeleteAluno(this.data.element.id).subscribe({
      next: (result: any) => {
        this.toastr.success(result.message, "Sucesso!");
        this.matDialogRef.close();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, "Erro!");
      }
    })
  }

  fechar() {
    this.matDialogRef.close();
  }
}
