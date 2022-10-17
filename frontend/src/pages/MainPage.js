import classes from "./css/MainPage.module.css";

import Banner from "../components/layout/Banner";
import Footer from "../components/layout/Footer";
import BackTop from "../components/layout/BackTop";
import Navbar from "../components/layout/Navbar";

import Masonry from "../components/structure/Masonry";

function MainPage() {
  return (
    <main className={classes.main}>
      <Banner></Banner>
      <Navbar showBackLink={false}></Navbar>
      <Masonry></Masonry>
      <BackTop></BackTop>
      <Footer></Footer>
    </main>
  );
}

export default MainPage;