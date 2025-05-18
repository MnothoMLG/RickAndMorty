Ambl mobile app assessment by Mnotho

A Rick and Morty character listing app, that allows user to search for characters by name, add characters to their favourites list also.

Notable improvements are around memoizing and optimizing list renders.
There is an intermittent glitch when interacting with the lists that I couldn't quite get my head around.

To run project:

1. yarn / npm i / npx expo install
2. create a .env file in the project root and include :
   BASE_URL=https://rickandmortyapi.com/api

3. Yarn start, the Metro Bundler will start
4. Make sure you're on expo go (press s to switch)
5. You can either scan the QR code and run on a physical device (Will require installing Expo Go) or select a platform from one of the options provided

NB: This is an Expo Go build, but can be turned into a development build that'll allow use and installation of RN 3rd party libraries and use of eas for app distribution either internally or to stores.
