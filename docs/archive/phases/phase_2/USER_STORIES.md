---
version: 1.0.0
---

# User Stories - Phase 2: Mai Hoa Dịch Số

## Epic 1: Hexagram Calculations Engine
As a system, I need an accurate, standalone mathematical engine to generate Hexagrams and their components so that the UI can accurately present divination data.

- **US_MH_01 (Time-based setup):** As an astrology engine, I need to convert a given Date and Hour into the corresponding number values (Year Chi Index, Lunar Month, Lunar Day, Hour Chi Index) to form the base numbers for Mai Hoa calculation.
- **US_MH_02 (Trigram Calculation):** As a user, I want the system to calculate the Upper Trigram (Ngoại Quái) and Lower Trigram (Nội Quái) using modulo 8 arithmetic on the input numbers, so that I get a valid traditional trigram (Càn, Đoài, Ly, Chấn, Tốn, Khảm, Cấn, Khôn).
- **US_MH_03 (Moving Line Calculation):** As a user, I want the system to calculate the Moving Line (Hào Động) using modulo 6 arithmetic, so that the correct Changing Hexagram can be deduced.
- **US_MH_04 (Hexagram Generation):** As an astrology engine, I need to compute the Main Hexagram (Quẻ Chủ), calculate the Mutual Hexagram (Quẻ Hổ) by taking lines 2-3-4 and 3-4-5 of the Main Hexagram, and calculate the Changing Hexagram (Quẻ Biến) by inverting the Moving Line.
- **US_MH_05 (Thể and Dụng):** As an astrology engine, I need to programmatically determine which trigram is Thể (Body - the trigram without the moving line) and which is Dụng (Application - the trigram with the moving line) in the Main Hexagram.

## Epic 2: Divination Rules & Interpretation
As a user, I need the system to read the hexagrams and cross-reference them against traditional rules (Ngũ Hành) to tell me if the outcome is auspicious or not.

- **US_MH_06 (Ngũ Hành Interaction):** As a user, I want the system to calculate the elemental interaction (Sinh, Khắc, Tỷ Hòa) between the Thể Trigram and the Dụng Trigram, so that I have a baseline understanding of whether the event starts favorably.
- **US_MH_07 (Temporal Influence):** As a user, I want the system to evaluate the strength of my Thể Trigram against the current season/month (Vượng, Tướng, Hưu, Tù, Tử) to see if my situation has the necessary environmental support.
- **US_MH_08 (Lookup Text):** As a user, I want to read the traditional names and brief meanings of the generated 64 Hexagrams, so that I can understand the symbolic meaning of the oracle.

## Epic 3: User Interface
As a user, I need an intuitive, beautiful interface to request and read my divination.

- **US_MH_09 (Entry Point):** As a user, I want a clear button or section on the main application to "Gieo Quẻ Mai Hoa" (Cast Plum Blossom Hexagram).
- **US_MH_10 (Input Selection):** As a user, I want to choose between using the current time or manually inputting numbers to cast my hexagram.
- **US_MH_11 (Visual Result):** As a user, I want to see the Quẻ Chủ, Quẻ Hổ, and Quẻ Biến presented visually as stacks of 6 lines (Dương solid, Âm broken), clearly marking which line is the Hào Động.
- **US_MH_12 (Summary Reading):** As a user, I want a clean, Apple-styled card layout summarizing the conclusion of my divination (Auspicious/Inauspicious, elemental breakdowns) without being overwhelmed by raw Data.
