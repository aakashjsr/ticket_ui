import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-contact-dialogue",
  templateUrl: "./contact-dialogue.component.html",
  styleUrls: ["./contact-dialogue.component.scss"]
})
export class ContactDialogueComponent implements OnInit {
  contactDetail:any;
  constructor(
    public dialogRef: MatDialogRef<ContactDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactDetail = data.contact_person;
    console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
