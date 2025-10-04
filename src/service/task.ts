import { TaskInterface, TaskType, TaskStatus } from "@/types/task";
import { ApiError, ApiErrorType } from "@/lib/errors/api-error";

// API base URL (fallback to known backend if env not set)
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://hopenet.m9h8.com";

type ApiTask = {
  created_at: string;
  is_deleted: boolean;
  deleted_at?: string | null;
  updated_at: string;
  id: number | string;
  creator_id?: string;
  type?: string | null;
  title: string;
  description?: string | null;
  status?: string;
  start_at?: string | null;
  deadline?: string | null;
  contact_number?: string | null;
  registration_location?: string | null;
  work_location?: string | null;
  required_number_of_people?: number | null;
  maximum_number_of_people?: number | null;
  urgency?: number | null;
  danger_level?: number | null;
  claimed_count?: number;
  creator_name?: string;
  // [key: string]: any;
};

type ApiResponse = {
  data: ApiTask[];
  total_count?: number;
  has_more?: boolean;
  page?: number;
  items_per_page?: number;
};

const mapTaskType = (t?: string): TaskType => {
  console.log("t:", t);
  if (!t) return "cleanup";
  const s = t.toLowerCase();
  if (s.includes("清理") || s.includes("鏟") || s.includes("cleanup"))
    return "cleanup";
  if (s.includes("救援") || s.includes("rescue")) return "rescue";
  if (s.includes("物資") || s.includes("配送") || s.includes("supply"))
    return "supply_delivery";
  if (s.includes("醫療") || s.includes("醫")) return "medical_aid";
  if (s.includes("收容") || s.includes("避難") || s.includes("shelter"))
    return "shelter_support";
  return "cleanup";
};

const mapStatus = (s?: string): TaskStatus => {
  if (!s) return "pending";
  const v = s.toLowerCase();
  if (v.includes("準備") || v.includes("pending") || v.includes("審核"))
    return "pending";
  if (v.includes("可認領") || v.includes("available")) return "available";
  if (v.includes("已認領") || v.includes("claimed")) return "claimed";
  if (v.includes("進行") || v.includes("in_progress") || v.includes("進行中"))
    return "in_progress";
  if (v.includes("完成") || v.includes("completed")) return "completed";
  if (v.includes("取消") || v.includes("cancelled")) return "cancelled";
  return "pending";
};

/**
 * Fetch tasks from backend and map to TaskInterface[] used by the app.
 */
export const getTasks: () => Promise<TaskInterface[]> = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_BASE}/api/v1/task`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      // 根據 HTTP 狀態碼拋出不同的 ApiError
      if (res.status >= 500) {
        throw new ApiError(
          ApiErrorType.SERVER_ERROR,
          "伺服器暫時無法處理請求，請稍後再試",
          {
            statusCode: res.status,
            suggestion: "系統可能正在進行維護，請稍後再回來查看",
          },
        );
      } else if (res.status === 404) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          "無法找到任務資料",
          {
            statusCode: res.status,
            suggestion: "請確認 API 端點設定是否正確，或聯絡系統管理員",
          },
        );
      } else if (res.status === 401 || res.status === 403) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          "您沒有權限存取此資源",
          {
            statusCode: res.status,
            suggestion: "請重新登入或聯絡管理員",
          },
        );
      } else if (res.status >= 400) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          "請求發生錯誤，請重新整理頁面",
          {
            statusCode: res.status,
            suggestion: "如果問題持續發生，請聯絡系統管理員",
          },
        );
      }
    }

    const resJson: ApiResponse = await res.json();
    const items = Array.isArray(resJson?.data) ? resJson.data : [];

    const mappedData: TaskInterface[] = items.map((it) => {
      const status = mapStatus(it.status);
      const type = mapTaskType(it.type || it.title);

      const work_location = it.work_location || it.registration_location || "";

      const required_number_of_people =
        typeof it.required_number_of_people === "number"
          ? it.required_number_of_people
          : 0;

      const maximum_number_of_people =
        typeof it.maximum_number_of_people === "number"
          ? it.maximum_number_of_people
          : 0;

      const danger_level =
        typeof it.danger_level === "number" ? it.danger_level : 1;

      return {
        id: String(it.id ?? ""),
        title: it.title ?? "",
        description: it.description ?? "",
        type,
        work_location,
        required_number_of_people,
        maximum_number_of_people,
        required_skills: null,
        deadline: it.deadline ?? null,
        danger_level,
        creator_id: it.creator_id ?? "",
        status,
        approval_status: "pending",
        approved_by: null,
        approved_at: null,
        created_at: it.created_at ?? new Date().toISOString(),
        updated_at: it.updated_at ?? new Date().toISOString(),
        creator_name: null,
        creator_role: null,
        approver_name: null,
        claimed_count:
          typeof it.claimed_count === "number" ? it.claimed_count : 0,
        can_claim: status === "available",
        can_edit: false,
      } as TaskInterface;
    });

    return mappedData;
  } catch (err) {
    // 如果已經是 ApiError，直接拋出
    if (err instanceof ApiError) {
      throw err;
    }

    // 處理網路錯誤
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new ApiError(
        ApiErrorType.NETWORK_ERROR,
        "網路連線異常，無法連接到伺服器",
        {
          originalError: err,
          suggestion: "請檢查您的網路連線後重試",
        },
      );
    }

    // 處理逾時錯誤
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError(
        ApiErrorType.TIMEOUT_ERROR,
        "伺服器回應時間過長",
        {
          originalError: err,
          suggestion: "網路速度可能較慢，請稍後再試",
        },
      );
    }

    // 處理 JSON 解析錯誤
    if (err instanceof SyntaxError) {
      throw new ApiError(
        ApiErrorType.PARSE_ERROR,
        "資料格式錯誤",
        {
          originalError: err,
          suggestion: "伺服器回應格式不正確，請重新整理頁面",
        },
      );
    }

    // 其他未知錯誤
    throw new ApiError(
      ApiErrorType.UNKNOWN_ERROR,
      "發生未預期的錯誤",
      {
        originalError: err,
        suggestion: "請稍後再試或返回首頁",
      },
    );
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Fetch a single task by id from backend and map to TaskInterface
 */
export const getTaskById: (
  id: string | number,
) => Promise<TaskInterface> = async (id) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_BASE}/api/v1/task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      // 根據 HTTP 狀態碼拋出不同的 ApiError
      if (res.status >= 500) {
        throw new ApiError(
          ApiErrorType.SERVER_ERROR,
          "伺服器暫時無法處理請求，請稍後再試",
          {
            statusCode: res.status,
            suggestion: "系統可能正在進行維護，請稍後再回來查看",
          },
        );
      } else if (res.status === 404) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          "找不到此任務",
          {
            statusCode: res.status,
            suggestion: "此任務可能已被刪除或不存在",
          },
        );
      } else if (res.status === 401 || res.status === 403) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          "您沒有權限查看此任務",
          {
            statusCode: res.status,
            suggestion: "請重新登入或聯絡管理員",
          },
        );
      } else if (res.status >= 400) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          "請求發生錯誤",
          {
            statusCode: res.status,
            suggestion: "請返回任務列表或重新整理頁面",
          },
        );
      }
    }

    const it: ApiTask = await res.json();

    const status = mapStatus(it.status);
    const type = mapTaskType(it.type || it.title);

    const work_location = it.work_location || it.registration_location || "";

    const required_number_of_people =
      typeof it.required_number_of_people === "number"
        ? it.required_number_of_people
        : 0;

    const maximum_number_of_people =
      typeof it.maximum_number_of_people === "number"
        ? it.maximum_number_of_people
        : 0;

    const danger_level =
      typeof it.danger_level === "number" ? it.danger_level : 1;

    const mappedData: TaskInterface = {
      id: String(it.id ?? ""),
      title: it.title ?? "",
      description: it.description ?? "",
      type,
      work_location,
      required_number_of_people,
      maximum_number_of_people,
      required_skills: null,
      deadline: it.deadline ?? null,
      danger_level,
      creator_id: it.creator_id ?? "",
      status,
      approval_status: "pending",
      approved_by: null,
      approved_at: null,
      created_at: it.created_at ?? new Date().toISOString(),
      updated_at: it.updated_at ?? new Date().toISOString(),
      creator_name: it.creator_name ?? null,
      creator_role: null,
      approver_name: null,
      claimed_count:
        typeof it.claimed_count === "number" ? it.claimed_count : 0,
      can_claim: status === "available",
      can_edit: false,
    };

    return mappedData;
  } catch (err) {
    // 如果已經是 ApiError，直接拋出
    if (err instanceof ApiError) {
      throw err;
    }

    // 處理網路錯誤
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new ApiError(
        ApiErrorType.NETWORK_ERROR,
        "網路連線異常，無法連接到伺服器",
        {
          originalError: err,
          suggestion: "請檢查您的網路連線後重試",
        },
      );
    }

    // 處理逾時錯誤
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError(
        ApiErrorType.TIMEOUT_ERROR,
        "伺服器回應時間過長",
        {
          originalError: err,
          suggestion: "網路速度可能較慢，請稍後再試",
        },
      );
    }

    // 處理 JSON 解析錯誤
    if (err instanceof SyntaxError) {
      throw new ApiError(
        ApiErrorType.PARSE_ERROR,
        "資料格式錯誤",
        {
          originalError: err,
          suggestion: "伺服器回應格式不正確，請重新整理頁面",
        },
      );
    }

    // 其他未知錯誤
    throw new ApiError(
      ApiErrorType.UNKNOWN_ERROR,
      "發生未預期的錯誤",
      {
        originalError: err,
        suggestion: "請返回任務列表或重新整理頁面",
      },
    );
  } finally {
    clearTimeout(timeout);
  }
};
