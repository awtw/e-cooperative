import { TaskInterface } from "@/types/task";

export const mockData: TaskInterface[] = [
  {
    id: "task_001",
    title: "受災家戶修繕支援",
    description:
      "協助受災家戶恢復日常生活，包括水電修繕（電力恢復、臨時配線、水管配管及化糞池等）、房屋修繕（泥作、門窗修補、牆面及地板修復）、機械維修（抽水機、發電機及其他機具維修）、清潔機具操作與支援（大型清掃設備操作與協助）。\n📌 注意事項：請攜帶自行用之工具、設備及相關材料，並注意自身安全。因配合當地救援車輛優先原則，建議搭乘火車前往。若遇天候惡化，將視狀況調整或暫停行程。\n📞 志工聯繫專線：0972223409、0972223410",
    task_type: "rescue", // 對應到 getTaskTypeLabel → "緊急救援"
    location_data: {
      address: "花蓮縣光復火車站",
      coordinates: { lat: 23.66661, lng: 121.42129 },
      details: "09:00集合，由花蓮縣政府人員引導與派工",
    },
    required_volunteers: 50,
    required_skills: ["水電修繕", "房屋修繕", "機械維修", "清潔機具操作"],
    deadline: "2025-10-08T17:00:00Z",
    priority_level: 1,
    creator_id: "user_001",
    status: "available",
    approval_status: "approved",
    approved_by: "admin_001",
    approved_at: "2025-10-04T09:00:00Z",
    created_at: "2025-10-04T09:00:00Z",
    updated_at: "2025-10-04T09:00:00Z",
    creator_name: "花蓮縣政府資訊科",
    creator_role: "coordinator",
    approver_name: null,
    claimed_count: 0,
    can_claim: true,
    can_edit: false,
  },
  {
    id: "task_002",
    title: "物資需求 - 清潔用品",
    description:
      "需要物資：毛巾100條、抹布100條、小刷子100支、水管100條、清潔手套100雙。\n📞 聯絡電話：0966-589-021",
    task_type: "supply_delivery", // → "物資配送"
    location_data: {
      address: "花蓮糖廠",
      coordinates: { lat: 23.65963, lng: 121.42067 },
      details: null,
    },
    required_volunteers: 0, // 純物資需求，不限定人數
    required_skills: null,
    deadline: null,
    priority_level: 1,
    creator_id: "user_002",
    status: "available",
    approval_status: "approved",
    approved_by: "admin_001",
    approved_at: "2025-10-04T09:00:00Z",
    created_at: "2025-10-04T09:00:00Z",
    updated_at: "2025-10-04T09:00:00Z",
    creator_name: "花蓮縣政府社會處",
    creator_role: "coordinator",
    approver_name: null,
    claimed_count: 0,
    can_claim: false, // 不是志工參加類型
    can_edit: false,
  },
  {
    id: "task_003",
    title: "災區清淤及運輸支援",
    description:
      "需要人力與設備：貨車、堆高機、深入災區清淤志工各50名。\n備註：需具備貨車、堆高機等設備。\n📞 聯絡電話：0927139554",
    task_type: "cleanup", // → "環境清理"
    location_data: {
      address: "花蓮縣花蓮市國盛四街88號",
      coordinates: { lat: 23.99441, lng: 121.60764 },
      details: null,
    },
    required_volunteers: 150, // 三項各50人
    required_skills: ["貨車駕駛", "堆高機操作", "清淤作業"],
    deadline: null,
    priority_level: 1,
    creator_id: "user_001",
    status: "available",
    approval_status: "approved",
    approved_by: "admin_001",
    approved_at: "2025-10-04T09:00:00Z",
    created_at: "2025-10-04T09:00:00Z",
    updated_at: "2025-10-04T09:00:00Z",
    creator_name: "角兒愛心公益協會",
    creator_role: "volunteer",
    approver_name: null,
    claimed_count: 0,
    can_claim: true,
    can_edit: false,
  },
];
