export interface DbNotesRetrieved {
  not_id: number;
  not_creation_date: string;
  not_event_date: string;
}

export interface DbNote {
  not_id: number;
  not_text: string;
  not_creation_date: string;
  not_event_date: string;
  not_object: string;
  not_author: number;
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

