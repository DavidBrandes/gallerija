import Banner from "../components/layout/Banner";
import Footer from "../components/layout/Footer";
import BackTop from "../components/layout/BackTop";
import Navbar from "../components/layout/navbar/Navbar";

import WinLooseCard from "../components/popup/WinLooseCard";

import Masonry from "../components/structure/masonry/Masonry";

function MainPage() {
  return (
    <main>
      <WinLooseCard />
      <Banner />
      <Navbar showBackLink={false} />
      <Masonry />
      <BackTop />
      <Footer />
    </main>
  );
}

export default MainPage;
