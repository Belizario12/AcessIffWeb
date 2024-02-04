import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { EmissaoAlertasComponent } from './pages/emissao-alertas/emissao-alertas.component';
import { QrCodeComponent } from './pages/qr-code/qr-code.component';
import { HorarioComponent } from './pages/horario/horario.component';

const routes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'aluno',
        component: AlunoComponent,
      },
      {
        path: 'funcionario',
        component: FuncionarioComponent,
      },
      {
        path: 'calendario',
        component: CalendarioComponent,
      },
      {
        path: 'emitir-alertas',
        component: EmissaoAlertasComponent,
      },
      {
        path: 'qrcode',
        component: QrCodeComponent,
      },
      {
        path: 'horario',
        component: HorarioComponent,
      }
    ]
  },
];

export const AdminRoutesModule = RouterModule.forChild(routes);
