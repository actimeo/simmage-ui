export interface DbEvent {
  eve_id: number;
  eve_title: string;
  ety_id: number;
  eve_duration: string;
  eve_start_time: string;
  eve_end_time: string;
  eve_mod_date: string;
  eve_del_date: string;
  eve_place: string;
  eve_cost: string;
  eve_description: string;
  eve_sumup: string;
}

export interface DbEventTypeList {
  ety_id: number;
  ety_category: string;
  ety_name: string;
  ety_individual_name: boolean;
  top_ids: number[];
  org_ids: number[];
}

export interface DbEventType {
  ety_id: number;
  ety_category: string;
  ety_name: string;
  ety_individual_name: boolean;
}

export interface DbEventsviewGet {
  evv_id: number;
  evv_name: string;
  evv_categories: string[];
  ety_id: number;
  top_ids: number[];
}

export interface DbEventsviewList {
  evv_id: number;
  evv_name: string;
  evv_categories: string[];
  ety_id: number;
  top_ids: number[];
}

