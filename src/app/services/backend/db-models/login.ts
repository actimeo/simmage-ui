export interface DbUserInfo {
  usr_login: string;
  usr_rights: string[];
  par_id: number;
  ugr_id: number;
  par_firstname: string;
  par_lastname: string;
}

export interface DbUserDetails {
  usr_login: string;
  usr_rights: string[];
  par_id: number;
  par_firstname: string;
  par_lastname: string;
  ugr_id: number;
  ugr_name: string;
}

export interface DbUserUsergroupType {
  ugr_name: string;
  usr_login: string[];
}

export interface DbUserLogin {
  usr_token: number;
  usr_temp_pwd: boolean;
  usr_rights: string[];
  par_id: number;
  ugr_id: number;
  par_firstname: string;
  par_lastname: string;
  usr_previous_connection_date: string;
  usr_previous_connection_ip: string;
}

export interface DbUsergroup {
  ugr_id: number;
  ugr_name: string;
  ugr_rights: string[];
  ugr_statuses: string[];
}

