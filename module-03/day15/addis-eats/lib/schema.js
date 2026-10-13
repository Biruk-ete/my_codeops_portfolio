import { z } from "zod";

export const orderSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    phone: z.string().regex(/^(09\d{8}|\+2519\d{8})$/, "Use 09… or +2519…"),
    dishId: z.string().min(1, "Pick a dish"),
    quantity: z.coerce.number().int().min(1, "At least 1").max(20, "Too many"),
});