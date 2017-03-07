export class Constants {
  static KEY_AUTH_TOKEN = 'auth_token'; // auth token to be used when calling pg procedures
  static KEY_AUTH_RIGHTS = 'auth_rights'; // admin rights of the current user
  static KEY_AUTH_UGR_ID = 'auth_ugr_id'; // usergroup id of the user 
  static KEY_AUTH_LOGIN = 'auth_login'; // user login
  static KEY_AUTH_FIRSTNAME = 'auth_firstname'; // user firstname
  static KEY_AUTH_LASTNAME = 'auth_lastname'; // user lastname

  static KEY_SEL_POR_ID = 'sel_por_id'; // currenctly selected portal id, 0 if none
  static KEY_SEL_GRP_ID = 'sel_grp_id'; // currently selected group id, 0 if none
  static KEY_SEL_DOS_ID = 'sel_dos_id'; // currently selected dossier id, 0 if none
}
