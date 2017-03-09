export interface DbObjective {
  obj_id: number;
  obj_name: string;
  dos_id: number;
  obj_status: string;
  obj_start_date: string;
  obj_end_date: string;
}

export interface DbObjectivesviewGet {
  obv_id: number;
  obv_name: string;
  top_ids: number[];
}

export interface DbObjectivesviewList {
  obv_id: number;
  obv_name: string;
  top_ids: number[];
}

