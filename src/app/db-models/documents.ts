export interface DbDocumentType {
  dty_id: number;
  dty_name: string;
  dty_individual_name: boolean;
}

export interface DbDocumentTypeList {
  dty_id: number;
  dty_name: string;
  dty_individual_name: boolean;
  top_ids: number[];
  org_ids: number[];
}

export interface DbDocumentsviewGet {
  dov_id: number;
  dov_name: string;
  dty_id: number;
  top_ids: number[];
}

export interface DbDocumentsviewList {
  dov_id: number;
  dov_name: string;
  dty_id: number;
  top_ids: number[];
}

