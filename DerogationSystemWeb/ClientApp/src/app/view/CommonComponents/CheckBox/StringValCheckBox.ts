import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";

@Component({
    templateUrl: "StringValCheckBox.html",
    selector: "str-checkbox"
})
export class StringValCheckBox implements OnInit {

    @Input() id="";
    @Input() label = "";
    @Input() strCheckedValue = "0";
    @Output() strCheckedValueChange = new EventEmitter<string>();
    @Input() isDisabled = false;
    @Input() value: boolean;

    ngOnInit(): void {
        this.value = this.isChecked();
    }

    isChecked() {
        let boolean = this.strCheckedValue !== "0" && this.strCheckedValue !== "";
        return boolean;
    }

    modelChange(model: boolean) {
        this.strCheckedValueChange.emit( model ? "1" : "0");
    }
}