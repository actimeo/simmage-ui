export interface DbResource {
  res_id: number;
  res_name: string;
}

export interface DbResourcesviewGet {
  rev_id: number;
  rev_name: string;
  top_ids: number[];
}

export interface DbResourcesviewList {
  rev_id: number;
  rev_name: string;
  top_ids: number[];
}

