class ApiFeatures {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
  }

  search() {
    const keyword = this.queryParams.keyword
      ? {
          name: {
            $regex: this.queryParams.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryParams };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit", "sortBy"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryParams = JSON.stringify(queryCopy);
    queryParams = queryParams.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryParams));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryParams.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }

  sort() {
    switch (this.queryParams.sortBy) {
      case "priceLowToHigh":
        this.query = this.query.sort({
          price: 1,
        });
        break;
      case "priceHighToLow":
        this.query = this.query.sort({
          price: -1,
        });
        break;

      case "popularity":
        this.query = this.query.sort({
          rating: -1,
        });
        break;
    }
    return this;
  }
}

module.exports = ApiFeatures;
