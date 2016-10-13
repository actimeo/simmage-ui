export interface DbEventType {
  ety_id: number;
  ety_category: string;
  ety_name: string;
  ety_individual_name: boolean;
}

export interface DbEventTypeList {
  ety_id: number;
  ety_category: string;
  ety_name: string;
  ety_individual_name: boolean;
  top_ids: number[];
  org_ids: number[];
}

