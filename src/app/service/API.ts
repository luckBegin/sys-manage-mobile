import { environment } from '../../environments/environment'
export const HOST: string = environment.HOST;
const wx = {
	getConfigByCode: HOST + '/wechat/getWxConfig'
};
export const API = { wx };
