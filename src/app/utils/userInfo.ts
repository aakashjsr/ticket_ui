export interface IUserInfo {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  work_phone: string;
  cell_phone: string;
  phone_ext: string;
  user_type: string;
  primary_contact: string;
  notes: string;
  client_id: string;
  user_group: string;
  bussiness_id: string;
}


export interface IBussinessInfo {
  _id: string;
  bussiness_id: string;
  bussiness_name: string;
  bussiness_address_line1: string;
  bussiness_address_line2: string;
  city: string;
  state: string;
  zip_code: string | number;
  phone: string;
  fax: string;
  website: string;
  isActive: string;
  hours: string;
  time_zone: string;
  exp_date: string;
  [key: string]: any;
}


export interface IEmailSetup {
  type: string;
  sub_type: string;
  to: string;
  subject: string;
  body: string;
}

export interface ITicket {
  _id: string;
  status: string;
  client_id: string;
  contact_person: string;
  cateogry: string;
  description: string;
  assignedTo: string;
  submitTime: string;
  comp_time: string;
  invoice_id: string;
  due_date: string;
  parts_used: string;
  submit_id: string;
  isBillable: boolean;
}
