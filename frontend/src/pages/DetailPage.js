import classes from "./css/DetailPage.module.css";

import Navbar from "../components/layout/Navbar";
import DetailCard from "../components/card/DetailCard";
import Footer from "../components/layout/Footer";
import Related from "../components/structure/Related";
import ScrollToTop from "../components/utils/ScrollToTop";

import { useParams } from "react-router-dom";

function DetailPage(props) {
  let { id } = useParams();
  id = Number(id);

  console.log("detail page render", id);

  return (
    <main className={classes.main}>
      <ScrollToTop></ScrollToTop>
      <Navbar showBackLink={true}></Navbar>
      <DetailCard id={id}></DetailCard>
      <Related id={id}></Related>
      <Footer></Footer>
    </main>
  );
}

export default DetailPage;
