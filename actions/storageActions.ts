"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData) {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File;
  const safeFileName = file.name
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "_");

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .upload(safeFileName, file, { upsert: true });

  handleError(error);

  return data;
}
