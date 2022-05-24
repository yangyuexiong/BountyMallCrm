// 校验必填项
export const validateRequired = (
  message,
  trigger = "change",
  type = "error"
) => ({
  required: true,
  message,
  trigger,
  type
});

// 校验数组必填项
export const validateArrayRequired = (...rest) => ({
  type: "array",
  ...validateRequired(...rest)
});

// 校验日期必填项
export const validateDateRequired = (...rest) => ({
  type: "date",
  ...validateRequired(...rest)
});
