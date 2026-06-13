# CLAUDE.md

## Language Rules

### Default: Simple English
- Use **simple English** for all responses, explanations, and code comments.
- Keep sentences short and clear. Avoid complex vocabulary.
- This is the default mode for every new conversation.

### Switch to Chinese (中文)
When the user asks a question or gives instructions **in Chinese (中文)**:
- Switch ALL responses to **中文** (Chinese).
- All explanations must be in **中文**.
- All code comments must be written in **中文**.
- Continue using **中文** for everything until the user explicitly writes in English again.

### Switch Back to Simple English
When the user writes a question or instruction **in English**:
- Switch ALL responses back to **simple English**.
- All explanations return to simple English.
- All code comments return to English.
- Continue using simple English until the user writes in Chinese again.

### Summary Table

| User writes in | Your response language | Code comment language |
|----------------|------------------------|------------------------|
| English        | Simple English         | English               |
| 中文           | 中文                   | 中文                  |
