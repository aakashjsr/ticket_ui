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
export class CreateTicketComponent implements OnInit, OnDestroy {
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
      work_type: [null]
    });
  }

  ngOnDestroy(): void {
    this.utils.internalDataBus.next({ type: "jjjj", data: null });
  }

  // create description not public notes
  //update internal notes public notes
  // status ,public notes, internal notes are enabled

  async getFormInfo() {
    const tktCat = await this.apiService.getTktCateogries().toPromise();
    this.ticketsCat.push(...tktCat);
    const tktStatus = await this.apiService.get<any[]>("entities/ticket/status/", {}, "json").toPromise();
    this.ticketStatus = tktStatus;

    this.utils.internalDataBus.subscribe(value => {
      if (!value) return;
      console.log(value);
      if (value.type == "tkt") {
        this.isUpdate = true;
        this.updateTicketId = value.data.id;
        const currentFromState = value.data;

        this.ticketForm = this.fb.group({
          category: [{ value: currentFromState["category"], disabled: true }],
          status: [{ value: currentFromState["status"], disabled: false }],
          invoice_id: [
            { value: currentFromState["invoice_id"], disabled: true }
          ],
          parts_used: [
            { value: currentFromState["parts_used"], disabled: true }
          ],
          requested_comp_date: [
            { value: currentFromState["requested_comp_date"], disabled: true }
          ],
          completed_time: [
            { value: currentFromState["completed_time"], disabled: true }
          ],
          submit_time: [
            { value: currentFromState["submit_time"], disabled: true }
          ],
          contact_person: [
            { value: currentFromState["contact_person"]['id'], disabled: true }
          ],
          assigned_to: [
            { value: currentFromState["assigned_to"], disabled: true }
          ],
          public_notes: [
            { value: currentFromState["public_notes"], disabled: false }
          ],
          internal_notes: [
            { value: currentFromState["internal_notes"], disabled: false }
          ],
          description: [
            { value: currentFromState["description"], disabled: true }
          ],
          client: [
            { value: currentFromState["client"], disabled: true },
            Validators.required
          ]
        });
        this.apiService
          .get<Array<any>>(`entities/ticket-history/${value.data.id}/`)
          .subscribe(history => {
            this.currentTktHistory = history;
          });
      }
    });
  }

  ngOnInit() {
    this.getFormInfo();

    this.utils.currentUser.subscribe(user => {
      if (user && !this.ticketForm.value.client) {
        this.ticketForm.patchValue({ client: user.id });
      }
      this.apiService
        .get("accounts/client-users", { client: user.id })
        .subscribe((value: any) => {
          this.usersList = value;
        });
    });
  }

  submitForm() {
    if (this.ticketForm.valid) {
      if (this.isUpdate) {
        this.apiService
          .put(`entities/ticket/${this.updateTicketId}/`, this.ticketForm.value)
          .subscribe(value => {
            this.snackBar.open("Ticket updated", "SuccessFully", {
              duration: 1000
            });
            this.router.navigate(["/"]);
          });
      } else {
        this.apiService
          .post("entities/tickets/", this.ticketForm.value)
          .subscribe(value => {
            this.snackBar.open("Ticket Created", "SuccessFully", {
              duration: 1000
            });
            this.router.navigate(["/"]);
          });
      }
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }
}
