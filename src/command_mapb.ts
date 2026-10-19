import type { State } from "./state.js";

export async function commandMapB(state: State) {
  if (state.prevLocationsURL === null) {
    console.log("You're on the first page");
    return;
  }
  const locationsObj = await state.PokeAPI.fetchLocations(
    state.prevLocationsURL,
  );
  state.nextLocationsURL = locationsObj.next;
  state.prevLocationsURL = locationsObj.previous;
  for (const location of locationsObj.results) {
    console.log(location.name);
  }
}
