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

export async function deleteCityApi(id) {
  const { error } = await supabase.from("cities").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchCityById(cityId) {
  const { data: city, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", cityId)
    .single();

  if (error) {
    console.error("Error fetching city:", error);
    return null;
  }

  return city;
}
