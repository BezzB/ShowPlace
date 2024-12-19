import { HomePage } from "../components/pages/Home/HomePage";
import { SinglePage } from "../components/watch/SinglePage";
import GenrePage from "../components/pages/Genre/GenrePage";
import TrendingPage from "../components/pages/Trending/TrendingPage";
import PopularPage from "../components/pages/Popular/PopularPage";
import TopRatedPage from "../components/pages/TopRated/TopRatedPage";
import UpcomingPage from "../components/pages/Upcoming/UpcomingPage";
import { MoviesPage } from "../components/pages/Movies/MoviesPage";
import { TVShowsPage } from "../components/pages/TVShows/TVShowsPage";
import { MyListPage } from "../components/pages/MyList/MyListPage";
import { SearchPage } from "../components/pages/Search/SearchPage";
import { ProfilePage } from "../components/pages/Profile/ProfilePage";
import { SettingsPage } from "../components/pages/Settings/SettingsPage";
import { MovieWatchPage } from "../components/watch/MovieWatchPage";
import { SeriesWatchPage } from "../components/watch/SeriesWatchPage";

export const routes = [
  {
    path: "/",
    element: HomePage,
  },
  // Movie routes
  {
    path: "/movies",
    element: MoviesPage,
  },
  {
    path: "/movie/:id",
    element: SinglePage,
  },
  {
    path: "/watch/movie/:id",
    element: MovieWatchPage,
  },
  // TV Series routes
  {
    path: "/tv-shows",
    element: TVShowsPage,
  },
  {
    path: "/tv/:id",
    element: SinglePage,
  },
  {
    path: "/watch/tv/:id",
    element: SeriesWatchPage,
  },
  // Other routes
  {
    path: "/genre/:id",
    element: GenrePage,
  },
  {
    path: "/trending",
    element: TrendingPage,
  },
  {
    path: "/popular",
    element: PopularPage,
  },
  {
    path: "/top-rated",
    element: TopRatedPage,
  },
  {
    path: "/upcoming",
    element: UpcomingPage,
  },
  {
    path: "/my-list",
    element: MyListPage,
  },
  {
    path: "/search",
    element: SearchPage,
  },
  {
    path: "/profile",
    element: ProfilePage,
  },
  {
    path: "/settings",
    element: SettingsPage,
  }
]; 