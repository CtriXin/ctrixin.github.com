'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */

    async indexAction() {
        //auto render template file userdetail_index.html
        let model = this.model('user_data');
        let insertID = await model.addMany([
            {username: 'abc', passwd: '1234', email: 'admin@tataufo.com'}, {
                username: 'abcd',
                passwd: '1234',
                email: 'admin@tataufo.com'
            }, {username: 'abcde', passwd: '1234', email: 'admin@tataufo.com'}
        ]);
        return this.display();
    }

    logicAction(){
        return this.display();
        console.log('dd');
    }
}