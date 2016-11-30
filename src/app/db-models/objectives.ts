export interface DbObjective {
  obj_id: number;
  obj_name: string;
  obj_deadline: string;
  obj_open: boolean;
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

