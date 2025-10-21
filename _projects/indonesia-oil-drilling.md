---
date: '2024-06-15T10:00:00.000Z'
title: To drill or not to drill?
tagline: A spatial analysis of oil drilling in Indonesia
preview: >-
  A comprehensive spatial analysis examining the environmental and economic impacts of oil drilling in Indonesia.
image: /images/project_pics/IDN_wells.png
collaborators:
  - name: "Indonesian Directorate for Oil and Gas"
    logo: "/images/Logos/ESDM.svg"
    website: "https://www.migas.go.id"
  - name: "Indonesian Audit Board"
    logo: "/images/Logos/BPK_logo.svg"
    website: "https://www.bpk.go.id"
link:
  title: "To Drill Or Not To Drill? How Corruption Affects The Extraction of Natural Resources"
  url: "https://1drv.ms/b/c/12c3c96872fa0d08/EQgN-nJoycMggBIxJQAAAAAB9YW_Vm0XcRpBid4RO7nXjA?e=XB45ue"
  type: "Master's Thesis"
---

# Project Overview

After the fall of Indonesia's long-standing dictator Suharto, Indonesia began a transition towards a decentralized governance system. This culminated in a 2001 decentralization policy which, amongst other things, provided Indonesian municipalities (*kabupaten*) with autonomy over their own natural resources and partial control over the revenues from their exploitation. 

Inspired by Nobel Laureates Acemoglu, Johnson, and Robertson's work on institutions, my graduate dissertation explores the impact of this regional oil and gas governance in Indonesia.  

# Hypothesis
The starting point of the analyses begins with two conflicting predictions on how corrupt governance impacts extraction behavior:

**The Discounting Effect** - Corrupt institutions create uncertainty amongst resource owners. Will they demand shares of the profit? Will their property rights be respected? This uncertainty lowers their expected future revenues and the overall value of the resource. In response, we should expect resource owners to extract more over a shorter time span.

**The Disinvestment Effect** - Corrupt institutions tend to correlate with low ease of doing business. Resource owners will therefore decrease their investment efforts when they deem the business environment to be too challenging. This problem is compounded by the high upfront investments needed to extract oil and natural gas resources, leading many potential petroleum companies to avoid entering the market altogether. We should therefore expect overall extraction volumes to decrease.

What these two predictions highlight is that there is a sequential decision to be made: to drill, or not to drill? And if so, how much? This succinctly describes the central thesis of this dissertation.

# Methodology

<figure class="float-right">
  <img src="/images/project_pics/Map.gif" alt="Spatial analysis map of Indonesian oil drilling" class="right" style="width: 500px; height: auto;" />
</figure>

With spatial data on oil and natural gas well locations provided by the Indonesian Directorate for Oil and Gas, institutional data from the Indonesian Audit Board (BPK) and its statistical bureau (BPS), I created a novel spatial dataset to observe variations in oil and gas drilling across municipal jurisdictions. Because the inclusiveness of the institutions is highly dependent on the current value of their natural resources, I therefore interacted static governance indicators (share variable) with dynamic oil and gas prices (shift variable). I also wanted to assess whether these behaviors exhibited any spatial correlation with oil-producing municipalities nearby each other. I therefore conducted a two-way fixed effects spatial autoregression (SAR), a fancy econometric term for estimations involving spatially dependent panel data.

# Key Findings

- **Ethnic fractionalization effect**: Oil-producing municipalities with higher ethnic fractionalization exhibit higher-than-average extraction rates. For example, a one standard deviation increase in oil price causes a municipality with a high ethnic fractionalization to drill 2.5 more wells than a low ethnic fractionalization, all else equal.

<figure class="center">
  <img src="/images/project_pics/Effect.png" alt="EFI effect analysis" class="center" />
</figure>

- **Audit scores**: Poor audit scores do not seem to impact extraction behavior much.

- **Spatial spillovers**: Effects do indeed spill over. If one regency drills more, adjacent municipalities also tend to drill more, even when controlling for their respective oil and gas deposits. This highlights that there is a continued need for central coordination to ensure long-term sustainability and social welfare in the face of regional competition.

<figure class="center">
  <img src="/images/project_pics/Spillover.png" alt="Spillover effect analysis" class="center" />
</figure>

# Tools Used
- **ArcGIS** for spatial analysis
- **Excel Power Query** for data cleaning
- **Stata/R** for statistical modelling