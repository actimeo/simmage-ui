export interface DbGroup {
  grp_id: number;
  org_id: number;
  grp_name: string;
  grp_description: string;
}

export interface DbGroupList {
  grp_id: number;
  grp_name: string;
  grp_description: string;
  grp_topics: number[];
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

export interface DbTopic {
  top_id: number;
  top_name: string;
  top_description: string;
}

