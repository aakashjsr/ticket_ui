export interface IUserInfo {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  work_phone?: string;
  cell_phone?: string;
  phone_ext: string;
  user_type: string;
  primary_contact: string;
  notes: string;
  client_id: string;
  user_group?: string;
  bussiness_id?: string;
  username: string;
  [key: string]: string;
}


export interface IAdminInfo {
  cell_phone: string,
  email: string,
  first_name: string,
  is_primary_contact: boolean,
  last_name: string,
  notes: string,
  phone_ext: string,
  token: string,
  user_type: string,
  username: string,
  work_phone: string,
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
  client:number;
}



export interface DeviceInfo {
  active: boolean
  backup: string;
  bit: string;
  client: any;
  deactivation_date: string;
  device_id: string;
  guest_dhcp: string;
  guest_pass: string;
  guest_ssid: string;
  id: any;
  lan_ip: string;
  location: string;
  mac_address: string;
  make: string;
  notes: string;
  password: string;
  processor: string;
  ram: string;
  serial: string;
  type: string;
  user_id: string;
  username: string;
  verified_date: null
  wan_ip: string;
  warranty_exp: string;
  wireless_pass: string;
  wireless_ssid: string;
}


export interface IVendor {
  active: true
  address: string;
  client: number;
  email: string;
  id: number;
  name: string;
  phone: string;
  service: string;
  support_website: string;
  verified_date: string;
  website: string;
}



export interface INetwork {
  client: number;
  client_location: string;
  dc_name: string;
  dhcp_name: string;
  dns_server_ip: string;
  domain_controller_ip: string;
  id: number;
  inactive_date: null
  lan_gateway: string;
  lan_subnet_mask: string;
  verified_date: null
  wan_gateway: string;
  wan_ip: string;
  wan_ip_2: string;
  wan_speed: string;
  wan_speed_2: string;
  wan_subnet_mask: string;
  wan_subnet_mask_2: string;
}



export interface IclientSite {
  active: boolean;
  address_line_1: string;
  address_line_2: string;
  city: string;
  client: number;
  client_hours: string;
  fax: string;
  id: number;
  name: string;
  past_due_date: boolean;
  phone: string;
  state: string;
  website: string;
  zip_code: string;
}


export interface IClient {
  active: boolean;
  client_id: string;
  id: string;
  name: string;
  past_due_date: boolean;
  website: string;
}

export interface ICleientSites {
  active: boolean
  client_id: string;
  id: string;
  name: string;
  past_due_date: boolean;
  website: string;
}
