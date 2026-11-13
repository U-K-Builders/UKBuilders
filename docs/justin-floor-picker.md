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

## Christina: plinth (ground floor) layout — FINAL

**Owner's rule (13 Nov 2026): the plinth layout dated 23.09.26 is the final
ground-floor drawing for Christina. Use it even if other ground-floor drawings
are shared later.** (File `CHRISTINA - PLINTH LAYOUT 23.09.26.pdf`, architect
Concrete Designs; private, never commit it: it carries the society's details
and the architect's personal phone numbers.)

What it shows (metres, scale 1:100):
- **6 ground-floor units** facing Dominic Road No. 3, each with a toilet:
  Unit 1 3.66 × 6.71, Unit 2 3.81 × 6.86, Unit 3 3.05 × 6.86,
  Unit 4 3.05 × 6.86, Unit 5 3.81 × 6.71, Unit 6 3.66 × 6.71.
  These are dimensions, not RERA carpet areas.
- Entrance lobby 6.37 × 6.28 (+1.05 m level); 2 lifts (1.82 × 3.16 each); fire
  lift 2.51 × 1.83; smoke-check lobby 1.52 × 1.83; staircase.
- 6.00 m two-way ramp up to the 1st podium; 6.00 m driveway; substation space
  4.57 × 5.72; electrical panel 2.24 × 5.33; underground water tank below;
  watchman cabin at the entry/exit on Dominic Road No. 3.
- Building footprint about 22.09 × 20.86 m.

**Settled 13 Nov:** all 6 units are shops (owner). Areas are in the plan set below.

## Christina: floor plan set ("brochure", 12.08.26)

File `Christina_Bldg_12.08.26.pdf`, 11 A3 pages, architect Aashish Solanki,
developer UK Properties. Coloured sales plans for every level with each unit's
area (R/A, sq.ft.). No phone numbers or emails in it. Not committed: the owner
hasn't yet said whether it may be offered as a public download.

| Level | Use | Unit areas (R/A sq.ft.) |
|---|---|---|
| Ground | 6 units (some labelled Clinic / M.P. room), entrance lobby, 4 car parks | 333.50, 349.75, 280.00, 280.00, 345.50, 331.75 |
| 1st–4th | Typical parking podium, 15 cars each (60) | – |
| 5th | Amenity podium: fitness centre (649.75), indoor play (628.75), society office, multipurpose area, lawns, jogging track | – |
| 6th, 8th–10th | 4 flats | 649.75, 628.75, 650.00, 779.50 |
| 7th (refuge) | 3 flats + refuge | 649.75, 628.75, 650.00 |
| 11th | 4 flats | 649.75, 628.75, 650.00, 779.50 |
| 12th | 4 flats | 670.50, 670.50, 800.50, 650.00 |
| 13th | 4 flats | 670.50, 670.50, 697.00, 697.00 |
| 14th (refuge) | 3 flats + refuge | 670.50, 670.50, 854.75 |
| 15th–18th | 4 flats | 670.50, 670.50, 697.00, 697.00 |
| Terrace | Barbecue deck, part terrace | – |

Totals: 50 flats + 6 ground-floor units; 64 car parks (60 podium + 4 ground).
Confirms "5 podium + 13 storeys" (4 parking podiums + amenity podium; flats on
6th–18th). Core: 2 lifts, fire lift, smoke-check lobby, staircase, 4 flats per
floor around it.

The ground-floor page (12.08.26) is older than the final plinth layout
(23.09.26); the unit sizes match. The plinth layout stays the reference.

**Settled 13 Nov:** the owner confirmed **six shops**; the site now lists all six
with these areas (branch feature/hotfix-small-phones-dark-mode).

**Settled 13 Nov:** the owner confirmed the plan set is correct. The site now
lists all nine Christina flat types from it (branch
feature/hotfix-small-phones-dark-mode):

| Area (sq.ft.) | Type | Floors | Notes |
|---|---|---|---|
| 628.75 | 2 BHK | 6–11 (flat 02) | |
| 649.75 | 2 BHK | 6–11 (flat 01) | |
| 650.00 | 2 BHK, Type A | 6–12 (flat 04) | dining |
| 670.50 | 2 BHK, Type B | 12–18 (flats 01, 02) | |
| 697.00 | 2 BHK, Type C | 13, 15–18 (flats 03, 04) | dining, 4' balcony |
| 779.50 | 3 BHK | 6, 8–11 (flat 03) | dining, powder room |
| 800.50 | 2 BHK, Type D | 12 (flat 03) | dining, part terrace |
| 854.75 | 3 BHK | 14 (flat 04) | 4' balconies |
| 1,320–1,470 | 2 BHK + 2 BHK, Jodi | – | combined flats |

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
