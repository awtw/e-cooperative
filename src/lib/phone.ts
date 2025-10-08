// 從一段輸入文字中解析出可能的電話號碼
export const parseContactNumbers = (input?: string | null): string[] => {
  if (!input) return [];
  // 正規化輸入文字
  const cleaned = input.replace(/\r\n|\r|\n|,|；|;|、|\|/g, " ");
  // 移除非可列印字元與表情符號
  const withoutEmoji = cleaned.replace(/[^\n\d+\s]/g, (ch) => {
    // allow plus sign
    if (ch === "+") return "+";
    return "";
  });

  // 拆解成潛在電話號碼的 token
  const tokens = withoutEmoji
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const numbers: string[] = [];
  tokens.forEach((t) => {
    // 過濾與清理每個 token
    const normalized = t.replace(/[^+\d]/g, "");
    const digitsOnly = normalized.startsWith("+")
      ? normalized
      : normalized.replace(/\D/g, "");
    const len = digitsOnly.replace(/\D/g, "").length;
    if (len >= 8 && len <= 15) {
      numbers.push(digitsOnly);
    }
  });

  // 移除重複電話號碼
  return Array.from(new Set(numbers));
};

// 將電話號碼格式化成比較容易閱讀的樣式
export const formatDisplayNumber = (num: string): string => {
  // Display +886 format or local mobile spacing for readability
  if (!num) return num;
  if (num.startsWith("+886")) {
    // +886912345678 -> +886 912 345 678
    const rest = num.slice(4);
    return `+886 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`.trim();
  }
  if (num.startsWith("886") && num.length > 9) {
    const rest = num.slice(3);
    return `+886 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`.trim();
  }
  // Local mobile 09XXXXXXXX -> 09X-XXX-XXXX or 09XX XXX XXX
  if (num.length === 10 && num.startsWith("09")) {
    return `${num.slice(0, 4)} ${num.slice(4, 7)} ${num.slice(7)}`;
  }
  // Fallback: group by 3
  return num.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
};
