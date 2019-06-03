let exec = require("child_process").exec;
require("dotenv").config();

let backupsDir = "./backend/db/db-backups";
let prdDbName = "kodiri-prd";
let devDbName = "hire";
let exportPrdDb = `mongodump --uri ${
  process.env.DB_URL_production
} --out ${backupsDir}`;
let exportDevDb = `mongodump --uri ${
  process.env.DB_URL_DEV
} --out ${backupsDir}`;
let importPrdDbToDev = `mongorestore --uri ${
  process.env.DB_URL_DEV
} --db ${devDbName} ${backupsDir}/${prdDbName} --drop`;

exec(`mkdir ${backupsDir}`, () => {
  console.log("Performing PRD backup...");
  exec(exportPrdDb, error => {
    if (error) {
      console.error("Something went wrong performing PRD backup...", error);
    } else {
      console.log("PRD backup OK, performing DEV backup...");
      exec(exportDevDb, error => {
        if (error) {
          console.error("Something went wrong performing DEV backup...", error);
        } else {
          console.log("DEV backup OK, importing PRD into DEV...");
          exec(importPrdDbToDev, error => {
            if (error) {
              console.error("Import failed", error);
            } else {
              console.log(
                `Import OK, PRD DB is available in DEV as "${devDbName}"`
              );
            }
          });
        }
      });
    }
  });
});
