import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './admin/index/index.component';
import { RightListComponent } from './admin/right/right-list/right-list.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { WorkFlowComponent } from './admin/work-flow/work-flow.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/workflow',
    component: WorkFlowComponent
  },
  {
    path: 'admin',
    component: AdminMenuComponent
  },
  {
    path: 'admin/index',
    component: IndexComponent
  },
  {
    path: 'admin/manageright',
    component: RightListComponent
  },
  {
    path: 'admin/managerole',
    component: RoleListComponent
  },
  {
    path: 'admin/manageuser',
    component: UserListComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
