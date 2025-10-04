export type TaskType =
  | "cleanup"
  | "rescue"
  | "supply_delivery"
  | "medical_aid"
  | "shelter_support";
export type TaskStatus =
  | "pending"
  | "available"
  | "claimed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type LocationData = {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  details?: string | null;
};

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  // task_type: TaskType;
  // location_data: LocationData;
  // required_volunteers: number;
  // priority_level: number;
  type: TaskType;
  work_location: string;
  required_number_of_people: number;
  required_skills?: string[] | null;
  start_at?: string | null;
  deadline?: string | null;
  danger_level: number;
  creator_id: string;
  status: TaskStatus;
  approval_status: string;
  approved_by?: string | null;
  approved_at?: string | null;
  created_at: string;
  updated_at: string;
  creator_name?: string | null;
  creator_role?: string | null;
  approver_name?: string | null;
  claimed_count: number;
  can_claim: boolean;
  can_edit: boolean;
}
