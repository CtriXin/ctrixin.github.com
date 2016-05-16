'use strict';

import Base from './base.js';

let qiniu = require("qiniu");
let qiniuconfig = think.config('key', undefined, 'home');
qiniu.conf.ACCESS_KEY = qiniuconfig.Access_Key;
qiniu.conf.SECRET_KEY = qiniuconfig.Secret_Key;
let fs = require('fs');
let request = require('request');


//实例化数据库,qingyun_data调取用户数据,qingyun_oam调用oam数据
let qingyun_data = gettatadb('qingyun_account');
let qingyun_oam = gettatadb('qingyun_oam');


//时间函数
let nowunix = Math.round(new Date().getTime() / 1000);//获取当前时间时间戳
let nowunix1000 = Math.round(new Date().getTime());//获取当前时间时间戳

/*
 * MEMO:
 * 1. npm install (qiniu & request)
 */





export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */

    async indexAction() {
        //auto render template file index_index.html
        this.assign({
            action: 'index'
        });
        return this.display();
    }




    analysisAction(){
        this.assign({
            action: 'analysis'
        });
        return this.display();
    }
    async seniorAction(){
        this.assign({
            action: 'senior'
        })
        return this.display();
    }











    /*
     * 登录
     * 1. login
     * 2. logincheck -- 校验用户数据
     */
    async loginAction(){
        await this.session();
        return this.display();
    }
    //登录验证
    async logincheckAction(){
        console.log('haha');

        if(this.isGet()){
            return this.display();
        }
        //这里可以通过post方法获取所有的数据，数据已经在logic里做了校验
        let data = this.post();
        let md5 = think.md5(data.password);
        console.log(data);
        console.log(md5,data.phonenumber);
        //用户名和加密后的密码去匹配数据库中对于
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let result = await promotion_agent.where({agent_phone: data.phonenumber, password: md5}).find();
        //如果未匹配到任何数据，表示用户名或者密码错误
        if(think.isEmpty(result)){
            await this.session("login_state", 'fail');
            return this.json({code:'fail'})
        }else if(result.frozen == 1){
            return this.json({code:'frozen'})
        }
        //获取到用户信息后，将用户信息写入session
        await this.session("userInfo", result);

        return this.json({code:'success'})

    }


    /*
     * 添加用户
     * 1. addagent
     * 2. insertagent -- 插入用户数据到数据库,用手机查用户id,用用户id获取信息,获取university_id, 用uid查学校并插库
     */
    //添加人员
    async addagentAction(){
        this.assign({
            action: 'addagent'
        })
        return this.display();
    }
    //插入agent信息
    async insertagentAction(self){
        if(this.isGet()){
            return this.display();
        }
        //这里可以通过post方法获取所有的数据
        let data = this.post();
        let md5 = think.md5(data.password);
        console.log('提交的数据为:',JSON.stringify(data));
        //用户名和加密后的密码添加进数据库
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let user_account = this.model('user_account',qingyun_data);  //实例化用户的表
        let user_info = this.model('user_info',qingyun_data);  //实例化用户的表
        let university = this.model('university',qingyun_data);  //实例化用户的表
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_university = this.model('promotion_university',qingyun_oam);  //实例化用户的表

        let verifyagent = await user_account.where({telephone: data.phonenumber,verify_status: '1'}).find(); //查询数据库,查出手机号和审核状态符合的
        console.log(verifyagent);
        if(!think.isEmpty(verifyagent)){
            let agentuserid = verifyagent.userid;  //获取agent的userid
            let agent_info =  await user_info.where({userid: agentuserid}).find();
            let agentuniversity_id = agent_info.university_id; //获取university_id
            let agentuniversity_info = await university.where({university_id: agentuniversity_id}).find(); //获取此userid对应的unversity_id,找到uid对应的数据
            let agentuniversity_promotion_info = await promotion_university.where({university_name: agentuniversity_info.university_name,class:agentuniversity_info.class}).find(); //获取此userid对应的unversity_id,找到uid对应的数据
            let insertId = await promotion_agent.add({
                userid:agentuserid,
                agent_phone: data.phonenumber,
                name:agent_info.realname,
                password: md5,
                university: agentuniversity_info.university_name,
                area:  agentuniversity_info.university_name,
                addtime: nowunix
            });
            console.log(agentuniversity_promotion_info);
            let insertUID = await promotion_university_rel.add({
                userid:agentuserid,
                agent_id: insertId,
                university_id: agentuniversity_promotion_info.university_id,
                province: agentuniversity_info.province,
                city: agentuniversity_info.city
            });

            return this.redirect('/index/agentlist');

        }else{
            return this.fail("此用户审核未通过,请自行返回");
        }

    }










    //获取省列表,将会渲染城市和学校
    async getcityschoolAction(){
        let province = this.post('province');
        let university_data = this.model('promotion_city',qingyun_oam);  //实例化用户的表
        let province_selected = await university_data.where({province: province}).select();

        let university_data_account = this.model('promotion_university',qingyun_oam);  //实例化用户的表
        let province_selected_account = await university_data_account.where({province: province}).select();
        let city_Arr = [];
        for( var i in province_selected){
            let city_name = province_selected[i].city;
            let tagindex = city_Arr.indexOf(city_name);
            if(tagindex == -1){
                city_Arr.push(city_name)
            }
        }
        //console.log(city_Arr); //['城市1','城市2','城市3'...]
        //let school_Arr = [];
        //for( var i in province_selected_account){
        //    let school_name = province_selected_account[i].university_name;
        //    let tagindex = school_Arr.indexOf(school_name);
        //    if(tagindex == -1){
        //        school_Arr.push(school_name)
        //    }
        //}
        //console.log(school_Arr); //['学校1','学校2','学校3'...]
        //console.log(school_Arr); //['学校1','学校2','学校3'...]
        console.log(province_selected_account)
        let data ={};
        data.city = city_Arr.toString();
        data.school = province_selected_account;
        data.code = 'success';
        return this.json(data)
    }
    //通过省列表获取城市列表,通过城市选择获取学校
    async getschoolAction(){
        let province = this.post('province');
        let city = this.post('city');
        let university_data = this.model('promotion_university',qingyun_oam);  //实例化用户的表
        let city_selected = await university_data.where({province: province,city: city}).select();
        if(city == '-1'){
            city_selected = await university_data.where({province: province}).select();
        }
        console.log(city_selected)
        //console.log(school_Arr); //['学校1','学校2','学校3'...]
        let data ={};
        data.school = city_selected;
        data.code = 'success';
        return this.json(data)
    }



    /*
     * 用户管理
     * 1. agentlist
     * 2. searchagent -- 搜索用户,按级别和关键词搜索
     * 3. changeagentinfo -- 修改用户信息
     * 4. insertagentinfo -- 插库
     * 5. frozenagent -- 冻结用户
     * 6. authority -- 用户权限
     */
    //用户管理
    async agentlistAction(){

        //获取登录session,判断用户权限
        let userInfo = await this.session("userInfo");
        let agent_level = '初级经理';
        if(userInfo.level == 1){
            agent_level = '高级经理';
        }else if(userInfo.level == 2){
            agent_level = '省主管';
        }else if(userInfo.level == 3){
            agent_level = '管理员';
        }

        if(userInfo.level == 0 || userInfo.level == 1){
            return this.redirect('/index/data'); //如果是初级或者高级经理 跳转数据界面
        }
        //获取cookie 搜索的内容
        let level_search = this.cookie('search_agent_level');
        let search_info = this.cookie('search_agent_info');

        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let data ='';


        //如果级别搜索,搜索框为空 || 输入框为空,级别搜索为全部
        if(think.isEmpty(level_search) && think.isEmpty(search_info) || level_search == -1 && think.isEmpty(search_info)){
            if(userInfo.level == 2) {
                data = await promotion_agent.where({
                    level: {'<': userInfo.level},
                    frozen: 0
                }).order("level DESC").page(this.get("page"), 100).countSelect();
            }else{
                data = await promotion_agent.where({level:{'<=':userInfo.level},frozen:0}).order("level DESC").page(this.get("page"), 100).countSelect();
            }
        }
        //如果级别搜索已选 && 不为全部级别
        else if(!think.isEmpty(level_search) && level_search != -1 ){
            data = await promotion_agent.where({level:level_search,frozen:0}).order("level DESC").page(this.get("page"), 100).countSelect();
        }
        //如果搜索框不为空
        else if(!think.isEmpty(search_info)){
            data = await promotion_agent.where({agent_phone:search_info,level:{'<':userInfo.level},frozen:0}).order("level DESC").page(this.get("page"), 100).countSelect();
        }


        this.assign({
            action:'agentlist',
            page_data : data,
            data : data.data
        });
        //console.log(data.data)

        //删除cookie,以便下次删除
        this.cookie("search_agent_level", null); //删除名为 search_agent_level 的 cookie
        this.cookie("search_agent_info", null); //删除名为 search_agent_info 的 cookie
        return this.display();
    }
    //用户管理页面搜索agent
    async searchagentAction(){
        let data = this.post();
        let search_agent_level = data.level;
        let search_agent_info = data.search_info;
        this.cookie('search_agent_level',search_agent_level);
        this.cookie('search_agent_info',search_agent_info);
        return this.redirect('/index/agentlist')
    }
    //修改用户信息,密码和支付宝...
    async changeagentinfoAction(){
        let userid = this.get('userid');
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let userdata = await promotion_agent.where({id:userid}).find();
        console.log(userdata);
        this.assign({
           userdata: userdata
        });
        return this.display();
    }
    //获取agent修改的信息 上传数据库
    async insertagentinfoAction(){
        let data = this.post();
        console.log(data);
        let userid = this.get('userid');
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        if(think.isEmpty(data.password)){
            let affectedRows = await promotion_agent.where({id:userid}).update({alipay: data.alipay,address:data.address});
        }else{
            let md5 = think.md5(data.password);
            let affectedRows = await promotion_agent.where({id:userid}).update({alipay: data.alipay,password:md5,address:data.address});
        }
        return this.redirect('/index/agentlist')
    }
    //冻结用户
    async frozenagentAction(){
        let agentid = this.post('agentid');
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let affectedRows = await promotion_agent.where({id: agentid}).update({frozen: 1});
        return this.json({
            code: 1
        })
    }
    //用户权限
    async agentauthorityAction(){
        let agent_id = this.get('agent_id');
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let userdata = await promotion_agent.where({id:agent_id}).find();

        let university_data = this.model('university',qingyun_data);  //实例化用户的表
        let country = await university_data.where("country = '中国' OR country = '香港'").select();
        let province_Arr = [];  //获取所有省份列表
        for( var i in country){
            let province = country[i].province;
            let tagindex = province_Arr.indexOf(province);
            if(tagindex == -1){
                province_Arr.push(province)
            }
        }


        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表



        let area_from = '';
        let area_name = [];
        if(userdata.level >1 ){
            //area_name = await promotion_university_rel.query(
            //    "select pu.province from promotion_province_rel as purel left join promotion_university as pu on purel.province=pu.province where purel.agent_id in ("+agent_id+") group by pu.province"   //批量查询
            //);
            area_name = await promotion_province_rel.where({agent_id: agent_id}).select();
            area_from = 'province'
        }else{
            area_name = await promotion_university_rel.query(
                "select pu.university_name from promotion_university_rel as purel left join promotion_university as pu on purel.university_id=pu.university_id where purel.agent_id in ("+agent_id+") group by pu.university_name"   //批量查询
            );
            area_from = 'university'

        }

        console.log(area_name);

        let area = userdata.area;
        let agent_original_area = area.split(',');
        console.log(agent_original_area);
        console.log(userdata);
        this.assign({
            action:'agentauthority',
            userdata: userdata,
            province: province_Arr.toString(),
            area : area_name,
            area_from: area_from
        });
        return this.display();
    }

    //更新数据库中的agent info
    async agentcitylistAction(){
        let level  = this.post('level');
        console.log(level);


        let agent_id = this.get('agent_id');

        let data_school = this.post('school_check').toString();
        let data_city = this.post('city_check').toString();
        let data_province = this.post('province_check').toString();  //强转string
        data_province = data_province.split(',');
        data_city = data_city.split(',');
        data_school = data_school.split(','); //拆分,组成数组
        console.log('这个是选择的学校:',JSON.stringify(data_school));
        console.log('这个是选择的省份:',JSON.stringify(data_province));
        console.log('这个是选择的城市:',JSON.stringify(data_city));



        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表
        let promotion_university = this.model('promotion_university',qingyun_oam);  //实例化用户的表

        let userdata = await promotion_agent.where({id:agent_id}).find();
        let agent_area_list = [];
        let agent_object = '';

        let agent_level_earlier = userdata.level;
        console.log('原来的level',agent_level_earlier);

        if(agent_level_earlier > level && agent_level_earlier > 1){ //原来的级别比现在高,且大于高级经理,相当于降级（把省数据删除）
            let reg_error = await promotion_province_rel.query(
                "delete from  promotion_province_rel where agent_id  in ("+agent_id+")  "
            );  //批量删除

        }else if(level>1 && level>agent_level_earlier){ //现在级别比以前高,且现在级别大于高级经理,相当于升级到省主管
            let reg_error = await promotion_university_rel.query(
                "delete from  promotion_university_rel where agent_id  in ("+agent_id+")  "
            );  //批量删除
        }

        if(level > 1){ //>1为省主管,管理员
            console.log('省');
            let agent_area_earlier = await promotion_province_rel.where({agent_id:agent_id}).select();
            if(!think.isEmpty(agent_area_list)){
                console.log('非空')
                for(var j in agent_area_earlier){
                    agent_area_list.push(agent_area_earlier[j].university_id)
                }
                agent_object = agent_area_list.toString().split(',');
                console.log('这个是agent以前管辖区域列表(省):',JSON.stringify(agent_object));
                for(var i in data_province){
                    let tagindex = agent_object.indexOf(data_province[i]);
                    console.log(tagindex);
                    if(tagindex == -1){
                        agent_object.push(data_province[i]); //将前端选择的学校添加到数组
                        let data = await promotion_university.where({province: data_province[i]}).find();
                        let insertId = await promotion_province_rel.add({userid:userdata.userid,agent_id:agent_id,province:data.province});
                    }
                }
                console.log('这个是最终更新的管辖区域:',JSON.stringify(agent_object));
            }else{
                console.log('以前area空');
                agent_object = [];
                for(var i in data_province){
                    agent_object.push(data_province[i]); //将前端选择的学校添加到数组
                    let data = await promotion_university.where({province: data_province[i]}).find();
                    let insertId = await promotion_province_rel.add({userid:userdata.userid,agent_id:agent_id,province:data.province});
                }
                console.log('这个是最终更新的管辖区域:',JSON.stringify(agent_object));
            }


        }else{
            console.log('学校');
            let agent_area_earlier = await promotion_university_rel.where({agent_id:agent_id}).select();
            if(!think.isEmpty(agent_area_list)){
                console.log('以前area非空')
                for(var j in agent_area_earlier){
                    agent_area_list.push(agent_area_earlier[j].university_id)
                }
                agent_object = agent_area_list.toString().split(',');
                console.log('这个是agent以前管辖区域列表(学校):',JSON.stringify(agent_object));
                for(var i in data_school){
                    let tagindex = agent_object.indexOf(data_school[i]);
                    console.log(tagindex);
                    if(tagindex == -1){
                        agent_object.push(data_school[i]); //将前端选择的学校添加到数组
                        let data = await promotion_university.where({university_id: data_school[i]}).find();
                        let insertId = await promotion_university_rel.add({userid:userdata.userid,agent_id:agent_id,university_id:data_school[i],province:data.province,city:data.city});
                    }
                }
                console.log('这个是最终更新的管辖区域:',JSON.stringify(agent_object));
            }else{
                console.log('以前area空');
                agent_object = [];
                for(var i in data_school){
                    agent_object.push(data_school[i]); //将前端选择的学校添加到数组
                    let data = await promotion_university.where({university_id: data_school[i]}).find();
                    let insertId = await promotion_university_rel.add({userid:userdata.userid,agent_id:agent_id,university_id:data_school[i],province:data.province,city:data.city});
                }
                console.log('这个是最终更新的管辖区域:',JSON.stringify(agent_object));

            }

        }


        let affectedRows = await promotion_agent.where({id:agent_id}).update({area:agent_object.toString(),level:level});  //更新
        return this.redirect('/index/agentauthority?agent_id='+agent_id)
    }










    //城市管理
    async cityAction(){
        let userid = this.get('userid');
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let userdata = await promotion_agent.where({id:userid}).find();

        let university_data = this.model('promotion_city',qingyun_oam);  //实例化用户的表
        let country = await university_data.select();
        //console.log(country);
        let province_Arr = [];
        for( var i in country){
            let province = country[i].province;
            let tagindex = province_Arr.indexOf(province);
            if(tagindex == -1){
                province_Arr.push(province)
            }
        }

        //console.log(userdata);
        this.assign({
            action: 'city',
            userdata: userdata,
            province: province_Arr.toString(),
        });
        return this.display();
    }
    async citypriceAction(){
        let province = this.post('province');
        let university_data = this.model('promotion_city',qingyun_oam);  //实例化用户的表
        let province_selected = await university_data.where({province: province}).select();
        console.log(province_selected)
        let city_Arr = [];
        for( var i in province_selected){
            let city_name = province_selected[i].city;
            let tagindex = city_Arr.indexOf(city_name);
            if(tagindex == -1){
                city_Arr.push(city_name)
            }
        }
        //console.log(city_Arr); //['城市1','城市2','城市3'...]
        let data ={};
        data.city = city_Arr;
        data.code = 'success';
        data.info = province_selected;

        return this.json(data)

    }
    async updatacitypriceAction(){
        let updata_price = this.post('price');
        let updata_city = this.post('city');
        console.log(updata_city,updata_price,'zheli');
        let province_city_table = this.model('promotion_city',qingyun_oam);  //实例化用户的表
        //let city_selected = await province_city_table.where({city: updata_city}).find();
        let affectedRows = await province_city_table.where({city: updata_city}).update({price: updata_price});
        let updateRow = await province_city_table.query(
            "update promotion_university set price = "+updata_price+" where city = '"+updata_city+"'"
        );
        let data = {};
        data.code = 'success';
        return this.json(data)

    }
    async updatacitystateAction(){
        let updata_state = this.post('state');
        let updata_city = this.post('city');
        console.log(updata_city,updata_state);
        let province_city_table = this.model('promotion_city',qingyun_oam);  //实例化用户的表
        let affectedRows = await province_city_table.where({city: updata_city}).update({state: updata_state});
        let updateRow = await province_city_table.query(
            "update promotion_university set state = "+updata_state+" where city = '"+updata_city+"'"
        );
        let data = {};
        data.code = 'success';
        data.state = updata_state;
        return this.json(data)

    }


    //学校管理
    async schoolAction(){
        let userid = this.get('userid');
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化地推用户的表
        let userdata = await promotion_agent.where({id:userid}).find();

        let university_data = this.model('promotion_city',qingyun_oam);  //实例化用户的表
        let country = await university_data.select();
        //console.log(country);
        let province_Arr = [];
        for( var i in country){
            let province = country[i].province;
            let tagindex = province_Arr.indexOf(province);
            if(tagindex == -1){
                province_Arr.push(province)
            }
        }

        //console.log(userdata);
        this.assign({
            action:'school',
            userdata: userdata,
            province: province_Arr.toString(),
        });
        return this.display();
    }
    async updatauniversitypriceAction(){
        let updata_price = this.post('price');
        let updata_university = this.post('university');
        console.log(updata_university,updata_price);
        let province_university_table = this.model('promotion_university',qingyun_oam);  //实例化用户的表
        //let city_selected = await province_city_table.where({city: updata_city}).find();
        let affectedRows = await province_university_table.where({university_name: updata_university}).update({price: updata_price});

        let data = {};
        data.code = 'success';
        return this.json(data)
    }
    async updatauniversitystateAction(){
        let updata_state = this.post('state');
        let updata_university = this.post('university');
        console.log(updata_university,updata_state);
        let province_university_table = this.model('promotion_university',qingyun_oam);  //实例化用户的表
        let affectedRows = await province_university_table.where({university_name: updata_university}).update({state: updata_state});
        let data = {};
        data.code = 'success';
        data.state = updata_state;
        return this.json(data)

    }
















    //数据校对
    async importAction(){
        let import_data = this.post('import_data'); //获取录入的excel
        let promotion_insert = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表

        let jsondata = JSON.parse(import_data); //转json格式
        let import_val = []; //将是插入到数据库中的值
        let unix = Math.round(new Date().getTime() / 1000);//获取当前时间时间戳
        console.log(unix);
        let userInfo = await this.session("userInfo"); //session中获取agent信息
        let agent_level = userInfo.level;
        let agent_id = userInfo.id;
        for(var i in jsondata){
            let insert_type = {};
            let phone_number = jsondata[i].phone; //后面的phone为自定义的单词名（excel）
            insert_type.phone_number = phone_number;
            insert_type.addtime = unix;
            insert_type.agent_id = agent_id;
            import_val.push(insert_type)
        }
        //console.log('这个是上传的号+时间:',JSON.stringify(import_val));
        let insertId = await promotion_insert.addMany(import_val);
        let val = [];
        for(var n in import_val){
            val.push(import_val[n].phone_number)
        }
        console.log('这个是上传的号:',JSON.stringify(val));

        //this.cookie("upload_phone_number", val); //将 cookie upload_phone_number 值设置为 val
        //this.cookie("addtime", unix); //将 设置时间戳cookie

        /*
         执行第一条SQL,监测自己数据库中的重复部分
         */
        let data = await promotion_insert.query(
            "select phone_number,error_code,count(phone_number) as total_data , agent_id from promotion_insert where phone_number in " +
            "("+val.toString()+") group by phone_number"   //批量查询
        );
        console.log('自己的表重复数据:',JSON.stringify(data));
        let repeat_phone = [];
        for( var i in data ){
            let repeat_num = data[i].total_data;
            let agent_id_insert = data[i].agent_id;
            if(repeat_num>1 && agent_id == agent_id_insert && data[i].error_code != 0){
                console.log('第二次尝试')
            }else if(repeat_num>2 ){
                repeat_phone.push(data[i].phone_number)
            }
        }

        //console.log(repeat_phone)
        console.log('重复的数据:',JSON.stringify(repeat_phone),typeof (repeat_phone));



        console.log(repeat_phone.length,data.length)


        /*
         去掉重复部分,重新拼成新的数组,进行第二次校对
         */

        if(repeat_phone.length == data.length){
            console.log('oooooooooooo')

            let updata_repeat = await promotion_insert.query(
                "update promotion_insert set error_code=1, state =1 where phone_number in("+repeat_phone.toString()+") and addtime = "+unix+" "
            );  //批量修改,时间一样,号码一样的 error_code 改为 1
        }else{
            console.log('nnnnnnnnnnnnn')






            if(repeat_phone.length < data.length && repeat_phone.length != 0){
                console.log('yyyyyyyyyyyyyy');
                let updata_repeat = await promotion_insert.query(
                    "update promotion_insert set error_code=1, state =1 where phone_number in("+repeat_phone.toString()+") and addtime = "+unix+" "
                );  //批量修改,时间一样,号码一样的 error_code 改为 1
            }


            let arr_diff = new Array();
            for(var i=0; i < val.length; i++){
                var flag = true;
                for(var j=0; j < repeat_phone.length; j++){
                    if(val[i] == repeat_phone[j])
                        flag = false;
                }
                if(flag)
                    arr_diff.push(val[i]);
            }
            console.log('剩余的不重复数据',arr_diff);

            let agent_area = []; //接收univer名字
            let university_id = [];  //接收uid
            if(userInfo.level == 0 || userInfo.level == 1){
                let agent_university = await promotion_university_rel.where({agent_id:agent_id}).select();
                for(var o in agent_university){
                    university_id.push(agent_university[o].university_id)
                }
                console.log('学校id',university_id);  //获取学校id
            }



            if(!think.isEmpty(arr_diff)){

                /*
                 第二次校对
                 */
                console.log(arr_diff);
                let sql_check = this.model('user_account',qingyun_data);  //实例化用户的表
                let starttime = 1462032000; // TODO 改为上线时间!!!!!



                if(agent_level == 2){ //省

                }else if(agent_level < 2){ //学校

                }



                let data_autho_second = await sql_check.query(
                    "select ua.telephone as phone_number,ua.verify_status,ua.regtime,ui.avatarurl,ui.university_id,re.open_udid " +
                    "from user_account as ua " +
                    "left join user_info as ui on ua.userid=ui.userid " +
                    "left join register_equipment as re on ua.userid=re.userid " +
                    "where ua.telephone in ("+arr_diff.toString()+")"
                );
                console.log(data_autho_second,'heire');
                if(think.isEmpty(data_autho_second)){
                    console.log('afdsafdsafadsfdsafdas');
                    let reg_error = await promotion_insert.query(
                        "update promotion_insert set error_code=5 , state=1  where phone_number in("+arr_diff.toString()+") and addtime = "+unix+" "
                    );  //批量修改 未注册
                }else{
                    let verify_error = [];
                    let avartar_error = [];
                    let time_error = [];
                    let university_error = [];
                    for(var i in data_autho_second){
                        let num = data_autho_second[i].phone_number;
                        let university_id_insert = data_autho_second[i].university_id;
                        let uid_from_agent = university_id.indexOf(university_id_insert);
                        if(data_autho_second[i].avatarurl != 'o_1ai2bb62p1vquhc61bnre4a81a9.jpg'){
                            avartar_error.push(num);
                        }else if(data_autho_second[i].regtime < starttime){
                            time_error.push(num);
                        }else if(uid_from_agent == -1){
                            university_error.push(num);
                        }else if(data_autho_second[i].verify_status != 1){
                            verify_error.push(num);
                        }

                    }


                    console.log('头像不通过',avartar_error);
                    if(!think.isEmpty(avartar_error)){
                        let avartar_code = await promotion_insert.query(
                            "update promotion_insert set error_code=3 , state=1  where phone_number in("+avartar_error.toString()+") and addtime = "+unix+" "
                        );  //批量修改
                    }

                    console.log('时间不通过',time_error);
                    if(!think.isEmpty(time_error)){
                        let time_code = await promotion_insert.query(
                            "update promotion_insert set error_code=4 , state=1  where phone_number in("+time_error.toString()+") and addtime = "+unix+" "
                        );  //批量修改
                    }

                    console.log('学校不通过',university_error);
                    if(!think.isEmpty(university_error)){
                        let university_error_code = await promotion_insert.query(
                            "update promotion_insert set error_code=6 , state=1  where phone_number in("+university_error.toString()+") and addtime = "+unix+" "
                        );  //批量修改
                    }

                    console.log('审核不通过',verify_error);
                    if(!think.isEmpty(verify_error)){
                        let verify_code = await promotion_insert.query(
                            "update promotion_insert set error_code=2  where phone_number in("+verify_error.toString()+") and addtime = "+unix+" "
                        );  //批量修改
                    }


                }


            }

        }






        console.log('上传完成');
        let final_data = await promotion_insert.where({addtime: unix}).select();
        console.log(final_data);
        return this.json(final_data)



    }
    //单个手机号校对
    async numberauthoriyAction(){
        let import_data = this.post('import_data'); //获取录入的excel
        console.log(import_data,typeof (import_data));
        let promotion_insert = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表

        let jsondata = JSON.parse(import_data); //转json格式
        console.log(jsondata,typeof (jsondata));
        let unix = Math.round(new Date().getTime() / 1000);//获取当前时间时间戳
        console.log(unix);
        let userInfo = await this.session("userInfo"); //session中获取agent信息
        let agent_id = userInfo.id;
        let agent_level = userInfo.level;
        let insertId = await promotion_insert.add({phone_number:import_data,error_code:0,agent_id:agent_id,addtime:unix});
        let val = import_data;

        console.log('这个是上传的号:',JSON.stringify(jsondata));

        //this.cookie("upload_phone_number", val); //将 cookie upload_phone_number 值设置为 val
        //this.cookie("addtime", unix); //将 设置时间戳cookie

        /*
         执行第一条SQL,监测自己数据库中的重复部分
         */
        let data = await promotion_insert.query(
            "select phone_number,error_code, count(phone_number) as total_data , agent_id from promotion_insert where phone_number in " +
            "("+val.toString()+") group by phone_number"   //批量查询
        );
        console.log('自己的表重复数据:',JSON.stringify(data));
        let repeat_phone = [];
        for( var i in data ){
            let repeat_num = data[i].total_data;
            let agent_id_insert = data[i].agent_id;
            if(repeat_num>1 && agent_id == agent_id_insert){
                console.log('第二次尝试')
            }else if(repeat_num>2){
                repeat_phone.push(data[i].phone_number)

            }
        }
        //console.log(repeat_phone)
        console.log('重复的数据:',JSON.stringify(repeat_phone),typeof (repeat_phone));
        /*
         去掉重复部分,重新拼成新的数组,进行第二次校对
         */

        if(repeat_phone.length == data.length){
            console.log('oooooooooooo')

            let updata_repeat = await promotion_insert.query(
                "update promotion_insert set error_code=1 , state=1  where phone_number in('"+repeat_phone.toString()+"') and addtime = "+unix+" "
            );  //批量修改,时间一样,号码一样的 error_code 改为 1 //批量修改,时间一样,号码一样的 error_code 改为 1
        }else{
            console.log('nnnnnnnnnnnnn')






            if(repeat_phone.length < data.length && repeat_phone.length != 0){
                console.log('yyyyyyyyyyyyyy');
                let updata_repeat = await promotion_insert.query(
                    "update promotion_insert set error_code=1 , state=1  where phone_number in('"+repeat_phone.toString()+"') and addtime = "+unix+" "
                );  //批量修改,时间一样,号码一样的 error_code 改为 1
            }



            let arr_diff = val;
            let agent_area = []; //接收univer名字
            let university_id = [];  //接收uid
            if(userInfo.level == 0 || userInfo.level == 1){

                let agent_university = await promotion_university_rel.where({agent_id:agent_id}).select();
                for(var o in agent_university){
                    university_id.push(agent_university[o].university_id)
                }
                console.log('学校id',university_id);  //获取学校id
            }



            if(!think.isEmpty(arr_diff)){

                /*
                 第二次校对
                 */
                console.log(arr_diff);
                let sql_check = this.model('user_account',qingyun_data);  //实例化用户的表
                let starttime = 1462872838; // TODO 改为上线时间!!!!!
                let data_autho_second = await sql_check.query(
                    "select ua.telephone as phone_number,ua.verify_status,ua.regtime,ui.avatarurl,ui.university_id,re.open_udid from user_account as ua left join user_info as ui on ua.userid=ui.userid left join register_equipment as re on ua.userid=re.userid where ua.telephone in ("+arr_diff.toString()+") "
                );
                console.log(data_autho_second);
                if(think.isEmpty(data_autho_second)){
                    let reg_error = await promotion_insert.query(
                        "update promotion_insert set error_code=5 , state=1 where phone_number in('"+arr_diff+"') and addtime = "+unix+" "
                    );  //批量修改 未注册
                }else{
                    let verify_error = [];
                    let avartar_error = [];
                    let time_error = [];
                    let university_error = [];
                    for(var i in data_autho_second){
                        let num = data_autho_second[i].phone_number;
                        let university_id_insert = data_autho_second[i].university_id;
                        let uid_from_agent = university_id.indexOf(university_id_insert);
                        if(data_autho_second[i].verify_status != 1){
                            verify_error.push(num);
                        }else if(data_autho_second[i].avatarurl != 'o_1ai2bb62p1vquhc61bnre4a81a9.jpg'){
                            avartar_error.push(num);
                        }else if(data_autho_second[i].regtime < starttime){
                            time_error.push(num);
                        }else if(uid_from_agent == -1){
                            university_error.push(num);
                        }

                    }
                    console.log('审核不通过',verify_error);
                    if(!think.isEmpty(verify_error)){
                        let verify_code = await promotion_insert.query(
                            "update promotion_insert set error_code=2 where phone_number in('"+verify_error.toString()+"') and addtime = "+unix+" "
                        );  //批量修改
                    }

                    console.log('头像不通过',avartar_error);
                    if(!think.isEmpty(avartar_error)){
                        let avartar_code = await promotion_insert.query(
                            "update promotion_insert set error_code=3 , state=1  where phone_number in("+avartar_error.toString()+") and addtime = "+unix+" "
                        );  //批量修改
                    }

                    console.log('时间不通过',time_error);
                    if(!think.isEmpty(time_error)){
                        let time_code = await promotion_insert.query(
                            "update promotion_insert set error_code=4 , state=1  where phone_number in("+time_error.toString()+") and addtime = "+unix+" "
                        );  //批量修改
                    }

                    console.log('学校不通过',university_error);
                    if(!think.isEmpty(university_error)){
                        let university_error_code = await promotion_insert.query(
                            "update promotion_insert set error_code=6 , state=1  where phone_number in("+university_error.toString()+") and addtime = "+unix+" "
                        );  //批量修改
                    }


                }


            }



        }






        console.log('上传完成');
        let final_data = await promotion_insert.where({addtime: unix}).select();
        console.log(final_data);
        return this.json(final_data)
    }



    //初级经理数据
    async dataAction(){
        let agent_id = this.get('agent_id');
        if(think.isEmpty(agent_id)){
            let userInfo = await this.session("userInfo"); //session中获取agent信息
            agent_id = userInfo.id;
        }
        console.log('agent_id为:',agent_id);
        let agent_list = this.model('promotion_agent',qingyun_oam);  //实例化用户的表
        let agent_inset = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let agent_find = await agent_list.where({id: agent_id}).find();
        let agent_insert_data = await agent_inset.where({agent_id: agent_id}).select();
        let total_count = await agent_inset.where({agent_id: agent_id}).count();
        let success_count = await agent_inset.where({agent_id: agent_id,state:0}).count();
        console.log(agent_find);
        this.assign({
            agent_data: agent_find,
            agent_insert_data : agent_insert_data,
            total_count: total_count,
            success_count: success_count,
            action: 'data'
        });
        console.log(agent_insert_data);
        return this.display();
    }

    //省主管数据
    async provinceAction(){
        let agent_id = this.get('agent_id');
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化用户的表
        let university = this.model('university',qingyun_data);  //实例化用户的表
        let agent_inset = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let agent_area_data = '';
        agent_area_data = await promotion_province_rel.where({agent_id: agent_id}).select();

        console.log(agent_area_data);
        let agent_area = [];
        let agent_area_display = [];
        for(var i in agent_area_data){
            agent_area.push("'"+agent_area_data[i].province+"'");
            agent_area_display.push(agent_area_data[i].province);
        }

        console.log(agent_area.toString());
        if(think.isEmpty(agent_area)){
            return this.redirect('/index/agentlist')
        }
        let agent_presidial = await promotion_university_rel.query(
            "select university.agent_id, university.university_id from promotion_university_rel as province left join promotion_university_rel as university on province.province = university.province where province.province in ("+agent_area.toString()+") group by university.agent_id"   //批量查询
        ); //搜索从属于此省主管的所有经理数据
        console.log(agent_presidial);

        let my_agent = [];
        for(i in agent_presidial){
            my_agent.push(agent_presidial[i].agent_id);
        }
        let agent_presidial_info = await promotion_agent.query(
            "select agent.university, agent.name,agent.id from promotion_agent as agent left join promotion_university_rel as university on university.agent_id = agent.id where university.agent_id in ("+my_agent.toString()+") group by university.agent_id"
        ); //搜索这些经理的数据,姓名和学校
        console.log(my_agent,agent_presidial_info);
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        let secunix = Math.round(date.getTime() / 1000); //获取23:59:59的时间戳
        console.log(secunix);
        for(var j in agent_presidial_info){
            let their_id = agent_presidial_info[j].id;
            let their_presidial_info = await promotion_university_rel.query(
                "select university_id from promotion_university_rel where agent_id = "+their_id
            ); //搜索这个agent的所管辖学校id
            let their_presidial_id = [];
            for( var o in their_presidial_info){
                their_presidial_id.push(their_presidial_info[o].university_id)
            }
            let their_presidial_name = await university.query(
                "select university_name from university where university_id in ("+their_presidial_id.toString()+") group by university_id"
            ); //通过这个agent的学校id 获取他们学校的名字



            let agent_insert_data = await agent_inset.where({agent_id: their_id}).select();
            let total_count = await agent_inset.where({agent_id: their_id}).count();
            let today_count = await agent_inset.where({agent_id: their_id,addtime:{'>=':secunix}}).count();  //大于0:0:0 则为今日添加数据

            //console.log('queqweqweqweqw',agent_insert_data,total_count,success_count);

            if(think.isEmpty(agent_insert_data)){
                total_count = 0;
                today_count = 0
            }

            console.log(their_presidial_name);
            agent_presidial_info[j].university_data = their_presidial_name
            agent_presidial_info[j].total = total_count
            agent_presidial_info[j].today = today_count
        }

        console.log(agent_presidial_info);


        this.assign({
            action:'province',
            agent_area : agent_area_display,
            my_agent_info : agent_presidial_info,
            //my_agent_data: my_agent_data
        });
        return this.display();

    }


    //管理员数据
    async adminAction(){
        let admin_id = this.get('agent_id');
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化用户的表
        let university = this.model('university',qingyun_data);  //实例化用户的表
        let agent_inset = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let agent_area_data = await promotion_province_rel.select();
        console.log(agent_area_data);
        let agent_area = [];
        let agent_area_display = [];
        for(var i in agent_area_data){
            let area_name = agent_area_data[i].province;
            let tagindex = agent_area_display.indexOf(area_name);
            if(tagindex == -1){
                agent_area_display.push(area_name)
            }
        }
        for(var m in agent_area_display){
            agent_area.push("'"+agent_area_display[m]+"'");
        }
        console.log(agent_area_display);
        console.log(agent_area);


        //console.log(agent_area.toString());
        //if(think.isEmpty(agent_area_display)){
        //    return this.redirect('/index/agentlist')
        //}


        let dadad = agent_area_display.toString();
        console.log(dadad);
        for(var k in agent_area_display){
            let province_name = agent_area_display[k];
            console.log(agent_area_display[k]);
            let agent_presidial = await promotion_university_rel.query(
                "select university.agent_id, university.university_id from promotion_university_rel as province left join promotion_university_rel as university on province.province = university.province where province.province in ('"+agent_area_display[k]+"') group by university.agent_id"   //批量查询
            ); //搜索从属于此省主管的所有经理数据
            console.log('属于所查省名的所有agent信息',agent_presidial);

            let my_agent = [];
            for(i in agent_presidial){
                my_agent.push(agent_presidial[i].agent_id);
            }
            let agent_presidial_info = await promotion_agent.query(
                "select agent.university, agent.name,agent.id from promotion_agent as agent left join promotion_university_rel as university on university.agent_id = agent.id where university.agent_id in ("+my_agent.toString()+") group by university.agent_id"
            ); //搜索这些经理的数据,姓名和学校
            console.log(my_agent,agent_presidial_info);


            var date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            let secunix = Math.round(date.getTime() / 1000); //获取23:59:59的时间戳

            let today_data = 0;
            let total_data = 0;
            for(var j in agent_presidial_info){
                let their_id = agent_presidial_info[j].id;
                let their_presidial_info = await promotion_university_rel.query(
                    "select university_id from promotion_university_rel where agent_id = "+their_id
                ); //搜索这个agent的所管辖学校id
                let their_presidial_id = [];
                for( var o in their_presidial_info){
                    their_presidial_id.push(their_presidial_info[o].university_id)
                }
                let their_presidial_name = await university.query(
                    "select university_name from university where university_id in ("+their_presidial_id.toString()+") group by university_id"
                ); //通过这个agent的学校id 获取他们学校的名字


                console.log('aaaaaaaaaaaaaaaaaaaa',their_presidial_name);

                let agent_insert_data = await agent_inset.where({agent_id: their_id}).select();
                let total_count = await agent_inset.where({agent_id: their_id}).count();
                let today_count = await agent_inset.where({agent_id: their_id,addtime:{'>=':secunix}}).count();  //大于0:0:0 则为今日添加数据

                //console.log('queqweqweqweqw',agent_insert_data,total_count,success_count);

                if(think.isEmpty(agent_insert_data)){
                    total_count = 0;
                    today_count = 0
                }

                console.log(their_presidial_name);
                today_data += parseInt(today_count);
                total_data += parseInt(total_count);
                agent_presidial_info[j].university_data = their_presidial_name;
                agent_presidial_info[j].total = total_count;
                agent_presidial_info[j].today = today_count
            }

            console.log(agent_presidial_info);
            console.log(today_data);


            agent_area_display[k] = {}

            agent_area_display[k].province_name = province_name;
            agent_area_display[k].total = today_data;
            agent_area_display[k].today = total_data;

        }
        console.log(agent_area_display);

        let today_total_data = 0;
        let total_total_data = 0;
        for(var u in agent_area_display){
            today_total_data += parseInt(agent_area_display[u].today);
            total_total_data += parseInt(agent_area_display[u].total);

        }


        this.assign({
            action : 'admin',
            agent_info : agent_area_display,
            total_total_data: total_total_data,
            today_total_data: today_total_data
        });
        return this.display();
    }









    //所有省所有经理数据
    async provinceallAction(){
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化用户的表
        let university = this.model('university',qingyun_data);  //实例化用户的表
        let agent_inset = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let agent_area_data = await promotion_province_rel.select();
        console.log(agent_area_data);
        let agent_area = [];
        let agent_area_display = [];
        for(var i in agent_area_data){
            let area_name = agent_area_data[i].province;
            let tagindex = agent_area_display.indexOf(area_name);
            if(tagindex == -1){
                agent_area_display.push(area_name)
            }
        }
        for(var m in agent_area_display){
            agent_area.push("'"+agent_area_display[m]+"'");
        }
        console.log(agent_area_display);
        console.log(agent_area);


        //console.log(agent_area.toString());
        if(think.isEmpty(agent_area)){
            return this.redirect('/index/agentlist')
        }
        let agent_presidial = await promotion_university_rel.query(
            "select university.agent_id, university.university_id from promotion_university_rel as province left join promotion_university_rel as university on province.province = university.province where province.province in ("+agent_area.toString()+") group by university.agent_id"   //批量查询
        ); //搜索从属于此省主管的所有经理数据
        console.log('属于所查省名的所有agent信息',agent_presidial);



        let my_agent = [];
        for(i in agent_presidial){
            my_agent.push(agent_presidial[i].agent_id);
        }
        let agent_presidial_info = await promotion_agent.query(
            "select agent.university, agent.name,agent.id from promotion_agent as agent left join promotion_university_rel as university on university.agent_id = agent.id where university.agent_id in ("+my_agent.toString()+") group by university.agent_id"
        ); //搜索这些经理的数据,姓名和学校
        console.log(my_agent,agent_presidial_info);
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        let secunix = Math.round(date.getTime() / 1000); //获取23:59:59的时间戳
        console.log(secunix);
        for(var j in agent_presidial_info){
            let their_id = agent_presidial_info[j].id;
            let their_presidial_info = await promotion_university_rel.query(
                "select university_id from promotion_university_rel where agent_id = "+their_id
            ); //搜索这个agent的所管辖学校id
            let their_presidial_id = [];
            for( var o in their_presidial_info){
                their_presidial_id.push(their_presidial_info[o].university_id)
            }
            let their_presidial_name = await university.query(
                "select university_name from university where university_id in ("+their_presidial_id.toString()+") group by university_id"
            ); //通过这个agent的学校id 获取他们学校的名字



            let agent_insert_data = await agent_inset.where({agent_id: their_id}).select();
            let total_count = await agent_inset.where({agent_id: their_id}).count();
            let today_count = await agent_inset.where({agent_id: their_id,addtime:{'>=':secunix}}).count();  //大于0:0:0 则为今日添加数据

            //console.log('queqweqweqweqw',agent_insert_data,total_count,success_count);

            if(think.isEmpty(agent_insert_data)){
                total_count = 0;
                today_count = 0
            }

            console.log(their_presidial_name);
            agent_presidial_info[j].university_data = their_presidial_name;
            agent_presidial_info[j].total = total_count;
            agent_presidial_info[j].today = today_count
        }

        console.log(agent_presidial_info);


        this.assign({
            action : 'provinceall',
            agent_area : agent_area_display,
            my_agent_info : agent_presidial_info,
            //my_agent_data: my_agent_data
        });
        return this.display();
    }






    //省份异常率
    async provincedataAction(){
        let get_String = this.get();
        let province_name = get_String.province; // '北京'
        console.log('搜索的省名',province_name);
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化用户的表
        let university = this.model('promotion_university',qingyun_oam);  //实例化用户的表
        let promotion_insert = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let user_account = this.model('user_account',qingyun_data);  //实例化用户的表

        let uid_arr = await promotion_province_rel.query(
            "SELECT university_id  " +
            "FROM promotion_university_rel " +
            "where province = '"+province_name+"' " +
            "group by university_id "
        );
        console.log(uid_arr);

        //let aid_arr = await promotion_province_rel.query(
        //    "SELECT agent_id " +
        //    "FROM promotion_university_rel " +
        //    "where province = '"+province_name+"' " +
        //    "group by agent_id"
        //);
        //console.log(aid_arr);

        let university_group = [];
        for(var i in uid_arr){
            let university_group_info = {};
            let  agent_info = [];
            let uid = uid_arr[i].university_id;
            let aid_from_uid_arr = await promotion_province_rel.query(
                "SELECT agent_id " +
                "FROM promotion_university_rel " +
                "where university_id = "+ uid
            );//搜索出所有属于此学校的agentid
            console.log(aid_from_uid_arr);


            let university_total_count = await user_account.query(
                "select count(1) as count " +
                "from user_info " +
                "where university_id = " + uid
            );//搜索数所有属于此学校的注册总数

            let university_name = await user_account.query(
                "select university_name " +
                "from university " +
                "where university_id = " + uid
            );//搜索出此学校的名字

            let success_number = 0;
            for(var j in aid_from_uid_arr){
                let agent_information = {};
                let aid = aid_from_uid_arr[j].agent_id;

                let agent_insert_data = await promotion_insert.where({agent_id: aid}).select();

                let agent_data = await promotion_agent.where({id: aid}).find();
                let success_count = await promotion_insert.where({agent_id: aid,state:0}).count();  //成功的总数
                let v_count = await promotion_insert.where({agent_id: aid,error_code:0}).count();  //加V成功的总数
                agent_information.agent_id = aid;
                agent_information.agent_name = agent_data.name;
                agent_information.total = success_count;
                agent_information.success = v_count;


                console.log(agent_information,'aaaaaaaaaaaaaaaaaaaaa');
                agent_info.push(agent_information);
                success_number += success_count
            }
            console.log(agent_info,'hahahahahaahahaha');


            university_group_info.university_id = uid;
            university_group_info.university_name = university_name[0].university_name;
            university_group_info.total_count = university_total_count[0].count;
            university_group_info.success_count = success_number;
            university_group_info.agent_data = agent_info;
            console.log(university_group_info);
            university_group.push(university_group_info)
        }


        console.log(university_group);












        //let agent_presidial = await promotion_university_rel.query(
        //    "select university.agent_id " +
        //    "from promotion_university_rel as province " +
        //    "left join promotion_university_rel as university " +
        //    "on province.province = university.province " +
        //    "where province.province = '"+province_name+"' " +
        //    "group by university.agent_id"   //批量查询
        //); //搜索从属于此省的所有经理数据
        //console.log(agent_presidial);
        //
        //
        //let my_agent = [];
        //for(var i in agent_presidial){
        //    my_agent.push(agent_presidial[i].agent_id);
        //}
        //let agent_presidial_info = await promotion_agent.query(
        //    "select agent.university, agent.name,agent.id from promotion_agent as agent left join promotion_university_rel as university on university.agent_id = agent.id where university.agent_id in ("+my_agent.toString()+") group by university.agent_id"
        //); //搜索这些经理的数据,姓名和学校
        //console.log(my_agent,agent_presidial_info,'我的小弟的信息');
        //
        //var date = new Date();
        //date.setHours(0);
        //date.setMinutes(0);
        //date.setSeconds(0);
        //let secunix = Math.round(date.getTime() / 1000); //获取23:59:59的时间戳
        //console.log(secunix);
        //
        //let province_data_arr = [];
        //let their_presidial_group = [];
        //
        //for(var j in agent_presidial_info){
        //    let their_id = agent_presidial_info[j].id;
        //    let their_presidial_info = await promotion_university_rel.query(
        //        "select university_id,agent_id from promotion_university_rel where agent_id = "+their_id
        //    ); //搜索这个agent的所管辖学校id
        //    console.log(their_presidial_info,'aaaaaaaa');
        //
        //
        //
        //    let presidial_arr = [];
        //    for(var i in their_presidial_info){
        //        let presidial_info = {};
        //
        //        let their_presidial_university_id = their_presidial_info[i].university_id;
        //        let their_name = await promotion_agent.query(
        //            "select name from promotion_agent where id = "+their_id+""
        //        );
        //        let their_presidial_name = await university.query(
        //            "select university_name from promotion_university where university_id = "+their_presidial_university_id+" group by university_id"
        //        ); //通过这个agent的学校id 获取他们学校的名字
        //        console.log('他们学校的名字',their_presidial_name[0].university_name);
        //
        //        let agent_insert_data = await promotion_insert.where({agent_id: their_id}).select();
        //        let total_count = await promotion_insert.where({agent_id: their_id}).count();
        //        let success_count = await promotion_insert.where({agent_id: their_id,state:0}).count();  //大于0:0:0 则为今日添加数据
        //        let v_count = await promotion_insert.where({agent_id: their_id,error_code:0}).count();  //大于0:0:0 则为今日添加数据
        //        let total_success_count = await user_account.query(
        //            "select count(1) as count " +
        //            "from user_account as a " +
        //            "left join user_info as b " +
        //            "on a.userid =  b.userid " +
        //            "where b.university_id = "+their_presidial_university_id+" and a.verify_status = 1" //搜索学校id 中 verify =1 的
        //        );
        //
        //        console.log('数量',total_count,success_count,v_count,total_success_count[0].count);
        //
        //
        //
        //
        //        presidial_info.agent_id = their_id;
        //        presidial_info.agent_name = their_name[0].name;
        //        presidial_info.university_name = their_presidial_name[0].university_name;
        //        presidial_info.id = their_presidial_university_id;
        //        presidial_info.success_count = success_count;
        //        presidial_info.total_count = total_count;
        //        presidial_info.v_count = v_count;
        //        presidial_info.total_success_count = total_success_count[0].count;
        //        console.log(presidial_info,'这个是拼的数组');
        //        presidial_arr.push(presidial_info)
        //    }
        //
        //    console.log(presidial_arr);
        //    for( var g in presidial_arr){
        //        their_presidial_group.push(presidial_arr[g])
        //    }
        //
        //}
        //
        //
        //console.log(their_presidial_group);

        this.assign({
            action: 'provincedata',
            province_name: province_name,
            agent_info :university_group,
            time : formatDate(Math.round(new Date().getTime()))
        });
        return this.display();
    }




    //时间选择
    async selecttimeAction(){



    }



    //工资条
    async salaryAction(){
        let get_String = this.get();
        let province_name = get_String.province; // '北京'
        console.log('搜索的省名',province_name);

        let university_data = this.model('promotion_city',qingyun_oam);  //实例化用户的表
        let province_selected = await university_data.where({province: province_name}).select();
        let university_data_account = this.model('promotion_university',qingyun_oam);  //实例化用户的表
        let city_Arr = [];
        for( var i in province_selected){
            let city_name = province_selected[i].city;
            let tagindex = city_Arr.indexOf(city_name);
            if(tagindex == -1){
                city_Arr.push(city_name)
            }
        }
        console.log(city_Arr.toString());


        this.assign({
            action: 'salary',
            province: province_name,
            city:city_Arr.toString()
        });

        this.cookie("province", province_name); //设置cookie
        return this.display();
    }


    async agentsalaryAction(){
        let province_name = this.cookie("province"); //获取名为 province 的 cookie
        console.log('搜索的省名',province_name);
        let promotion_university_rel = this.model('promotion_university_rel',qingyun_oam);  //实例化用户的表
        let promotion_province_rel = this.model('promotion_province_rel',qingyun_oam);  //实例化用户的表
        let promotion_agent = this.model('promotion_agent',qingyun_oam);  //实例化用户的表
        let promotion_insert = this.model('promotion_insert',qingyun_oam);  //实例化用户的表
        let user_account = this.model('user_account',qingyun_data);  //实例化用户的表

        let aid_arr = await promotion_province_rel.query(
            "SELECT agent_id  " +
            "FROM promotion_university_rel " +
            "where province = '"+province_name+"' " +
            "group by agent_id "
        );
        console.log(aid_arr);



        for(var i in aid_arr){
            let agent_id = aid_arr[i].agent_id;
            let agent_info = await promotion_agent.query(
                "select university, name, level, alipay " +
                "from promotion_agent " +
                "where id = "+ agent_id
            );
            let agent_insert_data = await promotion_university_rel.where({agent_id: agent_id}).select();
            let total_count = await promotion_insert.where({agent_id: agent_id}).count();
            agent_info.total = total_count;
            let uid_arr = [];
            for(var j in agent_insert_data){
                let agent_insert_unverisity = agent_insert_data[j].university_id;
                uid_arr.push(agent_insert_unverisity)
            }
            console.log(uid_arr);


            console.log(agent_info);


        }

        let data = [{name:'sss',university:'sssaaaa'}];
        return this.json(data)
    }










































    /*
    七牛云上传
     */
    /**
     * step I
     * 渲染页面,获取原始buket,并对domain,uptoken_url赋值
     * 若不点击空间名,则在当前空间上传
     */
    async uploadAction(){
        //auto render template file index_index.html
        let timestamp = Math.round(new Date().getTime()/1000);
        let bucname = 'tata-prod';  //以后可以做一个输入框以便随时更改存储路径
        //if(bucname == undefined){
        //    bucname = 'tata-prod'
        //}
        await this.session("bucket_name", bucname);
        let prefixname = timestamp;
        //if(prefixname == undefined){
        //    prefixname = timestamp
        //}
        console.log(prefixname);
        console.log('############原始buket: '+bucname,'############原始prefix: '+prefixname);
        this.assign({
            orignalbucket : bucname,
            orignalprefix : prefixname,
            domain: qiniuconfig.Domain,
            uptoken_url: qiniuconfig.Uptoken_Url

        });
        return this.display();
    }

    /**
     * step I.I
     * 渲染页面的时候 需要返回Uptoken_Url,这个url定义的是这个方法
     * 这个方法将会生成上传凭证
     */
    async gettokenAction() {
        let qiniuconfig = think.config('key', undefined, 'home');
        let bucname = await this.session('bucket_name');
        console.log('############当前buket: '+bucname);
        let putPolicy = new qiniu.rs.PutPolicy(bucname);
        let data = {};
        data.uptoken = putPolicy.token();
        console.log(data.uptoken);
        return this.json(data)
    }


    /**
     * step II
     * 通过form-wizard.js的ajax请求,异步获取数据,传过来的数据分别是上传文件的 空间名 和 前缀
     * 同时进行session赋值操作,
     */
    async getvalueAction(){
        let dic = this.post('dic');
        //let path = this.post('path');

        await this.session('bucket_name',dic);
        await this.session('session_name',path);
        console.log('$$$$$$$$$$$$这个是更新后的buket: '+dic,'$$$$$$$$$$$这个是更新后的前缀: '+path);
        let data = {};
        data.dic = dic;
        data.path = path;
        return this.json(data);
    }



    /**
     * 删除单条记录
     */
    async deleteAction(){
        let self = this;
        let key = this.get('key');
        console.log(key);
        let bucname = await this.session('bucket_name');
        console.log(bucname);
        var client = new qiniu.rs.Client();
        let data = {};
        client.remove(bucname, key, function(err, ret) {
            if (!err) {
                // ok
                console.log("haha");
                data.code = 1;
                return self.json(data);
                //window.location.reload();
            } else {
                console.log(err);
                // http://developer.qiniu.com/docs/v6/api/reference/codes.html
            }
        })
    }


}