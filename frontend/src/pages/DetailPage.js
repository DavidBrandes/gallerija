import Navbar from "../components/layout/navbar/Navbar";
import DetailCard from "../components/structure/detail/DetailCard";
import Footer from "../components/layout/Footer";
import Related from "../components/structure/related/Related";
import ScrollToTop from "../components/utils/ScrollToTop";
import BackTop from "../components/layout/BackTop";

import WinLooseCard from "../components/popup/WinLooseCard";

import { useParams } from "react-router-dom";

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
      <BackTop />
      <Footer />
    </main>
  );
}

export default DetailPage;
