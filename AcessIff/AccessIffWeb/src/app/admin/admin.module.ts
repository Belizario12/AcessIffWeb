import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutesModule } from './admin.routing';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmissaoAlertasComponent } from './pages/emissao-alertas/emissao-alertas.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { QrCodeComponent } from './pages/qr-code/qr-code.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    HomeComponent,
    AlunoComponent,
    FuncionarioComponent,
    EditModalComponent,
    DeleteModalComponent,
    CalendarioComponent,
    EmissaoAlertasComponent,
    HorarioComponent,
    QrCodeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutesModule,
    MatSortModule,
    MatTableModule,
    InfiniteScrollModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FullCalendarModule,
    MatSelectModule,
  ]
})
export class AdminModule { }
