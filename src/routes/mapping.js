import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import AppNavbar from "../components/Navbar/Navbar";
import AppFooter from "../components/Footer/Footer";

const routesMapping = [
  {
    single: false,
    withAppLayout: true,
    path: "/",
  },
  {
    withAppLayout: true,
    path: "/contact",
    Navbar: AppNavbar,
    Footer: AppFooter,
    Component: Contact,
    single: true,
  },
  {
    withAppLayout: true,
    path: "/projects",
    Navbar: AppNavbar,
    Footer: AppFooter,
    Component: Projects,
    single: true,
  },
];

export default routesMapping;
