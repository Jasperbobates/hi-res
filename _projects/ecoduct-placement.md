---
date: '2023-11-20T10:00:00.000Z'
title: Animals need infrastructure too
tagline: Assessing optimal ecoduct placement in the Gooi
preview: >-
  A spatial analysis project focused on identifying optimal locations for wildlife crossings (ecoducts) in the Gooi region of the Netherlands.
image: https://upload.wikimedia.org/wikipedia/commons/2/2d/Kolu_%C3%B6kodukt_Tartu_maanteel_2021._aasta_septembris.jpg
---

## Project Background

In the 1990s, the Netherlands introduced a Nature Policy Plan (*Natuurbeleidsplan*) to address the increasing fragmentation of wildlife areas caused by intensive infrastructure developments over the past century. With the aim of reconnecting different wildlife areas through a national ecological network, the policy most notably resulted in the 800 meter long natural bridge in the Gooi region. However, more such ecoducts are needed to support the ecological network, the project has become subject to significant postponements. In this project I developed a model to predict optimal wildlife corridor locations using ArcGIS to connect the isolated wildlife areas in the Gooi.  

## Analysis Approach


Two main variables are considered for this model:
1. Land cover suitability for wildlife
    - Distance from the closest buildings (the larger the distance the better)
    - Distance from the infrastructure (the larger the distance the better)
    - Land cover type (forest is more suitable than meadows,      heather fields, or water)
2. Construction costs
    - Land cover type (it is more costly to construct wildlife passages over built-up)

These variables are combined to create a friction surface which measures the difficulty of traversing a given pixel on the map. This was combined with a distance measure to assess the shortest distance between two points when accounting for the land cover and construction costs (called a cost direction grid)

<div class="ecoduct-images" style="display: flex; gap: 20px; justify-content: center; margin: 20px 0;">
  <div style="text-align: center;">
    <h4 style="font-size: 1rem; font-weight: 500; margin: 0; line-height: 1;">Friction surface grid</h4>
    <img src="/images/project_pics/Friction.png" alt="Friction surface map" style="max-width: 100%; height: auto;" />
  </div>
  <div style="text-align: center;">
    <h4 style="font-size: 1rem; font-weight: 500; margin: 0; line-height: 1;">Cost direction grid</h4>
    <img src="/images/project_pics/Layout.png" alt="Ecoduct placement map" style="max-width: 100%; height: auto;" />
  </div>
</div>


The analysis identified several high-priority locations for ecoduct placement, balancing ecological needs with infrastructure constraints and budget considerations.

## Image Attribution
- Project header image: [Sillerkiil](https://commons.wikimedia.org/wiki/File:Kolu_%C3%B6kodukt_Tartu_maanteel_2021._aasta_septembris.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kolu_%C3%B6kodukt_Tartu_maanteel_2021._aasta_septembris.jpg)

---



