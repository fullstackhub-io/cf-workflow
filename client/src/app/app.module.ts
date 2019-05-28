import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageUserComponent } from './admin/user/manage-user/manage-user.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { ManageRoleComponent } from './admin/role/manage-role/manage-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { ManageRightComponent } from './admin/right/manage-right/manage-right.component';
import { RightListComponent } from './admin/right/right-list/right-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDeleteComponent } from './shared/messages/confirm-delete/confirm-delete.component';
import { ConfirmDeleteModal } from './shared/confirm-delete';
import { IndexComponent } from './admin/index/index.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageUserComponent,
    UserListComponent,
    ManageRoleComponent,
    RoleListComponent,
    ManageRightComponent,
    RightListComponent,
    ConfirmDeleteComponent,
    ConfirmDeleteModal,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  entryComponents: [ManageRightComponent, ManageRoleComponent,ManageUserComponent, ConfirmDeleteComponent, ConfirmDeleteModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
