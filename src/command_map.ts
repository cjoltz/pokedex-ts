import type { State } from "./state.js";

export async function commandMap(state: State) {
  const locationsObj = await state.PokeAPI.fetchLocations(
    state.nextLocationsURL,
  );
  state.nextLocationsURL = locationsObj.next;
  state.prevLocationsURL = locationsObj.previous;
  for (const location of locationsObj.results) {
    console.log(location.name);
  }
}
