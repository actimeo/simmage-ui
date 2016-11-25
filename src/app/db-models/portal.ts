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
  mme_title: string;
  mme_icon: string;
  mme_content_type: string;
  mme_content_id: number;
}

export interface DbMainsection {
  mse_id: number;
  por_id: number;
  mse_name: string;
  mse_order: number;
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

