## 2025-06-10 - [Bilingual Accessibility and Safety]
**Learning:** In a bilingual (EN/AR) app with RTL support, centralized translations are crucial for maintaining consistent ARIA labels across both languages. Icon-only buttons (Plus/Trash) and custom tab systems (Sidebar) are common accessibility pitfalls that need explicit ARIA roles and labels to be screen-reader friendly.
**Action:** Always include ARIA labels and roles when adding icons or custom navigation components, and ensure all user-facing strings are added to the translation utility for both LTR and RTL contexts.

## 2025-06-10 - [ATS & Mobile Responsiveness]
**Learning:** For a CV builder, "ATS compatibility" is a major user requirement that dictates a specific, minimalistic layout pattern. Additionally, viewing a fixed-width A4 document on mobile requires dynamic scaling (CSS transform) and a dedicated preview mode to ensure usability on small screens.
**Action:** Offer a dedicated ATS template with single-column layout and standard headers. Implement automatic viewport-based scaling for preview components to maintain visual fidelity across devices.
