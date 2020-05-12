import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./view/main/MainComponent";
import { DepartmentListComponent } from "./view/departments/DepartmentListComponent";
import { UsersComponent } from "./view/users/UsersComponent";
import { DerogationListComponent } from "./view/derogationList/DerogationListComponent";
import { DepartmentComponent} from "./view/departments/DepartmentComponent";


const appRoutes: Routes = [
    { path: "", component: DerogationListComponent },
    { path: "departments", component: DepartmentListComponent },
    { path: "departments/department/:id", component: DepartmentComponent},
    { path: "users", component: UsersComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [MainComponent, DepartmentListComponent, DepartmentComponent, UsersComponent, DerogationListComponent],
    bootstrap: [MainComponent]
})
export class AppModule {
}