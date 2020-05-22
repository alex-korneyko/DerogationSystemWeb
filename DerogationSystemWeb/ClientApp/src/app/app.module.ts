import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { UserApiService } from "./controllers/UserApiService";
import { DepartmentApiService } from "./controllers/DepartmentApiService";

import { MainComponent } from "./view/main/MainComponent";
import { IndexPageComponent } from './view/indexPage/IndexPageComponent';
import { DepartmentListComponent } from "./view/departments/DepartmentList/DepartmentListComponent";
import { DepartmentFormComponent } from "./view/departments/DepartmentForm/DepartmentFormComponent";
import { UserListComponent } from "./view/users/UserList/UserListComponent";
import { UserFormComponent } from "./view/users/UserForm/UserFormComponent";
import { UserCrtComponent } from "./view/users/UserCreate/UserCrtComponent";
import { UserEdtComponent } from "./view/users/UserEdit/UserEdtComponent";
import { DerogationListComponent } from "./view/derogationList/DerogationListComponent";
import { DepartmentCrtComponent } from "./view/departments/DepartmentCreate/DepartmentCrtComponent";
import { DepartmentEdtComponent } from "./view/departments/DepartmentEdit/DepartmentEdtComponent";
import { TopNavBarComponent } from "./view/CommonComponents/TopNavBar/TopNavBarComponent";
import { StringValCheckBox } from "./view/CommonComponents/CheckBox/StringValCheckBox";
import { LoginApiService } from "./controllers/LoginApiService";
import { DerogationApiService } from "./controllers/DerogationApiService";
import { DataFilterComponent } from "./view/derogationList/components/leftPanel/dataFilter/DataFilterComponent";
import { DateRangeComponent } from "./view/derogationList/components/leftPanel/dateRange/DateRangeComponent";
import { StatusFilterComponent } from "./view/derogationList/components/leftPanel/statusFilter/StatusFilterComponent";
import { LeftPanelComponent } from "./view/derogationList/components/leftPanel/leftPanelComponent/LeftPanelComponent";
import { ShowLastCountComponent } from
    "./view/derogationList/components/leftPanel/ShowLastCount/ShowLastCountComponent";
import { MainPanelComponent } from "./view/derogationList/components/mainPanel/MainPanelComponent";
import { DerogationHeaderRow } from
    "./view/derogationList/components/mainPanel/components/dHeaderRow/DerogationHeaderRow";
import { DerogationRequestModel } from "./model/requestModel/DerogationRequestModel";


const appRoutes: Routes = [
    { path: "", component: IndexPageComponent },
    { path: "derogations", component: DerogationListComponent },
    { path: "departments", component: DepartmentListComponent },
    { path: "departments/department/:id", component: DepartmentEdtComponent },
    { path: "departments/newDepartment", component: DepartmentCrtComponent },
    { path: "users/user/:id", component: UserEdtComponent },
    { path: "users/newUser", component: UserCrtComponent},
    { path: "users", component: UserListComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        MainComponent, DepartmentListComponent, DepartmentEdtComponent, DepartmentCrtComponent, TopNavBarComponent, StringValCheckBox,
        DepartmentFormComponent, UserListComponent, DerogationListComponent, UserFormComponent, UserEdtComponent, UserCrtComponent,
        DataFilterComponent, DateRangeComponent, StatusFilterComponent, LeftPanelComponent, MainPanelComponent, ShowLastCountComponent,
        DerogationHeaderRow
    ],
    bootstrap: [MainComponent],
    providers: [LoginApiService, UserApiService, DepartmentApiService, DerogationApiService, DerogationRequestModel]
})
export class AppModule {
}