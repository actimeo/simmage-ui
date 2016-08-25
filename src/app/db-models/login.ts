export interface DbUserInfo {
  usr_login: string;
  usr_temp_pwd: string;
  usr_rights: string[];
  par_id: number;
  ugr_id: number;
  par_firstname: string;
  par_lastname: string;
}

export interface DbUserLogin {
  usr_token: number;
  usr_temp_pwd: boolean;
  usr_rights: string[];
  par_id: number;
  ugr_id: number;
  par_firstname: string;
  par_lastname: string;
}

export interface DbUsergroup {
  ugr_id: number;
  ugr_name: string;
}

