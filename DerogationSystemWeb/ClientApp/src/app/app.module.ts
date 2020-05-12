import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./view/main/MainComponent";
import { DepartmentListComponent } from "./view/departments/DepartmentListComponent";
import { DepartmentFormComponent } from './view/departments/DepartmentFormComponent';
import { UsersComponent } from "./view/users/UsersComponent";
import { DerogationListComponent } from "./view/derogationList/DerogationListComponent";
import { DepartmentEdtComponent } from './view/departments/DepartmentEdtComponent';


const appRoutes: Routes = [
    { path: "", component: DerogationListComponent },
    { path: "departments", component: DepartmentListComponent },
    { path: "departments/department/:id", component: DepartmentEdtComponent },
    { path: "users", component: UsersComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        MainComponent, DepartmentListComponent, DepartmentEdtComponent,
        DepartmentFormComponent, UsersComponent, DerogationListComponent
    ],
    bootstrap: [MainComponent]
})
export class AppModule {
}