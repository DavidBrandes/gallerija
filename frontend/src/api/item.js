class Item {
  constructor() {
    this.loadTime = Number(process.env.REACT_APP_API_CALL_TIME);
    this.date = new Date();
    this.items = [
      {
        srcLow: [
          "/images/Maeda_Primavesi.webp",
          "/images/Maeda_Primavesi.webp",
        ],
        srcHigh: [
          "/images/Maeda_Primavesi.webp",
          "/images/Maeda_Primavesi.webp",
        ],
        title: "Mäda Primavesi",
        subTitle: "Gustav Klimt",
        id: 0,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "Germany",
        },
      },
      {
        srcLow: ["/images/The_trees.webp", "/images/The_trees.webp"],
        srcHigh: ["/images/The_trees.webp", "/images/The_trees.webp"],
        title: "The Trees, Early Afternoon",
        subTitle: "William A. Harper",
        id: 1,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "USA",
        },
      },
      {
        srcLow: [
          "/images/Standing_girl.webp",
          "/images/Standing_girl.webp",
          "/images/Standing_girl.webp",
        ],
        srcHigh: [
          "/images/Standing_girl.webp",
          "/images/Standing_girl.webp",
          "/images/Standing_girl.webp",
        ],
        title: "Standing Girl, Back View",
        subTitle: "Egon Schiele",
        id: 2,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "Austria",
        },
      },
      {
        srcLow: ["/images/Garden_of_the_painter_at_Saint_clair.webp"],
        srcHigh: ["/images/Garden_of_the_painter_at_Saint_clair.webp"],
        title: "Garden of the Painter at Saint Clair",
        subTitle: "Henri-Edmond Delacroix",
        id: 3,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "France",
        },
      },
      {
        srcLow: [
          "/images/Nude_female_figure_holding_left_foot.webp",
          "/images/Nude_female_figure_holding_left_foot.webp",
          "/images/Nude_female_figure_holding_left_foot.webp",
        ],
        srcHigh: [
          "/images/Nude_female_figure_holding_left_foot.webp",
          "/images/Nude_female_figure_holding_left_foot.webp",
          "/images/Nude_female_figure_holding_left_foot.webp",
        ],
        title: "Nude female figure holding left foot",
        subTitle: "Auguste Rodin",
        id: 4,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "France",
        },
      },
      {
        srcLow: [
          "/images/Still_life_with_apples.webp",
          "/images/Still_life_with_apples.webp",
        ],
        srcHigh: [
          "/images/Still_life_with_apples.webp",
          "/images/Still_life_with_apples.webp",
        ],
        title: "Still Life with Apples and a Pot of Primroses",
        subTitle: "Paul Cézanne",
        id: 5,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "France",
        },
      },
      {
        srcLow: ["/images/JUan_de_pareja.webp"],
        srcHigh: ["/images/JUan_de_pareja.webp"],
        title: "Juan de Pareja",
        subTitle: "Diego Rodríguez de Silva y Velázquez",
        id: 6,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "Netherlands",
        },
      },
      {
        srcLow: [
          "/images/View_of_heidelberg.webp",
          "/images/View_of_heidelberg.webp",
          "/images/View_of_heidelberg.webp",
        ],
        srcHigh: [
          "/images/View_of_heidelberg.webp",
          "/images/View_of_heidelberg.webp",
          "/images/View_of_heidelberg.webp",
        ],
        title: "View of Heidelberg",
        subTitle: "Jan Brueghel the Elder",
        id: 7,
        description: {
          Type: "Oil on Paper",
          Measures: "11.8 W x 9.8 H x 0.7 D in",
          Country: "Netherlands",
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

  getItems({ index, nItems, maxItems }) {
    const stopIndex = Math.min(index + nItems, maxItems);
    const hasMore = this.items.length > stopIndex;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ items: this.items.slice(index, stopIndex), hasMore });
      }, this.loadTime);
    });
  }

  getRelatedItems({ id, maxItems, index, nItems }) {
    const items = this.items.filter((item) => item.id !== id);

    const stopIndex = Math.min(index + nItems, maxItems);
    const hasMore = Math.min(maxItems, items.length) > stopIndex;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ items: items.slice(index, stopIndex), hasMore });
      }, this.loadTime);
    });
  }
}

export default new Item();
