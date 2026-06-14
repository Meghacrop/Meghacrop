# MeghaCrop — Agriculture Super App

Front-end demo (React + Vite) for the AP & Telangana agri marketplace.

## Run on your own computer (optional, to preview locally)
1. Install Node.js LTS from nodejs.org
2. In this folder, open a terminal and run:
       npm install
       npm run dev
3. Open the link it prints (usually http://localhost:5173)

## Deploy to the internet (Vercel — recommended, free)
See DEPLOY_STEPS.txt for click-by-click instructions.

## Where the data lives
All products are in src/MeghaCrop.jsx under the "REAL-DATA LAYER" comment block.
Use the MeghaCrop_Data_Entry.xlsx workbook to collect products + Cloudinary image
links, then they get imported into that block.

## Project structure
- index.html ............ page shell
- src/main.jsx .......... app entry
- src/MeghaCrop.jsx ..... the whole app (screens + data)
- public/favicon.svg .... the 5-bar logo mark
- package.json / vite.config.js ... build config
