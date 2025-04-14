import app from "./app";
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.clear();
  console.log("\n\n\u001b[32m \u001b[6m =================SERVER==================");
  console.log(`\u001b[0m \u001b[39m Server is running on port ${port}`);
  console.log(` Ctrl + click : \u001b[7m http://localhost/${port}`);
  console.log(`\u001b[0m Ctrl + C :     \u001b[7m stop SERVER \n`);
  console.log("\u001b[32m \u001b[6m ===================ON====================\u001b[39m \u001b[0m\n\n");
});
