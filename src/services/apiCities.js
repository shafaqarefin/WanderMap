import supabase from "./supabase";

export async function getCitiesByUserId(userId) {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
}

export async function createCity(newCity) {
  const { data, error } = await supabase
    .from("cities")
    .insert(newCity)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCity(id) {
  const { error } = await supabase.from("cities").delete().eq("id", id);
  if (error) throw error;
}
