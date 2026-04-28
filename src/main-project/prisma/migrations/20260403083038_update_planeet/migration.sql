/*
  Warnings:

  - You are about to drop the column `name` on the `Flag` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "planeet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "planeettype" TEXT NOT NULL,
    "massa_planeet" REAL NOT NULL,
    "diameter_planeet" REAL NOT NULL,
    "gravitatiekracht" REAL NOT NULL,
    "jaar_tov_aarde" REAL NOT NULL,
    "afstand_van_aarde" REAL NOT NULL,
    "afstand_van_ster" REAL NOT NULL,
    "weetje" TEXT,
    "stertype" TEXT NOT NULL,
    "stermassa" REAL NOT NULL,
    "sterstraal" REAL NOT NULL,
    "temperatuur_ster" REAL NOT NULL,
    "levensduur_ster" REAL NOT NULL,
    "leeftijd_ster" REAL NOT NULL,
    "aantal_planeten_stelsel" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Role" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initials" TEXT NOT NULL,
    "pattern" TEXT NOT NULL
);
INSERT INTO "new_Flag" ("createdAt", "id", "initials", "pattern") SELECT "createdAt", "id", "initials", "pattern" FROM "Flag";
DROP TABLE "Flag";
ALTER TABLE "new_Flag" RENAME TO "Flag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
