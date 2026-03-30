---
version: 1.0.0
---

# Source of Truth (SOT) - Phase 2: Mai Hoa Dịch Số

## 1. Domain Constants
- **Bát Quái (8 Trigrams):** Numbered 1 to 8 based on Tiên Thiên Bát Quái.
  1. Càn (Thiên - Toàn Dương)
  2. Đoài (Trạch - Thiếu Âm)
  3. Ly (Hỏa - Thái Dương)
  4. Chấn (Lôi - Thiếu Dương)
  5. Tốn (Phong - Thiếu Âm)
  6. Khảm (Thủy - Thái Âm)
  7. Cấn (Sơn - Thiếu Dương)
  8. Khôn (Địa - Toàn Âm)
- **Time Indices:** 
  - Year: Can Chi index (Tý=1, Sửu=2, ..., Hợi=12).
  - Month: Lunar Month (1-12, leap months use the primary month number).
  - Day: Lunar Day (1-30).
  - Hour: Can Chi index (Tý=1, Sửu=2, ..., Hợi=12).

## 2. Business Rules & Logic

### 2.1 Hexagram Generation (Gieo Quẻ)
- **Upper Trigram (Ngoại Quái):** `(Year + Month + Day) % 8`. If remainder is 0, use 8 (Khôn).
- **Lower Trigram (Nội Quái):** `(Year + Month + Day + Hour) % 8`. If remainder is 0, use 8 (Khôn).
- **Moving Line (Hào Động):** `(Year + Month + Day + Hour) % 6`. If remainder is 0, use 6.

### 2.2 Hexagram Types
- **Main Hexagram (Quẻ Chủ):** Formed by stacking Upper Trigram over Lower Trigram. Represents the beginning of the matter.
- **Mutual Hexagram (Quẻ Hổ):** Represents the middle/process of the matter.
  - New Lower Trigram = Lines 2, 3, 4 of Main Hexagram.
  - New Upper Trigram = Lines 3, 4, 5 of Main Hexagram.
- **Changed Hexagram (Quẻ Biến):** Represents the end/result of the matter.
  - Formed by taking the Main Hexagram and flipping the line determined by the Moving Line (Dương becomes Âm, Âm becomes Dương).

### 2.3 Thể and Dụng (Body and Application)
- **Thể Trigram:** The trigram (Upper or Lower) in the Main Hexagram that *does not* contain the Moving Line. Represents the subject/self.
- **Dụng Trigram:** The trigram in the Main Hexagram that *does* contain the Moving Line. Represents the object/event/other party.

### 2.4 Interpretation Rules (Ngũ Hành Sinh Khắc)
- **Sinh (Generates/Benefits):** 
  - Thể Sinh Dụng: The subject expends energy (Hao tổn). Bad.
  - Dụng Sinh Thể: The subject receives help/benefit (Được lợi, Tốt). Good.
- **Khắc (Controls/Destroys):**
  - Thể Khắc Dụng: The subject has control, but with effort (Khó nhọc nhưng thành). Neutral/Good.
  - Dụng Khắc Thể: The subject is forced/harmed (Đại Hung). Bad.
- **Tỷ Hòa (Equal/Parallel):**
  - Thể and Dụng have the same element (Bình hòa). The subject has peers/help. Good.

## 3. Data Structures

### Hexagram Data Model
```typescript
interface Trigram {
    id: number; // 1-8
    name: string; // "Càn", "Đoài", etc.
    element: string; // "Kim", "Kim", "Hỏa", etc.
    lines: boolean[]; // Array of 3 booleans: true for Dương, false for Âm. Index 0 is bottom line.
}

interface Hexagram {
    id: number; // 1-64
    name: string; // "Thiên Địa Bĩ", etc.
    upper: Trigram;
    lower: Trigram;
    lines: boolean[]; // Array of 6 booleans
}

interface DivinationResult {
    mainHexagram: Hexagram;
    mutualHexagram: Hexagram;
    changedHexagram: Hexagram;
    movingLine: number; // 1-6
    theTrigram: 'upper' | 'lower'; // Which part is Thể
    dungTrigram: 'upper' | 'lower';
    assessment: {
        elementalInteraction: string; // "Dụng Sinh Thể", "Thể Khắc Dụng", etc.
        meaning: string;
    };
}
```
