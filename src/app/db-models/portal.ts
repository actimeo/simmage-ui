export interface DbPortal {
  por_id: number;
  por_name: string;
  por_description: string;
}

export interface DbMainmenu {
  mme_id: number;
  mse_id: number;
  mme_name: string;
  mme_order: number;
}

export interface DbMainsection {
  mse_id: number;
  por_id: number;
  mse_name: string;
  mse_order: number;
}

export interface DbMainviewElement {
  mve_id: number;
  mve_type: string;
  mve_name: string;
}

export interface DbMainview {
  mme_id: number;
  mvi_title: string;
  mvi_icon: string;
  mve_id: number;
  pme_id_associated: number;
}

export interface DbMainviewGetDetails {
  mme_id: number;
  mvi_title: string;
  mvi_icon: string;
  mve_id: number;
  pme_id_associated: number;
  mve_type: string;
  mve_name: string;
}

export interface DbParamList {
  prm_val: string;
  prm_name: string;
  prm_type: string;
}

export interface DbPersonmenu {
  pme_id: number;
  pse_id: number;
  pme_name: string;
  pme_order: number;
}

export interface DbPersonsection {
  pse_id: number;
  por_id: number;
  pse_entity: string;
  pse_name: string;
  pse_order: number;
}

export interface DbPersonviewDetailsList {
  pme_id: number;
  pse_entity: string;
  pse_name: string;
  pme_name: string;
  pvi_title: string;
}

export interface DbPersonviewElement {
  pve_id: number;
  pve_type: string;
  pve_name: string;
  pve_entities: string[];
}

export interface DbPersonview {
  pme_id: number;
  pvi_title: string;
  pvi_icon: string;
  pve_id: number;
}

export interface DbPersonviewGetDetails {
  pme_id: number;
  pvi_title: string;
  pvi_icon: string;
  pve_id: number;
  pve_type: string;
  pve_name: string;
  pve_entities: string[];
}

