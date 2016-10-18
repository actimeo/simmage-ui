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

