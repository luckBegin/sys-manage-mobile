import { environment } from '../../environments/environment'
export const HOST: string = environment.HOST;
const wx = {
	getConfigByCode: HOST + '/wechat/getWxConfig' ,
	msg: HOST + '/wechat/msg' ,
	msgByUser: HOST + '/wechat/msgByUser'
};

const staff = {
	list: HOST + '/system/staff',
	bindWx:HOST + '/system/staff/bindWx'
};

const room = {
	book: HOST + '/room/book',
	type: HOST + '/room/type',
	list: HOST + '/room/list'
};

const system = {
	shop: HOST + '/system/shop' ,
	role: HOST + '/system/role' ,
	depart: HOST + '/system/department'
};

const goods = {
	classify: HOST + '/goods/classify' ,
	subClassify: HOST + '/goods/subClassify',
	childClassify: HOST + '/goods/childClassify',
}
export const API = { wx , staff , room , system, goods };
