export interface DbDossier {
  dos_id: number;
  dos_firstname: string;
  dos_lastname: string;
  dos_birthdate: string;
  dos_gender: string;
  dos_grouped: boolean;
  dos_external: boolean;
  dos_groupname: string;
}

export interface DbTopic {
  top_id: number;
  top_name: string;
  top_description: string;
  top_icon: string;
  top_color: string;
}

export interface DbOrganization {
  org_id: number;
  org_name: string;
  org_description: string;
  org_internal: boolean;
}

export interface DbParticipant {
  par_id: number;
  par_firstname: string;
  par_lastname: string;
  par_email: string;
}

export interface DbGroup {
  grp_id: number;
  org_id: number;
  grp_name: string;
  grp_description: string;
  grp_mandatory: boolean;
  grp_orientation: string;
}

export interface DbDossierLink {
  dol_id: number;
  dos_id: number;
  dos_id_related: number;
  dol_relationship: string;
}

export interface DbDossierList {
  dos_id: number;
  dos_firstname: string;
  dos_lastname: string;
  dos_birthdate: string;
  dos_gender: string;
  dos_grouped: boolean;
  dos_external: boolean;
  dos_groupname: string;
  dos_referee_functions: string;
}

export interface DbDossierStatusHistory {
  dst_id: number;
  org_id: number;
  org_name: string;
  dst_value: string;
  dst_start: string;
  dst_end: string;
}

export interface DbGroupList {
  grp_id: number;
  grp_name: string;
  grp_description: string;
  grp_topics: number[];
  org_id: number;
  org_name: string;
}

