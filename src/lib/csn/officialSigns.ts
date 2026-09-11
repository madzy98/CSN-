/**
 * Official CSN sign registry.
 * Rasters belong in /public/signs/{id}.png — never generate those files.
 * Source: Likumi.lv MK 279 4. pielikums (verify live before replacing files).
 */

export const LEGAL_SOURCE =
  "https://likumi.lv/ta/id/274865-celu-satiksmes-noteikumi#piel4";

/** Bank slug → CSN 4. pielikums number. */
export const SIGN_SLUG_TO_ID: Record<string, string> = {
  intersection: "101",
  "curve-left": "103",
  slippery: "115",
  "falling-rocks": "117",
  children: "121",
  "two-way": "122",
  "traffic-lights": "123",
  "wild-animals": "125",
  "priority-road": "201",
  "end-priority": "202",
  yield: "206",
  "yield-ahead": "206",
  stop: "207",
  "stop-ahead": "207",
  "give-way-oncoming": "208",
  "oncoming-priority": "209",
  "no-entry": "301",
  "no-vehicles": "302",
  "no-motor": "303",
  "no-pedestrians": "309",
  "height-limit": "311",
  "weight-limit": "312",
  "no-right": "315",
  "no-left": "316",
  "no-u-turn": "317",
  "no-overtaking": "319",
  "end-no-overtaking": "320",
  "speed-30": "323",
  "speed-50": "323",
  "speed-70": "323",
  "speed-90": "323",
  "speed-110": "323",
  "end-speed": "324",
  "no-horn": "325",
  "no-stopping": "326",
  "no-parking": "327",
  "end-all-limits": "330",
  "mandatory-straight": "401",
  "mandatory-right": "402",
  "mandatory-right-or-straight": "404",
  "roundabout-mand": "409",
  bike: "413",
  "min-speed-50": "423",
  "one-way": "501",
  "bus-lane": "505",
  "built-up": "519",
  "end-built-up": "520",
  "pedestrian-zone": "527",
  "living-street": "533",
  parking: "537",
  "bus-stop": "541",
  tunnel: "544",
  "end-expressway": "553",
  "first-aid": "601",
  hospital: "602",
  "road-works": "128",
  railway: "126",
  "roundabout-warn": "102",
  "pedestrian-warn": "120",
};

export const CRITICAL_SIGN_IDS = ["423", "424", "323", "324"] as const;

export function signIdForSlug(slug: string | undefined): string | null {
  if (!slug) return null;
  return SIGN_SLUG_TO_ID[slug] ?? null;
}

export function officialSignSrc(signId: string): string {
  return `/signs/${signId}.png`;
}

export const OFFICIAL_SIGN_FILE_SET = new Set<string>([
  "423",
]);

export function hasOfficialRaster(signId: string | null): boolean {
  return Boolean(signId && OFFICIAL_SIGN_FILE_SET.has(signId));
}
