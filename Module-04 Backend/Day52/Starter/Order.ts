const DELIVERY_AREAS = ["Bole", "Kazanchis", "Piassa", "Mexico"] as const;

type Area = (typeof DELIVERY_AREAS)[number];

type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "on_the_way"
  | "delivered";

type Dish = {
  name: string;
  priceSantim: number;
};

type Order = {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  telebirrPhone?: string;
  totalSantim: number;
};

function deliveryFee(order: Order): number {
  if (order.totalSantim > 50000) {
    return 0;
  }

  return order.area === "Bole" ? 4000 : 6000;
}

function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "Your order is waiting for confirmation.";

    case "confirmed":
      return "Your order has been confirmed.";

    case "preparing":
      return "Your food is being prepared.";

    case "on_the_way":
      return "Your order is on the way.";

    case "delivered":
      return "Your order has been delivered.";

    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

const formatETB = (amountSantim: number): string =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(amountSantim / 100);

function receipt(order: Order): string {
  const fee = deliveryFee(order);
  const grandTotal = order.totalSantim + fee;

  const dishLines = order.dishes
    .map((dish) => `${dish.name} - ${formatETB(dish.priceSantim)}`)
    .join("\n");

  return `
==============================
Addis Eats - Order #${order.id}
==============================
Customer: ${order.customerName}
Area:     ${order.area}
Status:   ${statusMessage(order.status)}

Items:
${dishLines}

------------------------------
Subtotal: ${formatETB(order.totalSantim)}
Delivery: ${fee === 0 ? "FREE" : formatETB(fee)}
------------------------------
TOTAL:    ${formatETB(grandTotal)}
==============================
  `.trim();
}
