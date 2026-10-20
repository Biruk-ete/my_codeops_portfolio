import { cookies } from "next/headers";

const MOCK_USERS = [
  { id: "usr_1", name: "Almaz", role: "customer" },
  { id: "usr_2", name: "Chef", role: "staff" },
];

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;

  if (!userId) return null;

  const user = MOCK_USERS.find((u) => u.id === userId);
  return user || null;
}