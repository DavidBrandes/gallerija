import classes from "./css/DetailPage.module.css";

import Navbar from "../components/layout/Navbar";
import DetailPageCard from "../components/card/DetailPageCard";

import { useParams } from "react-router-dom";

function DetailPage(props) {
  const { id } = useParams();

  return (
    <main className={classes.main}>
      <Navbar showBackLink={true}></Navbar>
      <DetailPageCard id={id}></DetailPageCard>
    </main>
  );
}

export default DetailPage;
