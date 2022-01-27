export default class APIfeatures {
    constructor(data, query) {
        this.data = data;
        this.query = query;
    }

    filtering() {
        const queryObject = {...this.query};
        const excludedFields = ["page", "sort", "limit"];
        excludedFields.forEach(element => delete(queryObject[element]));       
        let queryString = JSON.stringify(queryObject);
        // gte - больше или равно; lte - меньше или равно; lt - меньше, чем; gt - больше, чем
        queryString = queryString.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => "$" + match);
        this.data = this.data.find(JSON.parse(queryString));
        return this;
    }

    sorting() {
        if (this.query.sort) {
            const sortBy = this.query.sort.split(",").join(" ");
            this.data = this.data.sort(sortBy);
        }
        return this;
    }

    paginating() {
        const page = this.query.page;
        const limit = this.query.limit;
        const skip = (page - 1) * limit;
        this.data = this.data.skip(skip).limit(limit);
        return this;
    }
}