/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import "@babel/polyfill";
import "react-app-polyfill/ie11";
// import "core-js/fn/array/find";
// import "core-js/fn/array/includes";
// import "core-js/fn/number/is-nan";

// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)

console.log("Load your polyfills");
