'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        this.assign({
            nameinfo:'你好请输入姓名',
            text:"",
            Qmark:'',
            Qtext:''
        });
        return this.display();
    }

    async loginAction(){
        let self = this;
        let name = this.post('name');
        let password = this.post('pwd');
        let model = this.model('think_user');
        let data = await model.where({name:name,pwd:password}).select();
        console.log('数据库中的同样数据的条数: '+data.length,'用户名: '+name,'密码: '+password);
        if(think.isEmpty(data)){
            console.log('数据库有没有此数据: '+'0');
            if(name==""&&password==""){
                this.assign({
                    nameinfo:'用户名密码不能为空',
                    text:"",
                    Qmark:'',
                    Qtext:''
                });
                return this.display('index')
            }else if(name==''){
                this.assign({
                    nameinfo:'用户名不能为空',
                    text:"",
                    Qmark:'请输入用户名',
                    Qtext:''
                });
                return this.display('index')
            }else if(password==""){
                this.assign({
                    nameinfo:'密码不能为空',
                    text:"",
                    Qmark:'',
                    Qtext:'请输入密码'
                });
                return this.display('index')
            }else{
                this.assign({
                    nameinfo:'对不起,数据库中并没有你的数据',
                    text:"请再次验证",
                    Qmark:'',
                    Qtext:''
                });
                //console.log('返回错误信息为: '+this.fail);
                //return this.display('index')
                return this.fail(12,'cuowu');
            }

        }else{
            console.log('pass');
            this.assign('nameID',name);
            console.log(name);
            return self.display('act');
        }

    }

    async signformAction(){
        let name = this.post('name_sign');
        let password = this.post('pwd_sign');
        let model = this.model('think_user');
        let insertId = await model.add({name:name,pwd:password});
        this.assign({
           name:name,
            password:password
        });
        console.log('success');
        await this.session('getnames',name);
        return this.redirect('index_sign');
    }

    async indexSignAction(){
        let getname = await this.session('getnames');
        this.assign({
            nameinfo:'恭喜, '+getname+' 注册成功',
            text:'请用您的用户名密码登录',
            Qmark:'',
            Qtext:''
        });
        return this.display('index')
    }

    signAction(){
        return this.display()
    }

    actAction(){
        return this.display('')
    }
}