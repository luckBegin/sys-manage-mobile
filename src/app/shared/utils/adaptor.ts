import {ENUM} from '../../models' ;

const checkType = function(target: any, type: string): boolean {
	return Object.prototype.toString.call(target) === `[object ${type}]`;
};

class TreeNodes {
	title: string;
	key: number;
	children: TreeNodes[] = [];
	parentNode: TreeNodes;

	constructor(title: string, key: number, parent: TreeNodes) {
		this.title = title;
		this.key = key;
		this.parentNode = parent;
	}

	getParentNode() {
		return this.parentNode;
	}

	getChildren() {
		return this.children;
	}
}

const recursive = function (target: any[], data: any[], map: { title: string, key: string | number }, parent = null) {
	data.forEach(item => {
		const _obj = new TreeNodes(item[map['title']], item[map['key']], parent);
		target.push(_obj);

		Object.keys(item).forEach((key) => {
			if ( key !== 'children' ) {
				_obj[key] = item[key];
			}
		});
		if ( item.children ) {
			recursive(_obj.children, item.children, map, item);
		}
	});
};
export const AdaptorUtils = {
	reflect(target: object[], map: object): ENUM[] {
		if ( checkType(target, 'Array') ) {
			const _arr = [];

			(target as any[]).forEach(item => {
				const _obj = {};

				Object.keys(map).forEach(keys => {
					if ( item[keys] ) {
						_obj[map[keys]] = item[keys];
					}
				});
				_arr.push(_obj);
			});
			return _arr ;
		}
		return target as ENUM[];
	},

	makeTreeNode(map: { title: string, key: string | number }, data: any[]): TreeNodes[] {
		const _arr = [];

		recursive(_arr, data, map);

		return _arr;
	},
	enumToMap( enumVal: ENUM[] | ENUM ): { [key: string]: any} {
		const map = {} ;
		if( enumVal instanceof  Array) {
			enumVal.forEach( item => {
				map[item.value as string] = item.key ;
			})
		} else {
			map[enumVal.value as string] = enumVal.key;
		}
		return map ;
	}
};
