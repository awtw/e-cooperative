"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateTask } from "@/lib/api/tasks";
import { components } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, AlertCircle } from "lucide-react";

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

type TaskType = components["schemas"]["TaskType"];
type TaskCreate = components["schemas"]["TaskCreate"];

type TaskTypeOption = {
  value: TaskType;
  label: string;
  description: string;
};

type PriorityOption = {
  value: number;
  label: string;
  color: string;
};

const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "請輸入任務標題")
    .max(100, "標題不能超過 100 個字元"),
  description: z
    .string()
    .min(5, "請輸入至少 5 個字的任務描述")
    .max(200, "描述不能超過 200 個字元"),
  task_type: z.custom<TaskType>(),
  address: z.string().min(1, "請輸入地址"),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  location_details: z.string().optional(),
  required_volunteers: z
    .number()
    .min(1, "至少需要 1 位志工")
    .max(50, "最多需要 50 位志工"),
  required_skills: z.array(z.string()).optional(),
  deadline: z.string().optional(),
  priority_level: z.number().min(1).max(5),
});

const taskTypeOptions: TaskTypeOption[] = [
  { value: "cleanup", label: "清理救援", description: "清理倒塌房屋、道路等" },
  { value: "rescue", label: "緊急救援", description: "搜救受困人員" },
  {
    value: "supply_delivery",
    label: "物資配送",
    description: "配送食物、飲水等物資",
  },
  { value: "medical_aid", label: "醫療援助", description: "提供醫療協助" },
  {
    value: "shelter_support",
    label: "避難支援",
    description: "協助避難所運作",
  },
];

const priorityOptions: PriorityOption[] = [
  { value: 1, label: "一級（低）", color: "text-[var(--color-priority-1)]" },
  { value: 2, label: "二級（中低）", color: "text-[var(--color-priority-2)]" },
  { value: 3, label: "三級（中）", color: "text-[var(--color-priority-3)]" },
  { value: 4, label: "四級（高）", color: "text-[var(--color-priority-4)]" },
  { value: 5, label: "五級（緊急）", color: "text-[var(--color-priority-5)]" },
];

export default function CreateTaskPage() {
  const router = useRouter();
  const createTaskMutation = useCreateTask();

  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      task_type: undefined,
      address: "",
      location_details: "",
      required_volunteers: 1,
      required_skills: [],
      deadline: "",
      priority_level: 3,
    },
  });

  const handleSubmit = (data: CreateTaskFormData) => {
    const taskData: TaskCreate = {
      title: data.title,
      description: data.description,
      task_type: data.task_type,
      location_data: {
        address: data.address,
        coordinates: data.coordinates || { lat: 0, lng: 0 },
        details: data.location_details || null,
      },
      required_volunteers: data.required_volunteers,
      required_skills: data.required_skills?.length
        ? data.required_skills
        : null,
      deadline: data.deadline || null,
      priority_level: data.priority_level,
    };

    createTaskMutation.mutate(taskData, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-3 p-0 h-auto text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
        <h1 className="text-2xl font-semibold">建立新任務</h1>
      </div>

      {createTaskMutation.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {createTaskMutation.error instanceof Error
              ? createTaskMutation.error.message
              : "建立任務失敗，請稍後再試"}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <Card className="py-8">
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel required>任務標題</FormLabel>
                      <FormControl>
                        <Input placeholder="請輸入任務標題" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="task_type"
                  render={({ field }) => {
                    const selectedOption = taskTypeOptions.find(
                      (option) => option.value === field.value,
                    );

                    return (
                      <FormItem>
                        <FormLabel required>任務類型</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <span className="truncate">
                                {selectedOption?.label || "請選擇任務類型"}
                              </span>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {taskTypeOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {option.label}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {option.description}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="priority_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>優先級</FormLabel>
                      <Select
                        onValueChange={(value: string) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="請選擇優先級" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorityOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${option.color}`}>
                                  {option.label}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel required>地址</FormLabel>
                      <FormControl>
                        <Input placeholder="請輸入完整地址" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="required_volunteers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>需要志工人數</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="50"
                          placeholder="人數"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>截止時間</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel required>任務描述</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="請詳細描述任務內容、需求、注意事項等..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location_details"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>地點詳細說明</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="例如：在XX建築物旁邊、有明顯標誌等..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="required_skills"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>所需技能</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            placeholder="輸入技能後按 Enter 添加"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();
                                if (value && !field.value?.includes(value)) {
                                  field.onChange([
                                    ...(field.value || []),
                                    value,
                                  ]);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          {field.value && field.value.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {field.value.map((skill, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                                >
                                  <span>{skill}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newSkills =
                                        field.value?.filter(
                                          (_, i) => i !== index,
                                        ) || [];
                                      field.onChange(newSkills);
                                    }}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* 提交按鈕 */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={createTaskMutation.isPending}
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="min-w-[120px]"
            >
              {createTaskMutation.isPending ? "建立中..." : "建立任務"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
