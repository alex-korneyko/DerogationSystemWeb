import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { LoginApiService } from "./controllers/LoginApiService";
import { AuthInterceptor } from './model/services/AuthInterceptor';
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
import { WebsocketService } from './model/services/WebsocketService';
import { DerogationComponent } from "./view/derogationPage/DerogationComponent";
import { DergLeftPanelComponent } from "./view/derogationPage/leftPanel/DergLeftPanelComponent";
import { DergMainPanelComponent } from "./view/derogationPage/mainPanel/DergMainPanelComponent";
import { DerogationItemsListComponent } from
    "./view/derogationPage/mainPanel/derogationItemsList/DerogationItemsListComponent";
import { InvolvedDepartmentsListComponent } from
    "./view/derogationPage/mainPanel/involvedDepartmentsList/InvolvedDepartmentsListComponent";
import { DerogationDocsListComponent } from
    "./view/derogationPage/mainPanel/derogationDocs/DerogationDocsListComponent";
import { DerogationMailListComponent } from "./view/derogationPage/mainPanel/mailList/DerogationMailListComponent";
import { InvolvedDepartmentRowComponent } from
    "./view/derogationPage/mainPanel/involvedDepartmentsList/involvedDerpartmentRow/InvolvedDepartmentRowComponent";
import { DerogationItemRowComponent } from
    "./view/derogationPage/mainPanel/derogationItemsList/derogationItemRow/DerogationItemRowComponent";
import { ApprovalComponent } from "./view/derogationPage/leftPanel/approval/ApprovalComponent";
import { CancellationComponent } from "./view/derogationPage/leftPanel/cancellation/CancellationComponent";
import { EngAndFiOptionsComponent } from "./view/derogationPage/leftPanel/engAndFiOptions/EngAndFiOptionsComponent";
import { EngOperatorBoxComponent } from "./view/derogationPage/mainPanel/engOperatorBox/EngOperatorBoxComponent";
import { MailListRowComponent } from "./view/derogationPage/mainPanel/mailList/mailListRow/MailListRowComponent";
import { OperatorRowComponent } from './view/derogationPage/mainPanel/engOperatorBox/operatorRow/OperatorRowComponent';
import { NewDergLeftPanelComponent } from "./view/NewDerogationPage/LeftPanel/NewDergLeftPanelComponent";
import { NewDerogationComponent } from "./view/NewDerogationPage/NewDerogationComponent";
import { WorkOrderDashboardComponent } from
    "./view/NewDerogationPage/LeftPanel/WorkOrderDashboard/WorkOrderDashboardComponent";
import { PartNumberDashboardComponent } from
    "./view/NewDerogationPage/LeftPanel/PartNumberDashboard/PartNumberDashboardComponent";
import { NewDergMainPanelComponent } from "./view/NewDerogationPage/MainPanel/NewDergMainPanelComponent";
import { DeptsInvolvingComponent } from "./view/NewDerogationPage/MainPanel/DeptsIvolvingList/DeptsInvolvingComponent";
import { WorkOrderListComponent } from
    "./view/NewDerogationPage/LeftPanel/WorkOrderDashboard/WorkOrderList/WorkOrderListComponent";
import { WorkOrderListRowComponent } from
    "./view/NewDerogationPage/LeftPanel/WorkOrderDashboard/WorkOrderList/WorkOrderListRow/WorkOrderListRowComponent";
import { WorkOrderApiService } from "./controllers/WorkOrderApiService";
import { MaterialsApiService } from "./controllers/MaterialsApiService";
import { PartNumberListComponent } from
    "./view/NewDerogationPage/LeftPanel/PartNumberDashboard/PartNumberList/PartNumberListComponent";
import { PartNumberRowComponent } from
    "./view/NewDerogationPage/LeftPanel/PartNumberDashboard/PartNumberList/PartNumberRow/PartNumberRowComponent";
import { DeptInvolvedRowComponent } from
    "./view/NewDerogationPage/MainPanel/DeptsIvolvingList/DeptInvolvedRow/DeptInvolvedRowComponent";
import { AccessDeniedComponent } from "./view/AccessDeniedPage/AccessDeniedComponent";
import { DerogationDocRowComponent } from
    "./view/derogationPage/mainPanel/derogationDocs/DerogationDocRow/DerogationDocRowComponent";
import { FileApiService } from "./controllers/FileApiService";

const appRoutes: Routes = [
    { path: "", component: IndexPageComponent },
    { path: "static/accessDenied", component: AccessDeniedComponent},
    { path: "derogations", component: DerogationListComponent },
    { path: "departments", component: DepartmentListComponent },
    { path: "departments/department/:id", component: DepartmentEdtComponent },
    { path: "departments/newDepartment", component: DepartmentCrtComponent },
    { path: "users/user/:id", component: UserEdtComponent },
    { path: "users/newUser", component: UserCrtComponent},
    { path: "users", component: UserListComponent },
    { path: "derogations/derogation/:id", component: DerogationComponent },
    { path: "derogations/new", component: NewDerogationComponent}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        MainComponent, DepartmentListComponent, DepartmentEdtComponent, DepartmentCrtComponent, TopNavBarComponent, StringValCheckBox,
        DepartmentFormComponent, UserListComponent, DerogationListComponent, UserFormComponent, UserEdtComponent, UserCrtComponent,
        DataFilterComponent, DateRangeComponent, StatusFilterComponent, LeftPanelComponent, MainPanelComponent, ShowLastCountComponent,
        DerogationHeaderRow, DerogationComponent, DergLeftPanelComponent, DergMainPanelComponent, DerogationItemsListComponent,
        InvolvedDepartmentsListComponent, DerogationDocsListComponent, DerogationMailListComponent, InvolvedDepartmentRowComponent,
        DerogationItemRowComponent, ApprovalComponent, CancellationComponent, EngAndFiOptionsComponent, EngOperatorBoxComponent,
        MailListRowComponent, OperatorRowComponent, IndexPageComponent, NewDerogationComponent, NewDergLeftPanelComponent,
        WorkOrderDashboardComponent, PartNumberDashboardComponent, NewDergMainPanelComponent, DeptsInvolvingComponent,
        WorkOrderListComponent, WorkOrderListRowComponent, PartNumberListComponent, PartNumberRowComponent, DeptInvolvedRowComponent,
        AccessDeniedComponent, DerogationDocRowComponent
    ],
    bootstrap: [MainComponent],
    providers: [LoginApiService, UserApiService, DepartmentApiService, DerogationApiService, DerogationRequestModel, WebsocketService,
        WorkOrderApiService, MaterialsApiService, FileApiService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AppModule {

    constructor(http: HttpClient, derogationApiService: DerogationApiService, departmentApiService: DepartmentApiService) {
        
        setInterval(() => http.get("/api/auth/refreshToken").subscribe(data => {
            sessionStorage.setItem("accessToken", data["token"]);
        }), 1800000);
    }
}