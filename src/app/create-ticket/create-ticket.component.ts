import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ApiIntercepterService } from "../services/api-intercepter.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: "create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.scss"]
})
export class CreateTicketComponent implements OnInit {
  ticketsCat: Array<{ display: string; value: string }> = [];
  ticketForm: FormGroup;
  isUpdate = false;
  stateCtrl = new FormControl();
  ticketStatus: Array<{ display: string; value: string }> = [];
  usersList: any[];
  currentTktHistory = [];
  updateTicketId: number;
  workType: Array<string> = ['Onsite', 'Offsite', 'Project', 'After', 'Hours', 'Onsite', 'After', 'Hours', 'offsite']

  constructor(
    public apiService: ApiIntercepterService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public utils: UtilsService
  ) {
    this.intiForm();
  }

  // create description not public notes
  //update internal notes public notes
  // status ,public notes, internal notes are enabled

  async getFormInfo(formData: any) {

    this.ticketForm = this.fb.group({
      category: [{ value: formData["category"], disabled: true }],
      status: [{ value: formData["status"], disabled: false }],
      invoice_id: [
        { value: formData["invoice_id"], disabled: true },
      ],
      work_type: [
        { value: formData["work_type"], disabled: true },
      ],
      parts_used: [
        { value: formData["parts_used"], disabled: true }
      ],
      requested_comp_date: [
        { value: formData["requested_comp_date"], disabled: true }
      ],
      completed_time: [
        { value: formData["completed_time"], disabled: true }
      ],
      submit_time: [
        { value: formData["submit_time"], disabled: true }
      ],
      contact_person: [
        { value: formData["contact_person"], disabled: true }
      ],
      assigned_to: [
        { value: formData["assigned_to"], disabled: true }
      ],
      public_notes: [
        { value: formData["public_notes"], disabled: false }
      ],
      internal_notes: [
        { value: formData["internal_notes"], disabled: false }
      ],
      description: [
        { value: formData["description"], disabled: true }
      ],
      client: [
        { value: formData["client"], disabled: true },
        Validators.required
      ],

    });

    this.apiService
      .get<Array<any>>(`entities/ticket-history/${formData.id}/`)
      .subscribe(history => {
        this.currentTktHistory = history;
      });
  }


  intiForm() {
    this.ticketForm = this.fb.group({
      category: [null, Validators.required],
      status: ["new", null],
      invoice_id: [null,],
      parts_used: [null,],
      requested_comp_date: [null],
      contact_person: [null, Validators.required],
      assigned_to: [null, Validators.required],
      public_notes: [null],
      internal_notes: [null],
      description: [null, Validators.required],
      client: [null, Validators.required],
      work_type: [null],
    });
  }

  ngOnInit() {
    this.intiForm();
    this.ticketForm.patchValue({ is_active: true });
    console.log(this.router.url);
    const urlSegment = this.router.url.split('/');
    if (urlSegment.length == 3) {
      console.log('entering update mode', urlSegment);

      this.updateTicketId = + urlSegment.pop();
      if (this.updateTicketId) {
        this.isUpdate = true;
        this.apiService
          .get(`entities/ticket/${this.updateTicketId}/`)
          .subscribe((value: any) => {
            console.log(value, '---------------getTkt--------------------');
            let patchableValue = { ...value, assigned_to: value.assigned_to.id, client: value.client.id, contact_person: value.contact_person.id };
            console.log(patchableValue);
            this.getFormInfo(patchableValue);
          });
      }
    }
    this.apiService.get<any[]>("entities/ticket/status/", {}, "json").subscribe((value) => this.ticketStatus = value);
    this.apiService.getTktCateogries().subscribe((tktCat) => this.ticketsCat.push(...tktCat));


    this.utils.currentUser.subscribe(user => {
      if (user && !this.ticketForm.value.client) {
        console.log(user.id, '-----------uderid----------');
        this.apiService
          .get("accounts/client-users/", { client: user.id })
          .subscribe((value: any) => {
            this.usersList = value;
          });
      }

    });
  }

  submitForm() {
    console.log(this.ticketForm.value);
    if (this.ticketForm.valid) {
      this.ticketForm.patchValue({ client: JSON.parse(this.utils.getCookie('client'))['id'] });
      if (this.isUpdate) {
        this.apiService
          .put(`entities/ticket/${this.updateTicketId}/`, this.ticketForm.value)
          .subscribe(value => {
            this.snackBar.open("Ticket updated", "SuccessFully", {
              duration: 3000
            });
            this.router.navigate(["/"]);
          });
      } else {
        this.apiService
          .post("entities/tickets/", this.ticketForm.value)
          .subscribe(value => {
            this.snackBar.open("Ticket Created", "SuccessFully", {
              duration: 3000
            });
            this.router.navigate(["/"]);
          });
      }
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }
}
