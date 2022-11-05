import Navbar from "../components/layout/navbar/Navbar";
import DetailCard from "../components/structure/detail/DetailCard";
import Footer from "../components/layout/footer/Footer";
import Related from "../components/structure/related/Related";
import ScrollToTop from "../components/utils/ScrollToTop";
import BackTop from "../components/layout/backtop/BackTop";

import WinLooseCard from "../components/popup/WinLooseCard";

import { useParams } from "react-router-dom";

import classes from "./css/DetailPage.module.css";

function DetailPage(props) {
  let { id } = useParams();
  id = Number(id);

  console.log("detail page render", id);

  return (
    <main>
      <WinLooseCard />
      <ScrollToTop />
      <Navbar showBackLink={true} />
      <DetailCard id={id} key={id} />
      <Related id={id} />
      <BackTop containerClass={classes.backTopContainer} />
      <Footer />
    </main>
  );
}

export default DetailPage;
