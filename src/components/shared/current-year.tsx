import { connection } from "next/server";

export async function CurrentYear() {
  await connection(); // tandai: dihitung saat request
  return <>{new Date().getFullYear()}</>;
}
