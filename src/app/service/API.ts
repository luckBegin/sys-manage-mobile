import { environment } from '../../environments/environment'
export const HOST: string = environment.HOST;
const wx = {
	getConfigByCode: HOST + '/wechat/getWxConfig'
};

const staff = {
	info: HOST + '/system/staff/byUid',
	changePass: HOST + '/system/staff/changePass'
}

export const API = { wx , staff };
