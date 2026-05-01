/*
  Warnings:

  - You are about to drop the column `mogelijkBewoonbaar` on the `planeet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_planeet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "planeetnaam" TEXT,
    "planeettype" TEXT NOT NULL,
    "massa_planeet" REAL NOT NULL,
    "diameter_planeet" REAL NOT NULL,
    "gravitatiekracht" REAL NOT NULL,
    "jaar_tov_aarde" REAL NOT NULL,
    "afstand_van_aarde" REAL NOT NULL,
    "afstand_van_ster" REAL NOT NULL,
    "weetje" TEXT,
    "nasa_url" TEXT,
    "stertype" TEXT NOT NULL,
    "stermassa" REAL NOT NULL,
    "sterstraal" REAL NOT NULL,
    "temperatuur_ster" REAL NOT NULL,
    "levensduur_ster" REAL NOT NULL,
    "leeftijd_ster" REAL NOT NULL,
    "aantal_planeten_stelsel" INTEGER NOT NULL,
    "mogelijk_bewoonbaar" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_planeet" ("aantal_planeten_stelsel", "afstand_van_aarde", "afstand_van_ster", "diameter_planeet", "gravitatiekracht", "id", "jaar_tov_aarde", "leeftijd_ster", "levensduur_ster", "massa_planeet", "nasa_url", "planeetnaam", "planeettype", "stermassa", "sterstraal", "stertype", "temperatuur_ster", "weetje") SELECT "aantal_planeten_stelsel", "afstand_van_aarde", "afstand_van_ster", "diameter_planeet", "gravitatiekracht", "id", "jaar_tov_aarde", "leeftijd_ster", "levensduur_ster", "massa_planeet", "nasa_url", "planeetnaam", "planeettype", "stermassa", "sterstraal", "stertype", "temperatuur_ster", "weetje" FROM "planeet";
DROP TABLE "planeet";
ALTER TABLE "new_planeet" RENAME TO "planeet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
