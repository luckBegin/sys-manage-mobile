import { environment } from '../../environments/environment'
export const HOST: string = environment.HOST;
const wx = {
	getConfigByCode: HOST + '/wechat/getWxConfig' ,
	msg: HOST + '/wechat/msg' ,
	msgByUser: HOST + '/wechat/msgByUser'
};

const staff = {
	list: HOST + '/system/staff',
	changePass: HOST + '/system/staff/changePass',
	bindWx:HOST + '/system/staff/bindWx'
};

const room = {
	book: HOST + '/room/book',
	type: HOST + '/room/type'
};

const system = {
	shop: HOST + '/system/shop' ,
	role: HOST + '/system/role' ,
	depart: HOST + '/system/department'
};

export const API = { wx , staff , room , system };
