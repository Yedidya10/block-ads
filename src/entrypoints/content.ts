export default defineContentScript({
  matches: ["https://1337x.to/*"],
  main() {
    console.log("Hello content.");
  },
});
