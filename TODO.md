# Merge Project 2 into Project 1 TODO

## Client Merge into client/
- [x] Update client/package.json to include dependencies from client1 (TypeScript, Vite, shadcn/ui, @tanstack/react-query), add Vite scripts, TypeScript devDeps
- [x] Convert client/src/App.js to App.tsx and merge routes from client1/App.tsx
- [x] Add new pages from client1/src/pages (FraudRulesEngine, CreateRule, EditRule, RulePerformance, ClaimDetail, NotFound) to client/src/pages
- [x] Add new components from client1/src/components (NavLink, audit/, layout/, rules/, ui/) to client/src/components; handle conflicts like NavLink vs Navbar
- [x] Convert client/src/index.js to main.tsx
- [x] Update config files: merge postcss.config.js, update tailwind.config.js to .ts, add vite.config.ts, tsconfig files
- [x] Merge public/ directories

## Server Merge into server/src/
- [x] Merge server/src/main.py with server2/app/main.py: combine CORS, include routers from both
- [x] Merge server/src/auth/ with server2/app/auth.py
- [x] Add server2/app/routers/rules.py and routers/audit.py to server/src/routers/
- [x] Merge server/src/database/, add models.py, schemas.py from server2
- [x] Add core/, services/ from server2/app/ to server/src/
- [x] Update server/requirements.txt to include all dependencies from server2 (e.g., json-logic)
- [ ] Update server/alembic.ini and migrations for combined models (generate new migrations)

## Followup Steps
- [x] Install dependencies in client/ (npm install) - Completed
- [x] Install dependencies in server/ (pip install -r requirements.txt)
- [x] Generate alembic migrations for combined models
- [x] Test the merged applications: run client (vite dev) and server (uvicorn main:app)
- [x] Verify all routes and functionalities work correctly
- [x] After successful merge, delete client1/ and server2/
