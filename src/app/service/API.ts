import { environment } from '../../environments/environment'
export const HOST: string = environment.HOST;
const wx = {
	getConfigByCode: HOST + '/wechat/getWxConfig' ,
	msg: HOST + '/wechat/msg' ,
	msgByUser: HOST + '/wechat/msgByUser'
};

const staff = {
	list: HOST + '/system/staff',
	changePass: HOST + '/system/staff/changePass'
};

const room = {
	book: HOST + '/room/book',
	type: HOST + '/room/type'
};

const system = {
	shop: HOST + '/system/shop'
};

export const API = { wx , staff , room , system };
