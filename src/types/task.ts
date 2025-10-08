export type TaskType =
  | "cleanup"
  | "rescue"
  | "supply_delivery"
  | "medical_aid"
  | "shelter_support"
  | "repair_maintenance"
  | "equipment_operation"
  | "community_service";
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
  weight: number;
  maximum_number_of_people?: number;
  required_skills?: string[] | null;
  start_at?: string | null;
  deadline?: string | null;
  danger_level: number;
  contact_number?: string | null;
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
