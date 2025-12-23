// import { prisma } from "./db/prisma.ts";

// const raw = [
//   {
//     title: "The Shawshank Redemption",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "1994",
//     genre: ["Drama", "Crime"],
//     rating: "9.2",
//   },
//   {
//     title: "The Godfather",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "1972",
//     genre: ["Drama", "Crime"],
//     rating: "9.2",
//   },
//   {
//     title: "The Dark Knight",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "2008",
//     genre: ["Action", "Adventure"],
//     rating: "9.0",
//   },
//   {
//     title: "Pulp Fiction",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "1994",
//     genre: ["Drama", "Crime"],
//     rating: "8.9",
//   },
//   {
//     title: "Forrest Gump",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "1994",
//     genre: ["Drama", "Romance"],
//     rating: "8.8",
//   },
//   {
//     title: "Fight Club",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "1999",
//     genre: ["Drama", "Thriller"],
//     rating: "8.8",
//   },
//   {
//     title: "The Matrix",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "1999",
//     genre: ["Sci-fi", "Action"],
//     rating: "8.7",
//   },
//   {
//     title: "Goodfellas",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "1990",
//     genre: ["Drama", "Crime"],
//     rating: "8.7",
//   },
//   {
//     title: "Interstellar",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "2014",
//     genre: ["Sci-fi", "Adventure"],
//     rating: "8.6",
//   },
//   {
//     title: "Whiplash",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "2014",
//     genre: ["Drama", "Music"],
//     rating: "8.5",
//   },
//   {
//     title: "Parasite",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "2019",
//     genre: ["Thriller", "Drama"],
//     rating: "8.5",
//   },
//   {
//     title: "Spider-Man: Into the Spider-Verse",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "2018",
//     genre: ["Family", "Action"],
//     rating: "8.3",
//   },
//   {
//     title: "Coco",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "2017",
//     genre: ["Family", "Adventure"],
//     rating: "8.3",
//   },
//   {
//     title: "Your title",
//     imgUrl:
//       "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_FMjpg_UX674_.jpg",
//     releaseDate: "2016",
//     genre: ["Romance", "Fantasy"],
//     rating: "8.3",
//   },
// ];

// async function main() {
//   const movies = raw.map((movie) => ({
//     title: movie.title,
//     imgUrl: movie.imgUrl ?? null,
//     description: null,

//     // ⚠️ Schema typo preserved
//     genre: movie.genre,

//     // Convert year → Date (Jan 1st of that year)
//     releaseDate: Number.parseInt(movie.releaseDate),

//     // Convert string → float
//     rating: movie.rating ? parseFloat(movie.rating) : null,
//   }));

//   await prisma.movie.createMany({
//     data: movies,
//     skipDuplicates: true,
//   });
// }

// main()
//   .then(() => {
//     console.log("Movies seeded successfully");
//   })
//   .catch((err) => {
//     console.error("Seeding failed:", err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
