import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { UserApiService } from "./controllers/UserApiService";

import { MainComponent } from "./view/main/MainComponent";
import { DepartmentListComponent } from "./view/departments/DepartmentList/DepartmentListComponent";
import { DepartmentFormComponent } from "./view/departments/DepartmentForm/DepartmentFormComponent";
import { UserListComponent } from "./view/users/UserList/UserListComponent";
import { UserFormComponent } from "./view/users/UserForm/UserFormComponent";
import { UserEdtComponent } from "./view/users/UserEdit/UserEdtComponent";
import { DerogationListComponent } from "./view/derogationList/DerogationListComponent";
import { DepartmentCrtComponent } from "./view/departments/DepartmentCreate/DepartmentCrtComponent";
import { DepartmentEdtComponent } from "./view/departments/DepartmentEdit/DepartmentEdtComponent";
import { TopNavBarComponent } from "./view/CommonComponents/TopNavBar/TopNavBarComponent";



const appRoutes: Routes = [
    { path: "", component: DerogationListComponent },
    { path: "departments", component: DepartmentListComponent },
    { path: "departments/department/:id", component: DepartmentEdtComponent },
    { path: "departments/newDepartment", component: DepartmentCrtComponent },
    { path: "users/user/:id", component: UserEdtComponent},
    { path: "users", component: UserListComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        MainComponent, DepartmentListComponent, DepartmentEdtComponent, DepartmentCrtComponent, TopNavBarComponent,
        DepartmentFormComponent, UserListComponent, DerogationListComponent, UserFormComponent, UserEdtComponent
    ],
    bootstrap: [MainComponent],
    providers: [UserApiService]
})
export class AppModule {
}