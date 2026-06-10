## 2025-06-10 - [Bilingual Accessibility and Safety]
**Learning:** In a bilingual (EN/AR) app with RTL support, centralized translations are crucial for maintaining consistent ARIA labels across both languages. Icon-only buttons (Plus/Trash) and custom tab systems (Sidebar) are common accessibility pitfalls that need explicit ARIA roles and labels to be screen-reader friendly.
**Action:** Always include ARIA labels and roles when adding icons or custom navigation components, and ensure all user-facing strings are added to the translation utility for both LTR and RTL contexts.
