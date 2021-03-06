# listlist web

**Technogly Stacks**

- Language: HTML5, SCSS, TypeScript, Styled-components
- JS Library: React.js
- React Framework: Next.js
- UI Framework: Boostrap for React
- State Management: Redux
- Front-End Data Layer: Relay

## Getting Started

1. Copy `src/web.config.ts.example` to `src/web.config.ts`, then change config informations in `src/web.config.ts`.
2. Run `npm i` to install all dependencies.
3. If you wanna start dev env: run `yarn dev`.
4. If you wanna build production: run `yarn build`, then run `yarn start`.
5. Visit `http://localhost:3000` in browser.

## Remarks

You have to configure the image domain in `next.config.js` if you gonna use image from external.

Change `images.domains` property in `next.config.js`.

## About Google Login

1. Follow steps on `https://developers.google.com/identity/sign-in/web/sign-in`
2. Change `googleLoginClientID` in `src/web.config.ts` file

## About Facebook Login

1. Follow steps on `https://developers.facebook.com`
2. Change `facebookAppID` in `src/web.config.ts` file

## About Google Map Place API

**Using google map place api to autocomplete the address input by user**

1. Follow steps on `https://developers.google.com/maps/documentation/javascript/places?hl=en_GB`
2. Change `googleMapPlaceAPIKey` in `src/web.config.ts` file