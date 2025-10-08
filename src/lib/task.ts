import { TaskType } from "@/types/task";

export const getTaskTypeLabel = (type: TaskType) => {
  switch (type) {
    case "cleanup":
      return "環境清理";
    case "rescue":
      return "緊急救援";
    case "supply_delivery":
      return "物資配送";
    case "medical_aid":
      return "醫療支援";
    case "shelter_support":
      return "收容支援";
    case "repair_maintenance":
      return "修繕維護";
    case "equipment_operation":
      return "設備操作";
    case "community_service":
      return "社區服務";
    default:
      return type;
  }
};
