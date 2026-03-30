---
version: 2.3.0
updated: 2026-03-13
---

# Product Requirements Document (PRD) — Lịch Việt v2

## Overview

Lịch Việt v2 is a comprehensive Vietnamese Lunar Calendar & Metaphysical Analysis platform. It provides solar–lunar date conversion, auspicious day analysis, and nine Eastern/Western divination engines — all running entirely client-side as a React SPA.

## Target Users

- Vietnamese-speaking users seeking daily lunar calendar lookups and auspicious timing
- Astrology and divination enthusiasts interested in Tử Vi, Bát Tự, Chiêm Tinh, or Numerology
- Feng Shui practitioners needing Flying Star analysis

## Core Features (All Completed)

### 📅 Lunar Calendar Engine
- Solar ↔ Lunar date conversion with Vietnamese month/year naming
- Multi-layered auspicious activity scoring (8 factors: Ngọc Hạp, Hiệp Kỷ, Ngũ Hành, and more)
- Giờ tốt/xấu (auspicious hours) and hướng xuất hành (travel direction)
- Detailed daily view with star positions (Nhị Thập Bát Tú, Khai Sơn Lập Hướng)

### 🔮 Divination Engines (9 Total)

| # | Engine | Description |
|---|---|---|
| 1 | **Tử Vi** (紫微) | Purple Star astrology — 12-palace chart, 115+ stars, temporal overlays (Đại Hạn, Lưu Niên), Tứ Hóa analysis |
| 2 | **Bát Tự** (八字) | Four Pillars of Destiny — Thập Thần, Tàng Can, Branch Interactions, Trường Sinh, Thần Sát |
| 3 | **Chiêm Tinh** | Western Natal Chart — aspect patterns, secondary progressions, interactive SVG sky map |
| 4 | **Thần Số Học** | Numerology (Pythagorean & Chaldean) — Life Path, Expression, Soul Urge, life cycles, number interactions |
| 5 | **Mai Hoa** (梅花) | Plum Blossom Numerology — Thể/Dụng trigrams, Ngũ Hành interpretation |
| 6 | **Kỳ Môn Độn Giáp** | QMDJ multi-layered board (stems, stars, doors, deities) |
| 7 | **Lục Nhâm** | Six Ren divination — Heaven/Earth board rotation |
| 8 | **Thái Ất** | Thai At 16-palace cycle system |
| 9 | **Phi Tinh** | Flying Star Feng Shui — Luo Shu grid, 24-mountain compass |

## User Stories per Engine

### 1. Lunar Calendar & Dụng Sự
- **Planning:** As a planner, I want to see the "Dụng Sự" (Auspicious Activity) score for each day so that I can choose the best date for important events like weddings, ground-breaking, or starting a business.
- **Daily Guidance:** As a daily user, I want to see the hourly auspicious/inauspicious ratings (Giờ Hoàng Đạo/Hắc Đạo) to time my specific tasks within the day.
- **Traditional Rituals:** As a traditional user, I want to see the lunar date alongside the solar date to keep track of ancestral anniversaries and traditional holidays.
- **Mobility:** As a traveler, I want to know the "Hướng Xuất Hành" (Auspicious Travel Direction) for the day to ensure a safe and successful journey.

### 2. Tử Vi (Purple Star Astrology)
- **Natal Chart:** As a new user, I want to input my birth date, time, and gender to generate a complete Tử Vi chart with 12 palaces and 115+ stars.
- **Luck Cycles:** As an advanced user, I want to analyze the "Đại Hạn" (10-year luck cycle) and "Lưu Niên" (annual luck) to see how my fortunes change over time.
- **Transformation:** As a student of astrology, I want to see the "Tứ Hóa" (Four Transformations) and their interactions within my chart to understand subtle energy shifts.
- **Interpretation:** As a casual user, I want an automated interpretation of each palace (Life, Health, Wealth, etc.) to get a summary of my life path.

### 3. Bát Tự (Four Pillars of Destiny)
- **Elemental Balance:** As a seeker of self-knowledge, I want to know my "Dụng Thần" (Useful God) and "Hỷ Thần" (Joyful God) to know which elements I should surround myself with for balance.
- **Professional Tendencies:** As a user, I want to see the "Thập Thần" (Ten Gods) relationships to understand my social interactions and professional strengths.
- **Destiny Pillars:** As a practitioner, I want to see my "Tứ Trụ" (Four Pillars) of Year, Month, Day, and Hour to understand my core elemental makeup.

### 4. Chiêm Tinh (Western Astrology)
- **Interactive Chart:** As a Western astrology fan, I want to generate my Natal Chart and see an interactive star map (Sky Projection) of the planetary positions at birth.
- **Aspect Analysis:** As an enthusiast, I want to see the "Aspects" (conjunction, opposition, etc.) between planets to understand internal harmonies and conflicts.
- **Area of Life:** As a user, I want an interpretation of my planetary house placements to see how different areas like career or family are influenced.

### 5. Thần Số Học (Numerology)
- **Core Numbers:** As a curious individual, I want to enter my full name and birth date to calculate my "Life Path", "Soul Urge", and "Expression" numbers.
- **Temporal Alignment:** As a person curious about timing, I want to see my "Personal Year" and "Personal Month" numbers to align my actions with the current cycle.
- **Character Breakdown:** As a user, I want to see a breakdown of my name's letters and their values to see if my name is in harmony with my birth date.

### 6. Mai Hoa (Plum Blossom Numerology)
- **Hexagram Casting:** As someone seeking guidance, I want to cast a hexagram based on the current time or a random set of numbers to get immediate advice.
- **Situation Evolution:** As a practitioner, I want to see the "Bản Quẻ", "Hổ Quẻ", and "Biến Quẻ" to see the evolution of a situation from start to finish.
- **Trigram Relationship:** As a user, I want an interpretation of the "Thể" and "Dụng" trigrams to understand the balance of power in my current situation.

### 7. Kỳ Môn Độn Giáp (QMDJ)
- **Orientation:** As a decision-maker, I want to generate a QMDJ "Bàn" (Board) for a specific time and direction to find the best orientation for an important meeting.
- **Tactical Analysis:** As a strategy expert, I want to see the "Thiên", "Địa", "Nhân", and "Thần" layers to analyze complex tactical or competitive situations.
- **Flow of Energy:** As a student, I want to see the "Doors" and "Deities" to identify the most favorable paths and spiritual support.

### 8. Lục Nhâm (Six Ren)
- **Situational Snapshot:** As a traditionalist, I want to cast a Six Ren reading to get a snapshot of current events and their hidden causes.
- **Process Analysis:** As a practitioner, I want to see the "Tam Truyền" (Three Passages) to understand the beginning, middle, and end of a situation.
- **Heaven/Earth Interaction:** As a user, I want to see the "Thiên Địa Bàn" rotation to see how heavenly energies affect earthly affairs.

### 9. Thái Ất (Thai At)
- **Macro Trends:** As a scholar, I want to see the position of the Thai At deity to understand the macroscopic trends (national or global) for a specific period.
- **Cycle Observation:** As a researcher, I want to observe the Thai At star's movement across the 16 palaces to predict major cyclic shifts.

### 10. Phi Tinh (Flying Star Feng Shui)
- **Home Optimization:** As a homeowner, I want to input my house's facing direction and period to see its Flying Star chart for optimizing room layout.
- **Dynamic Adjustments:** As a practitioner, I want to see the "Lưu Niên" (Annual) and "Lưu Nguyệt" (Monthly) stars to make seasonal adjustments to my living space.
- **Risk Mitigation:** As a user, I want an interpretation of star combinations to identify potential health risks or wealth opportunities in specific sectors.

### 🎨 Design & Accessibility
- Dark mode with glassmorphism and ambient effects
- Mobile-first responsive design
- WCAG 2.1 AA compliance (focus-visible, prefers-reduced-motion, ARIA labels)
- Self-hosted Inter font family with Vietnamese character support

### 🛡️ Security
- Content Security Policy (CSP) via meta tags
- Input sanitization on all calculation engines
- No authentication tokens or user data sent to external services
- Environment variable management documented in `SECURITY.md`

## Non-Functional Requirements

| Requirement | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Bundle size (gzipped) | < 500 KB initial |
| Test coverage | 712+ tests across 43 files |
| Browser support | Modern browsers (Chrome, Firefox, Safari, Edge) |
| Accessibility | WCAG 2.1 AA |

## Future Roadmap

### Phase 5: Personalization & Integration
- Personalized daily calendar based on user's birth chart
- Contextual divination adjusted for user's elemental makeup
- Multi-profile management (self, family members)

### Phase 6: Platform Expansion
- Progressive Web App (PWA) with offline support
- Native mobile ports (Android/iOS via React Native or Capacitor)
- Server-side rendering for SEO optimization
