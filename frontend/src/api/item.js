class Item {
  constructor() {
    this.loadTime = Number(process.env.REACT_APP_API_CALL_TIME);
    this.date = new Date();
    this.items = [
      {
        srcLow: ["/images/Maeda_Primavesi.webp"],
        srcHigh: ["/images/Maeda_Primavesi.webp"],
        title: "Mäda Primavesi",
        subTitle: "Gustav Klimt",
        id: 0,
        description: {
          Medium: "Oil on Canvas",
          Measures: "H 149,9 cm x W 110,5 cm",
          Country: "Austria",
          Year: "1912",
        },
      },
      {
        srcLow: ["/images/The_trees.webp"],
        srcHigh: ["/images/The_trees.webp"],
        title: "The Trees, Early Afternoon",
        subTitle: "William A. Harper",
        id: 1,
        description: {
          Medium: "Oil on Canvas",
          Measures: "H 50.8 cm × W 66 cm",
          Country: "USA",
          Year: "1905",
        },
      },
      {
        srcLow: ["/images/Standing_girl.webp"],
        srcHigh: ["/images/Standing_girl.webp"],
        title: "Standing Girl, Back View",
        subTitle: "Egon Schiele",
        id: 2,
        description: {
          Medium: "Gouache, watercolor, and graphite on paper",
          Measures: "H 31.4 cm x W 23.2 cm",
          Country: "Austria",
          Year: "1908",
        },
      },
      {
        srcLow: ["/images/Garden_of_the_painter_at_Saint_clair.webp"],
        srcHigh: ["/images/Garden_of_the_painter_at_Saint_clair.webp"],
        title: "Garden of the Painter at Saint Clair",
        subTitle: "Henri-Edmond Delacroix",
        id: 3,
        description: {
          Medium: "Watercolor over graphite",
          Measures: "H 17.1 cm x W 24.1 cm",
          Country: "France",
          Year: "1908",
        },
      },
      {
        srcLow: ["/images/Nude_female_figure_holding_left_foot.webp"],
        srcHigh: ["/images/Nude_female_figure_holding_left_foot.webp"],
        title: "Nude female figure holding left foot",
        subTitle: "Auguste Rodin",
        id: 4,
        description: {
          Medium: "Graphite and watercolor",
          Measures: "H 49.4 cm x W 31.9 cm",
          Country: "France",
          Year: "1900–1912",
        },
      },
      {
        srcLow: ["/images/Still_life_with_apples.webp"],
        srcHigh: ["/images/Still_life_with_apples.webp"],
        title: "Still Life with Apples and a Pot of Primroses",
        subTitle: "Paul Cézanne",
        id: 5,
        description: {
          Medium: "Oil on Canvas",
          Measures: "H 73 cm x W 92.4 cm",
          Country: "France",
          Year: "ca. 1890",
        },
      },
      {
        srcLow: ["/images/JUan_de_pareja.webp"],
        srcHigh: ["/images/JUan_de_pareja.webp"],
        title: "Juan de Pareja",
        subTitle: "Diego Rodríguez de Silva y Velázquez",
        id: 6,
        description: {
          Medium: "Oil on Canvas",
          Measures: "H 81,3 cm × W 69,9 cm",
          Country: "Spain",
          Year: "1650",
        },
      },
      {
        srcLow: ["/images/View_of_heidelberg.webp"],
        srcHigh: ["/images/View_of_heidelberg.webp"],
        title: "View of Heidelberg",
        subTitle: "Jan Brueghel the Elder",
        id: 7,
        description: {
          Medium: "Pen and Ink on Paper",
          Measures: "H 20.0 cm x W 30.5 cm",
          Country: "Belgium",
          Year: "ca. 1588–89",
        },
      },
      {
        srcLow: ["/images/The_Repast_of_the_Lion.webp"],
        srcHigh: ["/images/The_Repast_of_the_Lion.webp"],
        title: "The Repast of the Lion",
        subTitle: "Henri Rousseau",
        id: 8,
        description: {
          Medium: "Oil on Canvas",
          Measures: "H 113.7 cm x W 160 cm",
          Country: "France",
          Year: "ca. 1907",
        },
      },
    ];
    this.nItems = this.items.length;
  }

  getItem({ id }) {
    const item = this.items.find((item) => item.id === Number(id));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (item) resolve({ id, item });
        else reject("No item found (item)");
      }, this.loadTime);
    });
  }

  getItems({ startIndex, stopIndex, getNumberItems }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          items: this.items.slice(startIndex, stopIndex),
          numberItems: getNumberItems ? this.items.length : undefined,
        });
      }, this.loadTime);
    });
  }

  getRelatedItems({ id, startIndex, stopIndex, getNumberItems }) {
    console.log("related items call", startIndex, stopIndex, getNumberItems);
    const items = this.items.filter((item) => item.id !== id);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          items: items.slice(startIndex, stopIndex),
          numberItems: getNumberItems ? items.length : undefined,
        });
      }, this.loadTime);
    });
  }

  getArtists() {
    const artists = this.items.map((item) => item.subTitle);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          artists,
        });
      }, this.loadTime);
    });
  }
}

export default new Item();
