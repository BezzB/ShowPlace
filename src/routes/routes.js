import { HomePage } from "../components/pages/Home/HomePage";
import { SinglePage } from "../components/watch/SinglePage";
import GenrePage from "../components/pages/Genre/GenrePage";
import TrendingPage from "../components/pages/Trending/TrendingPage";
import PopularPage from "../components/pages/Popular/PopularPage";
import TopRatedPage from "../components/pages/TopRated/TopRatedPage";
import UpcomingPage from "../components/pages/Upcoming/UpcomingPage";

export const routes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/movie/:id",
    element: SinglePage,
  },
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
]; 