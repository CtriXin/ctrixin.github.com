'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    phoneAction() {

        return this.display();

    }

    async webAction() {
        let model = this.model("user_data");
        let data = await model.limit(2).select();
        console.log(data);
        return this.display();
    }
}