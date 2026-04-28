import { Planeettype, Prisma, PrismaClient, Stertype } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const planeeten: Prisma.PlaneetCreateManyInput[] = [
  {
    planeetnaam: "Kepler-452 b",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/KOI-7016.01",
    planeettype: Planeettype.SUPERAARDE,
    massaPlaneet: 5,
    diameterPlaneet: 1.6,
    gravitatiekracht: 1.9,
    jaarTovAarde: 384.8,
    afstandVanAarde: 1400,
    afstandVanSter: 1.05,
    weetje:
      "Kepler-452 b staat precies op de juiste afstand van zijn ster voor vloeibaar water. Door de ideale omvang van de planeet zouden deze oceanen al miljarden jaren kunnen bestaan.",
    stertype: Stertype.G,
    stermassa: 1.04,
    sterstraal: 1.1,
    temperatuurSter: 5757,
    levensduurSter: 9.07,
    leeftijdSter: 6,
    aantalPlanetenStelsel: 1,
  },
  {
    planeetnaam: "Kepler-62 e",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62%20e",
    planeettype: Planeettype.SUPERAARDE,
    massaPlaneet: 4.5,
    diameterPlaneet: 1.61,
    gravitatiekracht: 1.5,
    jaarTovAarde: 122,
    afstandVanAarde: 982,
    afstandVanSter: 0.427,
    weetje:
      "Er is een grote kans dat Kepler-62 e volledig bedekt is met water, afgeleid uit de radius van de planeet en de energie die ze van haar ster ontvangt.",
    stertype: Stertype.K,
    stermassa: 0.69,
    sterstraal: 0.64,
    temperatuurSter: 4925,
    levensduurSter: 25.29,
    leeftijdSter: 7,
    aantalPlanetenStelsel: 5,
  },
  {
    planeetnaam: "GJ 667 C c",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20667%20C",
    planeettype: Planeettype.SUPERAARDE,
    massaPlaneet: 3.8,
    diameterPlaneet: 1.5,
    gravitatiekracht: 1.6,
    jaarTovAarde: 28.1,
    afstandVanAarde: 23.6,
    afstandVanSter: 0.125,
    weetje:
      "Gebaseerd op de hoeveelheid elektromagnetische radiatie die de planeet ontvangt, zou de temperatuur hier iets warmer zijn dan op aarde, ongeveer 4.3 graden Celsius.",
    stertype: Stertype.M,
    stermassa: 0.33,
    sterstraal: 0.42,
    temperatuurSter: 3700,
    levensduurSter: 159.85,
    leeftijdSter: 6,
    aantalPlanetenStelsel: 2,
  },
  {
    planeetnaam: "Kepler-186 e",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186%20e",
    planeettype: Planeettype.ROTSPLANEET,
    massaPlaneet: 2.5,
    diameterPlaneet: 1.3,
    gravitatiekracht: 1.25,
    jaarTovAarde: 22.4,
    afstandVanAarde: 579,
    afstandVanSter: 0.11,
    weetje:
      "Kepler-186 e heeft waarschijnlijk een gebonden rotatie, waardoor altijd dezelfde kant van de planeet naar de ster gericht staat.",
    stertype: Stertype.M,
    stermassa: 0.54,
    sterstraal: 0.52,
    temperatuurSter: 3750,
    levensduurSter: 46.67,
    leeftijdSter: 4,
    aantalPlanetenStelsel: 5,
  },
  {
    planeetnaam: "Kepler-438 b",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-438%20b",
    planeettype: Planeettype.ROTSPLANEET,
    massaPlaneet: 1.46,
    diameterPlaneet: 1.12,
    gravitatiekracht: 1.3,
    jaarTovAarde: 35.2,
    afstandVanAarde: 590,
    afstandVanSter: 0.166,
    weetje:
      "De planeet staat heel dicht bij zijn ster, waardoor ze veel radiatie ontvangt. Dat kan de bewoonbaarheid sterk beperken.",
    stertype: Stertype.M,
    stermassa: 0.54,
    sterstraal: 0.52,
    temperatuurSter: 3748,
    levensduurSter: 46.67,
    leeftijdSter: 4.4,
    aantalPlanetenStelsel: 1,
  },
  {
    planeetnaam: "Wasp-39 b",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-39%20b",
    planeettype: Planeettype.HEETJUPITER,
    massaPlaneet: 0.28,
    diameterPlaneet: 1.27,
    gravitatiekracht: 0.42,
    jaarTovAarde: 4.06,
    afstandVanAarde: 700,
    afstandVanSter: 0.048,
    weetje:
      "De planeet heeft ook de officiele naam Bocaprins, genoemd naar Boca Prins Beach in het Arikok National Park op Aruba.",
    stertype: Stertype.G,
    stermassa: 0.93,
    sterstraal: 0.94,
    temperatuurSter: 5400,
    levensduurSter: 11.99,
    leeftijdSter: 9,
    aantalPlanetenStelsel: 1,
  },
  {
    planeetnaam: "HIP 65426 b",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/HIP%2065426%20b",
    planeettype: Planeettype.GASREUS,
    massaPlaneet: 9,
    diameterPlaneet: 1.5,
    gravitatiekracht: 10.7,
    jaarTovAarde: 630,
    afstandVanAarde: 385,
    afstandVanSter: 92,
    weetje:
      'HIP 65426 b was de eerste planeet die ontdekt werd met het SPHERE-instrument, een "ster-onderdrukker" die het sterlicht blokkeert om exoplaneten rechtstreeks te kunnen fotograferen.',
    stertype: Stertype.A,
    stermassa: 1.96,
    sterstraal: 1.77,
    temperatuurSter: 8800,
    levensduurSter: 1.86,
    leeftijdSter: 0.014,
    aantalPlanetenStelsel: 1,
  },
  {
    planeetnaam: "55 Cancri e",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/55%20Cancri%20e",
    planeettype: Planeettype.SUPERAARDE,
    massaPlaneet: 8,
    diameterPlaneet: 1.9,
    gravitatiekracht: 2.27,
    jaarTovAarde: 0.7,
    afstandVanAarde: 41,
    afstandVanSter: 0.015,
    weetje:
      "De warmtestraling van de planeet verandert constant. Dat wijst mogelijk op sterke vulkanische activiteit en voedt speculaties over een koolstofrijke planeet.",
    stertype: Stertype.K,
    stermassa: 0.91,
    sterstraal: 0.98,
    temperatuurSter: 5200,
    levensduurSter: 12.66,
    leeftijdSter: 8,
    aantalPlanetenStelsel: 5,
  },
  {
    planeetnaam: "KOI-55 b",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/KOI-55%20b",
    planeettype: Planeettype.ROTSPLANEET,
    massaPlaneet: 0.4,
    diameterPlaneet: 0.76,
    gravitatiekracht: 0.77,
    jaarTovAarde: 0.2,
    afstandVanAarde: 3600,
    afstandVanSter: 0.006,
    weetje:
      "KOI-55 b is vermoedelijk de blootliggende kern van een vroegere gasreus. De ster heeft het grootste deel van de planeet opgeslorpt, waarna enkel de kern overbleef.",
    stertype: Stertype.B,
    stermassa: 0.5,
    sterstraal: 0.2,
    temperatuurSter: 27000,
    levensduurSter: 0.1,
    leeftijdSter: 0.018,
    aantalPlanetenStelsel: 2,
  },
  {
    planeetnaam: "Wasp-12 b",
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-12%20b",
    planeettype: Planeettype.HEETJUPITER,
    massaPlaneet: 1.4,
    diameterPlaneet: 1.9,
    gravitatiekracht: 1.03,
    jaarTovAarde: 1.09,
    afstandVanAarde: 1347,
    afstandVanSter: 0.023,
    weetje:
      "De planeet staat zo dicht bij zijn ster dat ze geen perfecte bol is. Door de sterke zwaartekracht van de ster wordt de planeet uitgerekt tot een ovale vorm.",
    stertype: Stertype.G,
    stermassa: 1.35,
    sterstraal: 1.6,
    temperatuurSter: 6300,
    levensduurSter: 4.72,
    leeftijdSter: 2,
    aantalPlanetenStelsel: 1,
  },
];

async function main() {
  await prisma.planeet.deleteMany();
  await prisma.$executeRawUnsafe(
    "DELETE FROM sqlite_sequence WHERE name = 'planeet'",
  );
  await prisma.planeet.createMany({ data: planeeten });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
