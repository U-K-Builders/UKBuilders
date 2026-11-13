# Justin and Christina: "Choose your floor" and 3D flat explorer (PAUSED)

> **13 Nov 2026: the owner wants this for BOTH ongoing projects, Justin and
> Christina.** Build it once as a shared component driven by per-project data
> (`src/data/`), not two copies. A third reference video added two features:
> - **Day / night** versions of each room render (toggle).
> - **Furnished / bare shell** versions of each room (toggle or slider), so a
>   buyer sees the room styled and as handed over.
> Both need two renders per room from the visualiser (four if both toggles are
> used), so confirm with the owner which ones are worth the render cost.
>
> **Christina needs its own documents** (nothing received yet): the approved
> plan PDF (like Justin's), the sales sheet, and renders. Christina facts on
> record: MahaRERA PR1180002600221, possession Aug 2028, 105,000 sq.ft
> built-up; the site lists 5 podium + 13 storeys (unconfirmed by the owner);
> flat types 2 BHK A/B/C/D, 3 BHK, Jodi, 5 shops (`src/data/projectDetails.js`).

**Status:** paused on 12 November 2026 at the owner's request. Waiting on the
items in "Still needed" below. Remind the owner about this whenever they start
other work.

## Goal

Like the two reference videos the owner shared (a luxury tower site):

1. **Choose your floor:** hover or scroll over the Justin tower image; the floor
   lights up and a panel shows the floor number, flat types, carpet areas and
   availability (and price if the owner decides to show it).
2. **Go inside:** click a floor or flat; zoom into a 3D cut-away of the flat
   with clickable rooms, each opening a room view.

## Source documents (private: never commit them)

The public repo must not contain these files; they carry the society name,
approval numbers and digital signatures. Only redrawn plans may be published.

- `Amended_Approved_Plan_(signed)_06-11-25.pdf`: 8 A0 sheets, BMC approved plan.
- `Amended_Plan_Justin_CHSL_(06-11-25).dwg`: the same drawings in AutoCAD 2018
  format. Not needed now that we have the PDF. (Reading the DWG needs a DWG
  converter, which the session's safety check blocked.)

Sheet map of the PDF:

| Sheet | Contents |
|---|---|
| 1 | Ground floor plan, block and location plan, area / tenement / parking statements |
| 2 | Podium plans (1st to 5th typical, 6th), 7th floor, 8th & 9th, 10th |
| 3 | Typical 11th to 13th, 14th, typical 15th to 18th, terrace, area calculations |
| 4 | Elevation, section A-A, lobby sections, typical sections through living and bedroom |
| 5–6 | Area calculation drawings |
| 7 | RERA carpet area statements per flat and floor range, with flat plans |
| 8 | Built-up area statements per flat |

## What the plan shows

- **Floor stack:** ground floor (shop), podiums 1st to 6th (parking, lobby),
  residential **7th to 18th**, terrace. Refuge areas on the 7th and 14th.
  Balconies from the 14th floor up.
- **4 flats per residential floor** (plan numbers Flat 1 to 4) around a central
  core: 2 lifts, 1 fire-evacuation lift, staircase, 2.25 m lobby.
- Plan variants: 7th, 8th & 9th, 10th, 11th to 13th (typical), 14th, 15th to 18th.
- **Typical floor (11th to 13th) rooms, in metres:** living/dining 3.05 × 5.05;
  kitchen 2.15 × 3.50–3.55; bedrooms 3.20 × 3.05–3.55; toilets 2.15 × 1.25 and
  1.25 × 1.90–2.15; passage 1.00–1.25 m wide. Footprint 17.85 × 21.05 m.

RERA carpet areas (carpet + balcony) matched to the site's flat types by area.
**Unconfirmed: the sales team must confirm the mapping.**

| Plan total | Site type (`src/data/projectDetails.js`) |
|---|---|
| 57.64 m² | 2 BHK Type A, 620 sq.ft. |
| 62.98 m² | 2 BHK Type B, 678 sq.ft. |
| 63.99 m² | 2 BHK Type C, 689 sq.ft. |
| 78.33 m² (67.40 + 10.94 balcony) | 3 BHK, 843 sq.ft. |
| 40.80 m² | Ground-floor shop (site says 430 sq.ft.) |

RERA statements exist for: Flat 1 at 8th–9th and 10th–13th; Flat 2 at 7th–9th,
10th–13th and 14th; Flats 3 & 4 at 7th–10th, 11th–13th and 14th–18th.

## Still needed from the owner

**For Christina:** its signed approved plan (PDF), its sales sheet and its
renders, the same as listed for Justin below.

**For both:** whether to have day/night and furnished/bare views (each doubles
the room renders).


1. **Sales sheet** (Excel): one row per flat: flat number as sold (e.g. 1101),
   floor, plan position (Flat 1–4), type (A / B / C / 3 BHK / Jodi), status
   (available / booked / sold), optional price. Which flats form Jodi units.
   **No buyer names or contact details.**
2. **Decisions:** exact price, "from" price, or "price on request"; show sold
   flats as sold, or hide them.
3. **Renders** (from the 3D visualiser), for the photoreal version: a 3D
   cut-away per flat type; room renders (living, bedroom, kitchen, bathroom);
   ideally a daytime front view of the tower.

## Plan for building it

- Branch: `feature/justin-floor-picker` (made from `main`). Never merge to
  `main` without the owner's approval.
- Phase 1 (needs only the plan + sales sheet): floor picker over the tower
  render; redrawn 2D flat plans (SVG) with clickable rooms and sizes; floor and
  flat data in `src/data/`.
- Phase 1b (optional, no renders needed): white-model 3D flats extruded from
  the redrawn plans, rotatable, rooms clickable.
- Phase 2 (when renders arrive): photoreal cut-aways and room views; label all
  renders "artist's impression".
- Carpet areas shown must match the MahaRERA-registered figures.
