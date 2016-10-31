export interface GroupJson {
  grp_id: number;
  grp_name: string;
}
export interface PortalJson {
  por_id: number;
  por_name: string;
}
export interface TopicJson {
  top_id: number;
  top_name: string;
  top_description: string;
  top_icon: string;
  top_color: string;
}
export interface UsergroupJson {
  ugr_id: number;
  ugr_name: string;
  ugr_rights: string[];
  ugr_statuses: string[];
  groups: GroupJson[];
  portals: PortalJson[];
  topics: TopicJson[];
}
export interface UserLoginJson {
  usr_token: number;
  usr_rights: string[];
  usergroup: UsergroupJson;
  participant: {
    par_id: number;
    par_firstname: string;
    par_lastname: string;
  };
}
