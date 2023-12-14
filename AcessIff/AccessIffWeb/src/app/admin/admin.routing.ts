import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';

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
    ]
  },
];

export const AdminRoutesModule = RouterModule.forChild(routes);
