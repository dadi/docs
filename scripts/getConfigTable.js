const path = require("path");
const packagePath = path.resolve(process.cwd(), process.argv[2]);
const configExport = process.argv[3] || "Config";

try {
  const config = require(packagePath)[configExport];

  console.log(config);
} catch (error) {
  console.log(error);

  process.exit(1);
}
