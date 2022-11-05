import Banner from "../components/layout/banner/Banner";
import Footer from "../components/layout/footer/Footer";
import BackTop from "../components/layout/backtop/BackTop";
import Navbar from "../components/layout/navbar/Navbar";

import WinLooseCard from "../components/popup/WinLooseCard";

import Masonry from "../components/structure/masonry/Masonry";

import classes from "./css/MainPage.module.css";

function MainPage() {
  return (
    <main>
      <WinLooseCard />
      <Banner />
      <Navbar showBackLink={false} />
      <Masonry />
      <BackTop containerClass={classes.backTopContainer} />
      <Footer />
    </main>
  );
}

export default MainPage;
