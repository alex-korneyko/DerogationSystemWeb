import { Component, Input } from "@angular/core";
import { Department } from '../../../model/domain/Department'

@Component({
    selector: "department-form",
    templateUrl: "./DepartmentFormComponent.html"
})
export class DepartmentFormComponent {
    @Input()
    department: Department;
    
    @Input()
    disabled = false;
}