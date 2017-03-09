export interface DbDocument {
  doc_id: number;
  par_id_responsible: number;
  dty_id: number;
  doc_title: string;
  doc_description: string;
  doc_status: string;
  doc_obtainment_date: string;
  doc_execution_date: string;
  doc_validity_date: string;
  doc_file: string;
  doc_author: number;
  doc_creation_date: string;
}

export interface DbDocumentTypeList {
  dty_id: number;
  dty_name: string;
  dty_individual_name: boolean;
  top_ids: number[];
  org_ids: number[];
}

export interface DbDocumentType {
  dty_id: number;
  dty_name: string;
  dty_individual_name: boolean;
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

