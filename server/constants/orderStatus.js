export const ORDER_STATUS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const ORDER_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.CANCELLED,
  ],

  [ORDER_STATUS.PROCESSING]: [
    ORDER_STATUS.SHIPPED,
  ],

  [ORDER_STATUS.SHIPPED]: [
    ORDER_STATUS.DELIVERED,
  ],

  [ORDER_STATUS.DELIVERED]: [],

  [ORDER_STATUS.CANCELLED]: [],
};

// Array of all valid order statuses
export const VALID_ORDER_STATUS = Object.values(ORDER_STATUS);