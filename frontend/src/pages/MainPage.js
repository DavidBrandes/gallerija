import classes from "./css/MainPage.module.css";

import Banner from "../components/layout/Banner";
import Footer from "../components/layout/Footer";
import BackTop from "../components/utils/BackTop";
import Navbar from "../components/layout/Navbar";

import MainGrid from "../components/structure/MainGrid";

function MainPage() {
  return (
    <main className={classes.main}>
      <Banner></Banner>
      <Navbar showBackLink={false}></Navbar>
      <MainGrid></MainGrid>

      <BackTop></BackTop>
      <Footer></Footer>
    </main>
  );
}

export default MainPage;
