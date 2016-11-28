export interface DbNote {
  not_id: number;
  not_text: string;
  not_creation_date: string;
  not_event_date: string;
  not_object: string;
}

export interface DbNotesviewGet {
  nov_id: number;
  nov_name: string;
  top_ids: number[];
}

export interface DbNotesviewList {
  nov_id: number;
  nov_name: string;
  top_ids: number[];
}

