const BASE_URL = "https://api.ft.ca/";

export async function getWallpaperUrl() {
  let result = false;
  try {
    const response = await fetch(`${BASE_URL}wallpaper`, {});
    console.log("auth.js => getWallpaperUrl", response);
    if (!response.ok || response.status >= 500) throw new Error("Server error");
    else if (!response.ok || response.status >= 400)
      throw new Error("Client error");
    else if (!response.ok) throw new Error("Arcane error");

    result = await response.json();
    console.log('end auth.js', result)
    return result;
  } catch (error) {
    return { status: "offline", error };
  }
}
