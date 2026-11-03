# supercharged-api-validation

Demo for **Supercharged QA Tip #2**: the form blocks the bad email, the API says `201 Created`.

A toy app written from scratch for this demo. It is not a real product and holds no work code.

## What is in it
- `index.html`: a form with `type="email" required`. The browser checks the field.
- `server.js`: a tiny Node server with `POST /api/signup`.
  - Default: it accepts anything (the bug).
  - `FIXED=1`: it checks the email and returns `400` for a bad one.
- `tests/signup.spec.ts`: one Playwright test. It sends a bad email **straight to the API** with the `request` fixture. No page, no form.

## Run it
```bash
npm install
npm test            # buggy server: the test fails (got 201, expected 400)
FIXED=1 npm test    # fixed server: the test passes
```
No browser download is needed: the test only uses Playwright's `request`.

Without Playwright:
```bash
npm start           # in one terminal
npm run check       # in another: PASS or FAIL
```

## Small print
- Tested with Node 26.12.1 and @playwright/test 1.64.1.
- The email check is a simple pattern, and `400` is this demo's choice. Real projects need more rules, and your API may use another error code.
- This demo does not test the browser form. The browser check is described in MDN's client-side validation guide.

## Sources
- MDN, Client-side form validation: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
- OWASP, Input Validation Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- Playwright, API testing: https://playwright.dev/docs/api-testing
