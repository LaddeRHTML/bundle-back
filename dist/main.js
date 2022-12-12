/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.slice(1) || 0;
	var log = __webpack_require__(1);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const exception_filters_1 = __webpack_require__(93);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true
    });
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    app.useGlobalFilters(new exception_filters_1.AllExceptionsFilter());
    await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const accessories_module_1 = __webpack_require__(8);
const applications_module_1 = __webpack_require__(24);
const assemblies_module_1 = __webpack_require__(30);
const auth_module_1 = __webpack_require__(36);
const clients_module_1 = __webpack_require__(61);
const files_module_1 = __webpack_require__(69);
const orders_module_1 = __webpack_require__(77);
const products_module_1 = __webpack_require__(88);
const users_module_1 = __webpack_require__(39);
const configuration_module_1 = __webpack_require__(49);
const configuration_service_1 = __webpack_require__(51);
const app_controller_1 = __webpack_require__(92);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [configuration_module_1.ConfigurationModule],
                inject: [configuration_service_1.ConfigurationService],
                useFactory: (appConfigService) => {
                    const options = {
                        uri: appConfigService.connectionString,
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    };
                    return options;
                }
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            applications_module_1.ApplicationsModule,
            files_module_1.FilesModule,
            clients_module_1.ClientsModule,
            orders_module_1.OrdersModule,
            accessories_module_1.AccessoriesModule,
            assemblies_module_1.AssemblyModule
        ],
        controllers: [app_controller_1.AppController],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/mongoose");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessoriesModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const accessories_controller_1 = __webpack_require__(9);
const accessories_service_1 = __webpack_require__(17);
const accessories_schema_1 = __webpack_require__(20);
let AccessoriesModule = class AccessoriesModule {
};
AccessoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: accessories_schema_1.Accessory.name, schema: accessories_schema_1.AccessorySchema }])],
        controllers: [accessories_controller_1.AccessoriesController],
        providers: [accessories_service_1.AccessoriesService],
        exports: [accessories_service_1.AccessoriesService]
    })
], AccessoriesModule);
exports.AccessoriesModule = AccessoriesModule;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessoriesController = void 0;
const common_1 = __webpack_require__(6);
const roles_decorator_1 = __webpack_require__(10);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const roles_enum_1 = __webpack_require__(15);
const api_const_1 = __webpack_require__(16);
const accessories_service_1 = __webpack_require__(17);
const create_accessories_dto_1 = __webpack_require__(21);
const update_accessories_dto_1 = __webpack_require__(22);
const controllerName = `${api_const_1.apiVersion}/accessories/`;
let AccessoriesController = class AccessoriesController {
    constructor(accessoriesService) {
        this.accessoriesService = accessoriesService;
    }
    create(createAccessoryDto) {
        return this.accessoriesService.create(createAccessoryDto);
    }
    findAll() {
        return this.accessoriesService.findAll();
    }
    async findSortedItems(page, limit) {
        return await this.accessoriesService.findSortedItems(page, limit);
    }
    findOne(id) {
        return this.accessoriesService.findOne(id);
    }
    update(id, updateAccessoryDto) {
        return this.accessoriesService.update(id, updateAccessoryDto);
    }
    remove(id) {
        return this.accessoriesService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_accessories_dto_1.CreateAccessoryDto !== "undefined" && create_accessories_dto_1.CreateAccessoryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AccessoriesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AccessoriesController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/filter?'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AccessoriesController.prototype, "findSortedItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AccessoriesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof update_accessories_dto_1.UpdateAccessoryDto !== "undefined" && update_accessories_dto_1.UpdateAccessoryDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AccessoriesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AccessoriesController.prototype, "remove", null);
AccessoriesController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof accessories_service_1.AccessoriesService !== "undefined" && accessories_service_1.AccessoriesService) === "function" ? _a : Object])
], AccessoriesController);
exports.AccessoriesController = AccessoriesController;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HasRoles = void 0;
const common_1 = __webpack_require__(6);
const roles_const_1 = __webpack_require__(11);
const HasRoles = (...roles) => (0, common_1.SetMetadata)(roles_const_1.ROLE_KEY, roles);
exports.HasRoles = HasRoles;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ROLE_KEY = void 0;
exports.ROLE_KEY = process.env.ROLE_KEY;


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleGuard = void 0;
const common_1 = __webpack_require__(6);
const core_1 = __webpack_require__(4);
const roles_const_1 = __webpack_require__(11);
const jwt_auth_guard_1 = __webpack_require__(13);
const matchRoles = (roles, userRoles) => {
    return roles.some((role) => role === userRoles);
};
let RoleGuard = class RoleGuard extends jwt_auth_guard_1.JwtAuthGuard {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    async canActivate(context) {
        await super.canActivate(context);
        const roles = this.reflector.getAllAndOverride(roles_const_1.ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!roles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return matchRoles(roles, user.role);
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RoleGuard);
exports.RoleGuard = RoleGuard;
exports["default"] = RoleGuard;


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(14);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["User"] = "user";
    Role["Moderator"] = "moder";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.apiVersion = void 0;
exports.apiVersion = 'api/v1';


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessoriesService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(18);
const index_1 = __webpack_require__(19);
const accessories_schema_1 = __webpack_require__(20);
let AccessoriesService = class AccessoriesService {
    constructor(accessoryModel) {
        this.accessoryModel = accessoryModel;
    }
    async create(createAccessoryDto) {
        return await this.accessoryModel.create(createAccessoryDto);
    }
    async findAll() {
        return await this.accessoryModel.find({});
    }
    async findSortedItems(page, limit) {
        const total = await this.accessoryModel.count({}).exec();
        const query = this.accessoryModel.find({});
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findOne(_id) {
        return await this.accessoryModel.findOne({ _id });
    }
    async update(id, updateAccessoryDto) {
        return await this.accessoryModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateAccessoryDto), { new: true });
    }
    async remove(_id) {
        return await this.accessoryModel.findOneAndRemove({ _id });
    }
};
AccessoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(accessories_schema_1.Accessory.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], AccessoriesService);
exports.AccessoriesService = AccessoriesService;


/***/ }),
/* 18 */
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginate = exports.calcRelToAnyDate = exports.calcRelToCurrentDate = void 0;
const countDays = (positiveDate, negativeDate, yearDetermenant) => {
    return Math.floor((positiveDate - negativeDate) / (1000 * 60 * 60 * 24 * (yearDetermenant ? 365 : 1)));
};
const calcRelToCurrentDate = (pastDate, relativeToYear) => {
    const pastDayInMillSeconds = new Date(pastDate).getTime();
    const todayInMillSeconds = new Date().getTime();
    const currentDate = countDays(todayInMillSeconds, pastDayInMillSeconds, relativeToYear);
    return currentDate;
};
exports.calcRelToCurrentDate = calcRelToCurrentDate;
const calcRelToAnyDate = (pastDate, newDate, relativeToYear) => {
    const pastDayInMillSeconds = new Date(pastDate).getTime();
    const newDayInMillSeconds = new Date(newDate).getTime();
    const currentDate = countDays(newDayInMillSeconds, pastDayInMillSeconds, relativeToYear);
    return currentDate;
};
exports.calcRelToAnyDate = calcRelToAnyDate;
const paginate = async (page = 1, query, limit = 6, total) => {
    const lastPage = Math.ceil(total / limit);
    const data = await query
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    const sortedData = {
        data,
        total,
        page,
        lastPage
    };
    return sortedData;
};
exports.paginate = paginate;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessorySchema = exports.Accessory = void 0;
const mongoose_1 = __webpack_require__(7);
let Accessory = class Accessory {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'accessories' }),
    __metadata("design:type", String)
], Accessory.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "marketprice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "supplierPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "discountPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Accessory.prototype, "pictures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Accessory.prototype, "previewPicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0, min: 0, max: 5 }),
    __metadata("design:type", Number)
], Accessory.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Accessory.prototype, "characteristics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "vendor\u0421ode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "maker", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Accessory.prototype, "warrantyDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Accessory.prototype, "uploadDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Accessory.prototype, "updateDate", void 0);
Accessory = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_ACCESSORIES })
], Accessory);
exports.Accessory = Accessory;
exports.AccessorySchema = mongoose_1.SchemaFactory.createForClass(Accessory);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccessoryDto = void 0;
const accessories_schema_1 = __webpack_require__(20);
class CreateAccessoryDto extends accessories_schema_1.Accessory {
}
exports.CreateAccessoryDto = CreateAccessoryDto;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAccessoryDto = void 0;
const swagger_1 = __webpack_require__(23);
const create_accessories_dto_1 = __webpack_require__(21);
class UpdateAccessoryDto extends (0, swagger_1.PartialType)(create_accessories_dto_1.CreateAccessoryDto) {
}
exports.UpdateAccessoryDto = UpdateAccessoryDto;


/***/ }),
/* 23 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationsModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const applications_controller_1 = __webpack_require__(25);
const applications_service_1 = __webpack_require__(26);
const applications_schema_1 = __webpack_require__(27);
let ApplicationsModule = class ApplicationsModule {
};
ApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: applications_schema_1.Application.name, schema: applications_schema_1.ApplicationsSchema }])],
        controllers: [applications_controller_1.ApplicationsController],
        providers: [applications_service_1.ApplicationsService]
    })
], ApplicationsModule);
exports.ApplicationsModule = ApplicationsModule;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationsController = void 0;
const common_1 = __webpack_require__(6);
const roles_decorator_1 = __webpack_require__(10);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const roles_enum_1 = __webpack_require__(15);
const api_const_1 = __webpack_require__(16);
const applications_service_1 = __webpack_require__(26);
const create_application_dto_1 = __webpack_require__(28);
const update_application_dto_1 = __webpack_require__(29);
const controllerName = `${api_const_1.apiVersion}/applications`;
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    create(createApplicationDto) {
        return this.applicationsService.create(createApplicationDto);
    }
    async findSortedItems(page, limit) {
        return await this.applicationsService.findSortedItems(page, limit);
    }
    findAll() {
        return this.applicationsService.findAll();
    }
    findOne(id) {
        return this.applicationsService.findOne(id);
    }
    update(id, updateApplicationDto) {
        return this.applicationsService.update(id, updateApplicationDto);
    }
    async remove(id) {
        return await this.applicationsService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_application_dto_1.CreateApplicationDto !== "undefined" && create_application_dto_1.CreateApplicationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ApplicationsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/filter?'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ApplicationsController.prototype, "findSortedItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ApplicationsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ApplicationsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof update_application_dto_1.UpdateApplicationDto !== "undefined" && update_application_dto_1.UpdateApplicationDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ApplicationsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "remove", null);
ApplicationsController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof applications_service_1.ApplicationsService !== "undefined" && applications_service_1.ApplicationsService) === "function" ? _a : Object])
], ApplicationsController);
exports.ApplicationsController = ApplicationsController;


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationsService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(18);
const index_1 = __webpack_require__(19);
const applications_schema_1 = __webpack_require__(27);
let ApplicationsService = class ApplicationsService {
    constructor(applicationsModel) {
        this.applicationsModel = applicationsModel;
    }
    async create(createApplicationDto) {
        return await this.applicationsModel.create(createApplicationDto);
    }
    async findSortedItems(page, limit) {
        const total = await this.applicationsModel.count({}).exec();
        const query = this.applicationsModel.find({});
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findAll() {
        return await this.applicationsModel.find({});
    }
    async findOne(_id) {
        return await this.applicationsModel.findOne({ _id });
    }
    async update(_id, updateApplicationDto) {
        return await this.applicationsModel.findOneAndUpdate({ _id }, Object.assign({}, updateApplicationDto), { new: true });
    }
    async remove(id) {
        return await this.applicationsModel.findByIdAndDelete({ _id: id });
    }
};
ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(applications_schema_1.Application.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ApplicationsService);
exports.ApplicationsService = ApplicationsService;


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationsSchema = exports.Application = void 0;
const mongoose_1 = __webpack_require__(7);
let Application = class Application {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "creatorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Application.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Application.prototype, "createDate", void 0);
Application = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false,
        collection: process.env.COLLECTION_KEY_APPLICATIONS
    })
], Application);
exports.Application = Application;
exports.ApplicationsSchema = mongoose_1.SchemaFactory.createForClass(Application);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateApplicationDto = void 0;
const applications_schema_1 = __webpack_require__(27);
class CreateApplicationDto extends applications_schema_1.Application {
}
exports.CreateApplicationDto = CreateApplicationDto;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateApplicationDto = void 0;
const swagger_1 = __webpack_require__(23);
const create_application_dto_1 = __webpack_require__(28);
class UpdateApplicationDto extends (0, swagger_1.PartialType)(create_application_dto_1.CreateApplicationDto) {
}
exports.UpdateApplicationDto = UpdateApplicationDto;


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssemblyModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const assemblies_controller_1 = __webpack_require__(31);
const assemblies_service_1 = __webpack_require__(32);
const assemblies_schema_1 = __webpack_require__(33);
let AssemblyModule = class AssemblyModule {
};
AssemblyModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: assemblies_schema_1.Assembly.name, schema: assemblies_schema_1.AssemblySchema }])],
        controllers: [assemblies_controller_1.AssembliesController],
        providers: [assemblies_service_1.AssembliesService],
        exports: [assemblies_service_1.AssembliesService]
    })
], AssemblyModule);
exports.AssemblyModule = AssemblyModule;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssembliesController = void 0;
const common_1 = __webpack_require__(6);
const roles_decorator_1 = __webpack_require__(10);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const roles_enum_1 = __webpack_require__(15);
const api_const_1 = __webpack_require__(16);
const assemblies_service_1 = __webpack_require__(32);
const create_assemblies_dto_1 = __webpack_require__(34);
const update_assemblies_dto_1 = __webpack_require__(35);
const controllerName = `${api_const_1.apiVersion}/assemblies/`;
let AssembliesController = class AssembliesController {
    constructor(assembliesService) {
        this.assembliesService = assembliesService;
    }
    create(createAssemblyDto) {
        return this.assembliesService.create(createAssemblyDto);
    }
    findAll() {
        return this.assembliesService.findAll();
    }
    async findSortedItems(page, limit) {
        return await this.assembliesService.findSortedItems(page, limit);
    }
    findOne(id) {
        return this.assembliesService.findOne(id);
    }
    update(id, updateAssemblyDto) {
        return this.assembliesService.update(id, updateAssemblyDto);
    }
    remove(id) {
        return this.assembliesService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_assemblies_dto_1.CreateAssemblyDto !== "undefined" && create_assemblies_dto_1.CreateAssemblyDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AssembliesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AssembliesController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/filter?'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AssembliesController.prototype, "findSortedItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AssembliesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof update_assemblies_dto_1.UpdateAssemblyDto !== "undefined" && update_assemblies_dto_1.UpdateAssemblyDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AssembliesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AssembliesController.prototype, "remove", null);
AssembliesController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof assemblies_service_1.AssembliesService !== "undefined" && assemblies_service_1.AssembliesService) === "function" ? _a : Object])
], AssembliesController);
exports.AssembliesController = AssembliesController;


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssembliesService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(18);
const index_1 = __webpack_require__(19);
const assemblies_schema_1 = __webpack_require__(33);
let AssembliesService = class AssembliesService {
    constructor(assemblyModel) {
        this.assemblyModel = assemblyModel;
    }
    async create(createAssemblyDto) {
        return await this.assemblyModel.create(createAssemblyDto);
    }
    async findAll() {
        return await this.assemblyModel.find({});
    }
    async findSortedItems(page, limit) {
        const total = await this.assemblyModel.count({}).exec();
        const query = this.assemblyModel.find({});
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findOne(_id) {
        return await this.assemblyModel.findOne({ _id });
    }
    async update(id, updateAssemblyDto) {
        return await this.assemblyModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateAssemblyDto), { new: true });
    }
    async remove(_id) {
        return await this.assemblyModel.findOneAndRemove({ _id });
    }
};
AssembliesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assemblies_schema_1.Assembly.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], AssembliesService);
exports.AssembliesService = AssembliesService;


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssemblySchema = exports.Assembly = void 0;
const mongoose_1 = __webpack_require__(7);
let Assembly = class Assembly {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'assemblies' }),
    __metadata("design:type", String)
], Assembly.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: 'accessories' }),
    __metadata("design:type", Array)
], Assembly.prototype, "accessories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'assemblies' }),
    __metadata("design:type", String)
], Assembly.prototype, "templateType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "marketprice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "supplierPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "discountPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Assembly.prototype, "pictures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Assembly.prototype, "previewPicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0, min: 0, max: 5 }),
    __metadata("design:type", Number)
], Assembly.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Assembly.prototype, "characteristics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "vendor\u0421ode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Assembly.prototype, "warrantyDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Assembly.prototype, "uploadDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Assembly.prototype, "updateDate", void 0);
Assembly = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_ASSEMBLIES })
], Assembly);
exports.Assembly = Assembly;
exports.AssemblySchema = mongoose_1.SchemaFactory.createForClass(Assembly);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAssemblyDto = void 0;
const assemblies_schema_1 = __webpack_require__(33);
class CreateAssemblyDto extends assemblies_schema_1.Assembly {
}
exports.CreateAssemblyDto = CreateAssemblyDto;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAssemblyDto = void 0;
const swagger_1 = __webpack_require__(23);
const create_assemblies_dto_1 = __webpack_require__(34);
class UpdateAssemblyDto extends (0, swagger_1.PartialType)(create_assemblies_dto_1.CreateAssemblyDto) {
}
exports.UpdateAssemblyDto = UpdateAssemblyDto;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(37);
const passport_1 = __webpack_require__(14);
const jwt_const_1 = __webpack_require__(38);
const users_module_1 = __webpack_require__(39);
const configuration_module_1 = __webpack_require__(49);
const auth_controller_1 = __webpack_require__(53);
const auth_service_1 = __webpack_require__(54);
const jwt_auth_strategy_1 = __webpack_require__(57);
const local_strategy_1 = __webpack_require__(59);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            passport_1.PassportModule,
            jwt_1.JwtModule.register(jwt_const_1.jwtConstants)
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_auth_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 37 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: `${process.env.SECRET_KEY}`,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
};


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const user_schema_1 = __webpack_require__(40);
const users_controller_1 = __webpack_require__(41);
const users_service_1 = __webpack_require__(46);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: user_schema_1.UserSettings.name, schema: user_schema_1.UserSettingsSchema }
            ])
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSettingsSchema = exports.UserSchema = exports.UserSettings = exports.User = void 0;
const mongoose_1 = __webpack_require__(7);
const roles_enum_1 = __webpack_require__(15);
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true, max: 30 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: roles_enum_1.Role, default: roles_enum_1.Role.User }),
    __metadata("design:type", typeof (_a = typeof roles_enum_1.Role !== "undefined" && roles_enum_1.Role) === "function" ? _a : Object)
], User.prototype, "role", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_USERS })
], User);
exports.User = User;
let UserSettings = class UserSettings {
};
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserSettings.prototype, "registrationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserSettings.prototype, "updateDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserSettings.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSettings.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserSettings.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], UserSettings.prototype, "allowToLogin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ ref: User.name }),
    __metadata("design:type", String)
], UserSettings.prototype, "user", void 0);
UserSettings = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false,
        collection: process.env.COLLECTION_KEY_USERS_SETTINGS
    })
], UserSettings);
exports.UserSettings = UserSettings;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSettingsSchema = mongoose_1.SchemaFactory.createForClass(UserSettings);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(6);
const roles_decorator_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(13);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const passwords_interface_1 = __webpack_require__(42);
const api_const_1 = __webpack_require__(16);
const create_user_dto_1 = __webpack_require__(43);
const update_user_dto_1 = __webpack_require__(44);
const roles_enum_1 = __webpack_require__(15);
const users_service_1 = __webpack_require__(46);
const controllerName = `${api_const_1.apiVersion}/users`;
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto, createUserSettingsDto) {
        return this.usersService.create(createUserDto, createUserSettingsDto);
    }
    findAll() {
        return this.usersService.findAllUsers();
    }
    findAllWithSettings() {
        return this.usersService.findAllUsersWithSettings();
    }
    findOne(_id) {
        return this.usersService.findOneUserById(_id);
    }
    async findOneByEmail(email) {
        const user = await this.usersService.findOneByEmail(email);
        user.password = undefined;
        return user;
    }
    update(id, updateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
    findOneUserSettings(userId) {
        return this.usersService.findOneUserSettings(userId);
    }
    async updateUserSettings(userId, updateUserSettingsDto) {
        return await this.usersService.updateUserSettings(userId, updateUserSettingsDto);
    }
    async updateUserData(userId, updateUserSettingsDto, updateUserDto) {
        return await this.usersService.updateUserData(userId, updateUserSettingsDto, updateUserDto);
    }
    async updateUserPassword(req, passwords) {
        return await this.usersService.updateUserPassword(req, passwords);
    }
    remove(id) {
        return this.usersService.removeUser(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object, typeof (_c = typeof create_user_dto_1.CreateUserSettingsDto !== "undefined" && create_user_dto_1.CreateUserSettingsDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('settings/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "findAllWithSettings", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "findOneByEmail", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_j = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UsersController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/settings/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UsersController.prototype, "findOneUserSettings", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)('/settings/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof update_user_dto_1.UpdateUserSettingsDto !== "undefined" && update_user_dto_1.UpdateUserSettingsDto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UsersController.prototype, "updateUserSettings", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)('/update/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_p = typeof update_user_dto_1.UpdateUserSettingsDto !== "undefined" && update_user_dto_1.UpdateUserSettingsDto) === "function" ? _p : Object, typeof (_q = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], UsersController.prototype, "updateUserData", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)('/password/update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_s = typeof passwords_interface_1.UserPasswords !== "undefined" && passwords_interface_1.UserPasswords) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], UsersController.prototype, "updateUserPassword", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserSettingsDto = exports.CreateUserDto = void 0;
const user_schema_1 = __webpack_require__(40);
class CreateUserDto extends user_schema_1.User {
}
exports.CreateUserDto = CreateUserDto;
class CreateUserSettingsDto extends user_schema_1.UserSettings {
}
exports.CreateUserSettingsDto = CreateUserSettingsDto;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserSettingsDto = exports.UpdateUserDto = void 0;
const mapped_types_1 = __webpack_require__(45);
const create_user_dto_1 = __webpack_require__(43);
class UpdateUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdateUserSettingsDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserSettingsDto) {
}
exports.UpdateUserSettingsDto = UpdateUserSettingsDto;


/***/ }),
/* 45 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const bcrypt = __importStar(__webpack_require__(47));
const mongoose_2 = __webpack_require__(18);
const bcrypt_1 = __webpack_require__(48);
const user_schema_1 = __webpack_require__(40);
let UsersService = class UsersService {
    constructor(userModel, userSettingsModel) {
        this.userModel = userModel;
        this.userSettingsModel = userSettingsModel;
    }
    async create(createUserDto, createUserSettingsDto) {
        try {
            const newUser = await this.userModel.create(createUserDto);
            const { _id } = newUser;
            const newUserSettings = await this.userSettingsModel.create(Object.assign(Object.assign({}, createUserSettingsDto), { user: _id }));
            return { user: newUser, userSettings: newUserSettings };
        }
        catch (_a) {
            throw new common_1.HttpException('BadRequestException', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllUsers() {
        return await this.userModel.find({});
    }
    async findAllUsersWithSettings() {
        const usersData = await this.userSettingsModel.find({}).populate('user', 'name email');
        return usersData;
    }
    async findOne(parameter) {
        return await this.userModel.findOne(parameter);
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async findOneUserById(id) {
        const user = await this.userModel.findOne({ _id: id });
        return user;
    }
    async updateUser(id, updateUserDto) {
        return await this.userModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateUserDto), { new: true });
    }
    async findOneUserSettings(userId) {
        return await this.userSettingsModel.findOne({ user: userId });
    }
    async updateUserSettings(userId, updateUserSettingsDto) {
        const userSettingsToUpdate = await this.userSettingsModel.findOne({ user: userId });
        const { id } = userSettingsToUpdate;
        return await this.userSettingsModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateUserSettingsDto), { new: true });
    }
    async updateUserData(userId, updateUserSettingsDto, updateUserDto) {
        const user = await this.updateUser(userId, updateUserDto);
        const userSettings = await this.updateUserSettings(userId, updateUserSettingsDto);
        return {
            user,
            userSettings
        };
    }
    async updateUserPassword(req, passwords) {
        const { oldPassword, newPassword } = passwords;
        try {
            const samePass = 'Passwords are the same!';
            if (oldPassword === newPassword) {
                throw new common_1.HttpException(samePass, common_1.HttpStatus.CONFLICT);
            }
            const { userId } = req.user;
            const user = await this.findOneUserById(userId);
            if (!user) {
                throw new common_1.HttpException("User wasn't found!", common_1.HttpStatus.CONFLICT);
            }
            const compareResult = await bcrypt.compare(newPassword, user.password);
            if (compareResult) {
                throw new common_1.HttpException(samePass, common_1.HttpStatus.CONFLICT);
            }
            const newPasswordHash = await bcrypt.hash(newPassword, bcrypt_1.hashRounds);
            const updatedUser = await this.updateUser(userId, {
                password: newPasswordHash
            });
            if (!updatedUser) {
                throw new common_1.HttpException("Password wasn't updated!", common_1.HttpStatus.CONFLICT);
            }
            return true;
        }
        catch (error) {
            throw new common_1.HttpException('Conflict!', common_1.HttpStatus.CONFLICT);
        }
    }
    async removeUser(id) {
        return await this.userModel.deleteOne({ _id: id }).then(async () => {
            await this.userSettingsModel.deleteOne({ user: id });
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.UserSettings.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 47 */
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hashRounds = void 0;
exports.hashRounds = 1;


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(50);
const configuration_service_1 = __webpack_require__(51);
let ConfigurationModule = class ConfigurationModule {
};
ConfigurationModule = __decorate([
    (0, common_1.Module)({
        exports: [configuration_service_1.ConfigurationService],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            })
        ],
        providers: [configuration_service_1.ConfigurationService]
    })
], ConfigurationModule);
exports.ConfigurationModule = ConfigurationModule;


/***/ }),
/* 50 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationService = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(50);
const configuration_constants_1 = __webpack_require__(52);
let ConfigurationService = class ConfigurationService {
    constructor(_configService) {
        this._configService = _configService;
        this._connectionString = this._getConnectionStringFromEnvFile();
        this._jwtExpiresIn = this._getJwtFieldsFromEnvFile();
        this._orderRef = this._getCollectionNamesFromEnvFile().ordersCollectionName;
        this._clientRef = this._getCollectionNamesFromEnvFile().clientsCollectionName;
    }
    get connectionString() {
        return this._connectionString;
    }
    get jwtExpiresIn() {
        return this._jwtExpiresIn;
    }
    get orderRef() {
        return this._orderRef;
    }
    get clientRef() {
        return this._clientRef;
    }
    _getConnectionStringFromEnvFile() {
        const connectionString = this._configService.get('MONGODB_URI');
        if (!connectionString) {
            throw new Error(configuration_constants_1.ErrorMessages.connection_string_message);
        }
        return connectionString;
    }
    _getJwtFieldsFromEnvFile() {
        const jwtExpiresIn = this._configService.get('TOKEN_EXPIRATION_TIME');
        if (!jwtExpiresIn) {
            throw new Error(configuration_constants_1.ErrorMessages.jwt_exp_message);
        }
        return jwtExpiresIn;
    }
    _getCollectionNamesFromEnvFile() {
        const ordersCollectionName = this._configService.get('COLLECTION_KEY_ORDERS');
        const clientsCollectionName = this._configService.get('COLLECTION_KEY_CLIENTS');
        if (!ordersCollectionName || !clientsCollectionName) {
            throw new Error(configuration_constants_1.ErrorMessages.collection_name_message);
        }
        return { ordersCollectionName, clientsCollectionName };
    }
};
ConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ConfigurationService);
exports.ConfigurationService = ConfigurationService;


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorMessages = void 0;
exports.ErrorMessages = {
    connection_string_message: 'No connection string has been provided in the .env file.',
    jwt_exp_message: 'No token expiration string has been provided in the .env file.',
    collection_name_message: 'No Collection name string has been provided in the .env file.'
};


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(6);
const auth_service_1 = __webpack_require__(54);
const jwt_auth_guard_1 = __webpack_require__(13);
const local_auth_guard_1 = __webpack_require__(55);
const create_user_dto_1 = __webpack_require__(43);
const users_service_1 = __webpack_require__(46);
const express_1 = __webpack_require__(56);
const api_const_1 = __webpack_require__(16);
const controllerName = `${api_const_1.apiVersion}/auth/`;
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(req) {
        return await this.authService.login(req.user);
    }
    async check(req) {
        const userId = req.user['userId'];
        const user = await this.usersService.findOneUserById(userId);
        const userSettings = await this.usersService.findOneUserSettings(userId);
        user.password = undefined;
        return {
            user,
            userSettings
        };
    }
    async register(req, userSettings) {
        return this.authService.register(req.body, userSettings);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "check", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof create_user_dto_1.CreateUserSettingsDto !== "undefined" && create_user_dto_1.CreateUserSettingsDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(37);
const users_service_1 = __webpack_require__(46);
const bcrypt = __importStar(__webpack_require__(47));
const configuration_service_1 = __webpack_require__(51);
const bcrypt_1 = __webpack_require__(48);
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            const compareResult = await bcrypt.compare(password, user.password);
            if (compareResult) {
                user.password = undefined;
                return user;
            }
            else {
                throw new common_1.HttpException('Unauthorized!', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        return null;
    }
    signJwt(payload) {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.jwtExpiresIn
        });
    }
    async login(req) {
        try {
            const userId = await req['_id'].toString();
            const role = req.role;
            const access_token = this.signJwt({ userId, role });
            return { access_token };
        }
        catch (error) {
            throw error;
        }
    }
    async register(registrationData, userSettings) {
        const hashedPassword = await bcrypt.hash(registrationData.password, bcrypt_1.hashRounds);
        const userExists = await this.userService.findOneByEmail(registrationData.email);
        if (userExists) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
        }
        else {
            try {
                const { user } = await this.userService.create(Object.assign(Object.assign({}, registrationData), { password: hashedPassword }), userSettings);
                user.password = undefined;
                return user;
            }
            catch (error) {
                throw new common_1.HttpException('Server error!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof configuration_service_1.ConfigurationService !== "undefined" && configuration_service_1.ConfigurationService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(14);
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),
/* 56 */
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(14);
const jwt_const_1 = __webpack_require__(38);
const passport_jwt_1 = __webpack_require__(58);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt_const_1.jwtConstants.secret,
            ignoreExpiration: false
        });
    }
    async validate(payload) {
        if (payload === null) {
            throw new common_1.UnauthorizedException();
        }
        return payload;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 58 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(14);
const passport_local_1 = __webpack_require__(60);
const auth_service_1 = __webpack_require__(54);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authservice) {
        super({ usernameField: 'email' });
        this.authservice = authservice;
    }
    async validate(email, password) {
        const user = await this.authservice.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 60 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-local");

/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientsModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const configuration_module_1 = __webpack_require__(49);
const clients_controller_1 = __webpack_require__(62);
const clients_service_1 = __webpack_require__(63);
const clients_schema_1 = __webpack_require__(64);
let ClientsModule = class ClientsModule {
};
ClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            mongoose_1.MongooseModule.forFeature([{ name: clients_schema_1.Client.name, schema: clients_schema_1.ClientSchema }])
        ],
        controllers: [clients_controller_1.ClientsController],
        providers: [clients_service_1.ClientsService],
        exports: [clients_service_1.ClientsService]
    })
], ClientsModule);
exports.ClientsModule = ClientsModule;


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientsController = void 0;
const common_1 = __webpack_require__(6);
const roles_decorator_1 = __webpack_require__(10);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const roles_enum_1 = __webpack_require__(15);
const api_const_1 = __webpack_require__(16);
const clients_service_1 = __webpack_require__(63);
const create_client_dto_1 = __webpack_require__(67);
const update_client_dto_1 = __webpack_require__(68);
const controllerName = `${api_const_1.apiVersion}/clients`;
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    create(createClientDto) {
        return this.clientsService.create(createClientDto);
    }
    findAll() {
        return this.clientsService.findAll();
    }
    async findByQuery(parameter, page, limit) {
        return await this.clientsService.findByQuery(parameter, page, limit);
    }
    findOne(id) {
        return this.clientsService.findOne(id);
    }
    update(id, updateClientDto) {
        return this.clientsService.update(id, updateClientDto);
    }
    remove(id) {
        return this.clientsService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_client_dto_1.CreateClientDto !== "undefined" && create_client_dto_1.CreateClientDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ClientsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/search?'),
    __param(0, (0, common_1.Query)('parameter')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ClientsController.prototype, "findByQuery", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof update_client_dto_1.UpdateClientDto !== "undefined" && update_client_dto_1.UpdateClientDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ClientsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "remove", null);
ClientsController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _a : Object])
], ClientsController);
exports.ClientsController = ClientsController;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientsService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const configuration_service_1 = __webpack_require__(51);
const mongoose_2 = __importStar(__webpack_require__(18));
const index_1 = __webpack_require__(19);
const index_2 = __webpack_require__(19);
const clients_schema_1 = __webpack_require__(64);
let ClientsService = class ClientsService {
    constructor(clientModel, configService) {
        this.clientModel = clientModel;
        this.configService = configService;
    }
    async create(createClientDto) {
        try {
            createClientDto.age = (0, index_2.calcRelToCurrentDate)(createClientDto.birthDay, true);
            return await this.clientModel.create(createClientDto);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async findByQuery(parameter, page, limit) {
        let options = {};
        if (parameter) {
            options = {
                $or: [
                    {
                        address: new RegExp(parameter, 'i')
                    },
                    {
                        clientName: new RegExp(parameter, 'i')
                    },
                    {
                        famalyName: new RegExp(parameter, 'i')
                    },
                    {
                        phone: new RegExp(parameter, 'i')
                    },
                    {
                        email: new RegExp(parameter, 'i')
                    },
                    {
                        callManaged: new RegExp(parameter, 'i')
                    }
                ]
            };
        }
        const total = await this.clientModel.count(options).exec();
        const query = this.clientModel.find(options).populate(this.configService.orderRef);
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findAll() {
        return await this.clientModel.find({}).populate(this.configService.orderRef);
    }
    async findOne(_id) {
        return await this.clientModel.findOne({ _id }).populate(this.configService.orderRef);
    }
    async update(id, updateClientDto, settings) {
        try {
            if (updateClientDto === null || updateClientDto === void 0 ? void 0 : updateClientDto.birthDay) {
                updateClientDto.age = (0, index_2.calcRelToCurrentDate)(updateClientDto === null || updateClientDto === void 0 ? void 0 : updateClientDto.birthDay, true);
            }
            const ObjectId = new mongoose_2.default.Types.ObjectId(id);
            return await this.clientModel
                .findOneAndUpdate({ _id: ObjectId }, updateClientDto, Object.assign(Object.assign({}, settings), { new: true }))
                .populate(this.configService.orderRef);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async updateMany(filter, parameter, settings) {
        return await this.clientModel
            .updateMany(filter, parameter, Object.assign(Object.assign({}, settings), { new: true }))
            .populate(this.configService.orderRef);
    }
    async remove(id) {
        return await this.clientModel.findOneAndDelete({ _id: id });
    }
};
ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(clients_schema_1.Client.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof configuration_service_1.ConfigurationService !== "undefined" && configuration_service_1.ConfigurationService) === "function" ? _b : Object])
], ClientsService);
exports.ClientsService = ClientsService;


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientSchema = exports.Client = void 0;
const mongoose_1 = __webpack_require__(7);
const orders_schema_1 = __webpack_require__(65);
let Client = class Client {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: orders_schema_1.Order.name }),
    __metadata("design:type", Array)
], Client.prototype, "orders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "clientName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "famalyName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "patronymic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Client.prototype, "birthDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Client.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Client.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", Array)
], Client.prototype, "purchasedProducts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "referal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Client.prototype, "isLegalEntity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Client.prototype, "firstContactDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '', type: 'string' }),
    __metadata("design:type", Object)
], Client.prototype, "callManaged", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Client.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Client.prototype, "createDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Client.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Client.prototype, "iin", void 0);
Client = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_CLIENTS })
], Client);
exports.Client = Client;
exports.ClientSchema = mongoose_1.SchemaFactory.createForClass(Client);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersSchema = exports.Order = void 0;
const mongoose_1 = __webpack_require__(7);
const products_schema_1 = __webpack_require__(66);
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '', ref: 'clients' }),
    __metadata("design:type", String)
], Order.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [''], ref: products_schema_1.Product.name }),
    __metadata("design:type", Array)
], Order.prototype, "orderedProducts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "purchaseDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "askedPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'delivery' }),
    __metadata("design:type", String)
], Order.prototype, "deliveryMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Order.prototype, "deliveryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '', type: String }),
    __metadata("design:type", Object)
], Order.prototype, "deliveredBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Order.prototype, "plannedDeliveryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "referal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 'cash' }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 'KZT' }),
    __metadata("design:type", String)
], Order.prototype, "paymentWallet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "paymentRemainder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "review", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '', type: String }),
    __metadata("design:type", Object)
], Order.prototype, "orderManaged", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "closeRequestInterval", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 'first-touch', type: String }),
    __metadata("design:type", Object)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Order.prototype, "firstContactDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Order.prototype, "createDate", void 0);
Order = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_ORDERS })
], Order);
exports.Order = Order;
exports.OrdersSchema = mongoose_1.SchemaFactory.createForClass(Order);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsSchema = exports.Product = void 0;
const mongoose_1 = __webpack_require__(7);
let Product = class Product {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'home_c' }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: 'orders' }),
    __metadata("design:type", Array)
], Product.prototype, "includedInOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: 'clients' }),
    __metadata("design:type", Array)
], Product.prototype, "buyers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "marketPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "supplierPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discountPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Product.prototype, "pictures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Product.prototype, "previewPicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0, min: 0, max: 5 }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "characteristics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "vendor\u0421ode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "maker", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "warrantyDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Product.prototype, "uploadDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Product.prototype, "updateDate", void 0);
Product = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_PRODUCTS })
], Product);
exports.Product = Product;
exports.ProductsSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateClientDto = void 0;
const clients_schema_1 = __webpack_require__(64);
class CreateClientDto extends clients_schema_1.Client {
}
exports.CreateClientDto = CreateClientDto;


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClientDto = void 0;
const swagger_1 = __webpack_require__(23);
const create_client_dto_1 = __webpack_require__(67);
class UpdateClientDto extends (0, swagger_1.PartialType)(create_client_dto_1.CreateClientDto) {
}
exports.UpdateClientDto = UpdateClientDto;


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesModule = void 0;
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(70);
const files_controller_1 = __webpack_require__(71);
const files_service_1 = __webpack_require__(73);
const multer_service_service_1 = __webpack_require__(76);
let FilesModule = class FilesModule {
};
FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useClass: multer_service_service_1.GridFsMulterConfigService
            })
        ],
        controllers: [files_controller_1.FilesController],
        providers: [multer_service_service_1.GridFsMulterConfigService, files_service_1.FilesService]
    })
], FilesModule);
exports.FilesModule = FilesModule;


/***/ }),
/* 70 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-express");

/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesController = void 0;
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(70);
const roles_decorator_1 = __webpack_require__(10);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const multer_interface_1 = __webpack_require__(72);
const roles_enum_1 = __webpack_require__(15);
const express_1 = __webpack_require__(56);
const api_const_1 = __webpack_require__(16);
const files_service_1 = __webpack_require__(73);
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async uploadFile(file) {
        const response = {
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            id: file.id,
            filename: file.filename,
            metadata: file.metadata,
            bucketName: file.bucketName,
            chunkSize: file.chunkSize,
            size: file.size,
            md5: file.md5,
            uploadDate: file.uploadDate,
            contentType: file.contentType
        };
        return response;
    }
    async getFileInfo(id) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred while retrieving file info', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return {
            message: 'File has been detected',
            file: file
        };
    }
    async getFile(id, res) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred while retrieving file', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res);
    }
    async downloadFile(id, res) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred while retrieving file', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res);
    }
    async deleteFile(id) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.deleteFile(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred during file deletion', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return {
            message: 'File has been deleted',
            file: file
        };
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof multer_interface_1.MulterFile !== "undefined" && multer_interface_1.MulterFile) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], FilesController.prototype, "getFileInfo", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], FilesController.prototype, "getFile", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('download/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], FilesController.prototype, "downloadFile", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], FilesController.prototype, "deleteFile", null);
FilesController = __decorate([
    (0, common_1.Controller)(`${api_const_1.apiVersion}/files`),
    __metadata("design:paramtypes", [typeof (_a = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _a : Object])
], FilesController);
exports.FilesController = FilesController;


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const mongo_gridfs_class_1 = __webpack_require__(74);
const multer_gridfs_storage_1 = __webpack_require__(75);
let FilesService = class FilesService {
    constructor(connection) {
        this.connection = connection;
        this.fileModel = new mongo_gridfs_class_1.MongoGridFS(this.connection.db, 'fs');
    }
    async readStream(id) {
        return await this.fileModel.readFileStream(id);
    }
    async findInfo(id) {
        const result = await this.fileModel
            .findById(id)
            .catch((err) => {
            throw new common_1.HttpException('File not found', common_1.HttpStatus.NOT_FOUND);
        })
            .then((result) => result);
        return {
            filename: result.filename,
            length: result.length,
            chunkSize: result.chunkSize,
            md5: result.md5,
            contentType: result.contentType
        };
    }
    async deleteFile(id) {
        try {
            const file = await this.fileModel.findById(id);
            await this.connection.db.collection('fs.chunks').deleteOne({ files_id: file._id });
            await this.connection.db.collection('fs.files').deleteOne({ _id: file._id });
            if (file)
                return true;
            return false;
        }
        catch (error) {
            throw new common_1.HttpException('File not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_gridfs_storage_1.MongooseConnectionInstance !== "undefined" && multer_gridfs_storage_1.MongooseConnectionInstance) === "function" ? _a : Object])
], FilesService);
exports.FilesService = FilesService;


/***/ }),
/* 74 */
/***/ ((module) => {

"use strict";
module.exports = require("mongo-gridfs/dist/mongo-gridfs.class");

/***/ }),
/* 75 */
/***/ ((module) => {

"use strict";
module.exports = require("multer-gridfs-storage");

/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridFsMulterConfigService = void 0;
const common_1 = __webpack_require__(6);
const multer_gridfs_storage_1 = __webpack_require__(75);
let GridFsMulterConfigService = class GridFsMulterConfigService {
    constructor() {
        this.gridFsStorage = new multer_gridfs_storage_1.GridFsStorage({
            url: process.env.MONGODB_URI,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                        filename: filename
                    };
                    resolve(fileInfo);
                });
            }
        });
    }
    createMulterOptions() {
        return {
            storage: this.gridFsStorage
        };
    }
};
GridFsMulterConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GridFsMulterConfigService);
exports.GridFsMulterConfigService = GridFsMulterConfigService;


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const products_service_1 = __webpack_require__(78);
const configuration_module_1 = __webpack_require__(49);
const clients_schema_1 = __webpack_require__(64);
const clients_service_1 = __webpack_require__(63);
const products_schema_1 = __webpack_require__(66);
const orders_controller_1 = __webpack_require__(84);
const orders_service_1 = __webpack_require__(87);
const orders_schema_1 = __webpack_require__(65);
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            mongoose_1.MongooseModule.forFeature([
                { name: orders_schema_1.Order.name, schema: orders_schema_1.OrdersSchema },
                { name: clients_schema_1.Client.name, schema: clients_schema_1.ClientSchema },
                { name: products_schema_1.Product.name, schema: products_schema_1.ProductsSchema }
            ])
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, clients_service_1.ClientsService, products_service_1.ProductsService],
        exports: [orders_service_1.OrdersService]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const clients_service_1 = __webpack_require__(63);
const clients_schema_1 = __webpack_require__(64);
const orders_schema_1 = __webpack_require__(65);
const moment = __importStar(__webpack_require__(79));
const mongoose_2 = __webpack_require__(18);
const excel_sort_1 = __webpack_require__(80);
const XLSX = __importStar(__webpack_require__(82));
const create_product_dto_1 = __webpack_require__(83);
const products_schema_1 = __webpack_require__(66);
const orderRef = 'includedInOrders';
const clientRef = 'buyers';
let ProductsService = class ProductsService {
    constructor(productModel, orderModel, clientModel, clientsService) {
        this.productModel = productModel;
        this.orderModel = orderModel;
        this.clientModel = clientModel;
        this.clientsService = clientsService;
    }
    async create(createProductDto) {
        return await this.productModel.create(createProductDto);
    }
    async findAllBy(filter, projection) {
        return await this.productModel
            .find(filter, projection)
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async findAllByWithOutPopulating(filter, projection) {
        return await this.productModel.find(filter, projection);
    }
    async findAllByNames(names) {
        return await this.productModel
            .find({ name: { $in: names } })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async findByQuery(parameter, page, limit, onlyOrdered, category, filters) {
        var _a, _b, _c, _d, _e, _f;
        let options = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (onlyOrdered && {
            includedInOrders: {
                $exists: onlyOrdered,
                $not: { $size: 0 }
            }
        })), (category && {
            category
        })), (((_a = filters.price) === null || _a === void 0 ? void 0 : _a[0]) &&
            ((_b = filters.price) === null || _b === void 0 ? void 0 : _b[1]) && {
            price: { $gte: filters.price[0], $lte: filters.price[1] }
        })), (((_c = filters.supplierPrice) === null || _c === void 0 ? void 0 : _c[0]) &&
            ((_d = filters.supplierPrice) === null || _d === void 0 ? void 0 : _d[1]) && {
            supplierPrice: {
                $gte: filters.supplierPrice[0],
                $lte: filters.supplierPrice[1]
            }
        })), (((_e = filters.marketPrice) === null || _e === void 0 ? void 0 : _e[0]) &&
            ((_f = filters.marketPrice) === null || _f === void 0 ? void 0 : _f[1]) && {
            marketPrice: {
                $gte: filters.marketPrice[0],
                $lte: filters.marketPrice[1]
            }
        })), (typeof filters.warrantyDays === 'number' && {
            warrantyDays: filters.warrantyDays
        }));
        if (parameter) {
            options = Object.assign(Object.assign({}, options), { $or: [
                    {
                        category: new RegExp(parameter, 'i')
                    },
                    {
                        name: new RegExp(parameter, 'i')
                    },
                    {
                        maker: new RegExp(parameter, 'i')
                    },
                    {
                        model: new RegExp(parameter, 'i')
                    }
                ] });
        }
        const total = await this.productModel.count(options).exec();
        const lastPage = Math.ceil(total / limit);
        const data = await this.productModel
            .find(options)
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return {
            data,
            total,
            page,
            lastPage
        };
    }
    async getMinMaxValues() {
        const minMaxValues = await this.productModel.aggregate([
            {
                $facet: {
                    min: [{ $sort: { price: 1 } }, { $limit: 1 }],
                    max: [{ $sort: { price: -1 } }, { $limit: 1 }]
                }
            },
            {
                $project: {
                    price: [{ $first: '$min.price' }, { $first: '$max.price' }],
                    marketPrice: [{ $first: '$min.marketPrice' }, { $first: '$max.marketPrice' }],
                    supplierPrice: [
                        { $first: '$min.supplierPrice' },
                        { $first: '$max.supplierPrice' }
                    ]
                }
            }
        ]);
        const warrantyVariations = await this.productModel.distinct('warrantyDays');
        return {
            minMaxValues: minMaxValues === null || minMaxValues === void 0 ? void 0 : minMaxValues[0],
            warrantyVariations
        };
    }
    async findOneById(_id) {
        return await this.productModel
            .findOne({ _id })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async updateById(id, updateProductDto) {
        console.log(id, updateProductDto);
        return await this.productModel
            .findOneAndUpdate({ _id: id }, Object.assign({}, updateProductDto), { new: true })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async updateMany(filter, parameter, settings) {
        return await this.productModel
            .updateMany(filter, parameter, Object.assign(Object.assign({}, settings), { new: true }))
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async remove(id) {
        const updatedOrders = await this.orderModel.updateMany({ orderedProducts: { $in: id } }, { $pull: { orderedProducts: { $in: id } } }, { new: false });
        if (!updatedOrders.acknowledged) {
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return await this.productModel.findOneAndRemove({ _id: id });
    }
    getDataFromExcel(file) {
        const wb = XLSX.read(file.buffer);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const products = (0, excel_sort_1.SortExcelSheetData)(data).map((i) => {
            const productsFromExcel = i === null || i === void 0 ? void 0 : i.products.map((p) => {
                const productDto = new create_product_dto_1.CreateProductDto();
                const vendorСode = (p === null || p === void 0 ? void 0 : p[0]) || 0;
                const productName = (p === null || p === void 0 ? void 0 : p[1]) || '';
                const productModel = productName.split(',')[0];
                const marketPrice = (p === null || p === void 0 ? void 0 : p[2]) || 0;
                const price = (p === null || p === void 0 ? void 0 : p[3]) || 0;
                const supplierPrice = (p === null || p === void 0 ? void 0 : p[4]) || 0;
                const warrantyDays = (p === null || p === void 0 ? void 0 : p[5]) || 0;
                const countedWarranty = moment.duration(warrantyDays, 'months').asDays();
                const maker = productModel
                    .replace(/[^a-z ]/gi, '')
                    .trim()
                    .split(' ')[0];
                productDto.vendorСode = vendorСode.toString();
                productDto.category = i === null || i === void 0 ? void 0 : i.category;
                productDto.name = productName;
                productDto.model = productModel;
                productDto.marketPrice = marketPrice;
                productDto.price = price;
                productDto.supplierPrice = supplierPrice;
                productDto.warrantyDays = countedWarranty;
                productDto.maker = maker;
                productDto.count = 1;
                return productDto;
            });
            return productsFromExcel;
        });
        return products.flat(2);
    }
    async manipulateMultipleItems(products) {
        return products.forEach(async (p) => {
            return await this.productModel.findOneAndUpdate({ name: p.name }, p, { upsert: true });
        });
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(orders_schema_1.Order.name)),
    __param(2, (0, mongoose_1.InjectModel)(clients_schema_1.Client.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _d : Object])
], ProductsService);
exports.ProductsService = ProductsService;


/***/ }),
/* 79 */
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SortExcelSheetData = void 0;
const categories_1 = __webpack_require__(81);
const SortExcelSheetData = (data) => {
    const categoryLenght = 1;
    const categoriesI = [];
    const filteredData = [];
    const cleanData = data
        .map((el) => el.filter((c) => c))
        .filter((c) => c.length > 0);
    for (let i = 0; i < cleanData.length; i++) {
        const el = cleanData[i];
        if (el.length > 0) {
            if (el.length === categoryLenght) {
                categoriesI.push(i);
            }
        }
    }
    for (let i = 0; i < categoriesI.length; i++) {
        const el = categoriesI[i];
        const nextEl = categoriesI[i + 1];
        const currentCategory = cleanData[el][0];
        const categorizedObj = {
            category: categories_1.AVAILABLE_CATEGORIES[currentCategory] || currentCategory,
            products: cleanData.slice(el + 1, nextEl - 1)
        };
        filteredData.push(categorizedObj);
    }
    const availableProducts = filteredData.filter((i) => {
        return !categories_1.CATEGORIES_TO_DELETE.includes(i.category);
    });
    return availableProducts;
};
exports.SortExcelSheetData = SortExcelSheetData;


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AVAILABLE_CATEGORIES = exports.CATEGORIES_TO_DELETE = void 0;
exports.CATEGORIES_TO_DELETE = [
    'Дилерский прайс-лист',
    'Электронные книги',
    'Смартфоны',
    'Аксессуары для мобильных устройств',
    'Чехлы и защитные пленки для смартфонов',
    'Чехлы и защитные пленки для планшетов',
    'Принтеры 3D',
    'Принтеры лазерные',
    'Принтеры лазерные цветные',
    'Многофункциональные устройства лазерные',
    'Многофункциональные устройства лазерные цветные',
    'Принтеры прочие',
    'Многофункциональные устройства струйные',
    'Камеры цифровые, видеокамеры',
    'Аксессуары к цифровым камерам',
    'Камеры цифровые (аксессуары)',
    'Карты памяти',
    'Компьютеры портативные - ноутбуки (сумки, портфели, рюкзаки)',
    'USB флеш-накопитель',
    'MP3/MP4 плееры',
    'Диктофоны',
    'Навигаторы, радар-детекторы',
    'Медиацентры',
    'Аксессуары к жестким дискам и оптическим приводам',
    'Плоттеры, дупликаторы',
    'Проекторы',
    'Проекторы(комплектующие)',
    'Экраны проекционные',
    'WEB камеры, видеорегистраторы',
    'Сигнализация и видеонаблюдение',
    'Факсимильные и телефонные аппараты',
    'Сетевое оборудование (Антенны, точки доступа)',
    'Сетевое оборудование (шкафы комутационные и т.п.)',
    'Сетевое оборудование (разъемы, кабели, розетки и т.п.)',
    'Уничтожители документов, переплетные машины',
    'CD/BD/DVD диски',
    'FDD, дисководы ZIP, устройства чтения флэш-карт',
    'Копировальные аппараты',
    'Сканеры',
    'USB HUB и Адаптеры (Irda, Bluetooth и пр.)',
    'Контроллеры',
    'Аксессуары для ИБП',
    'Аккумуляторы, батарейки и зарядные устройства',
    'Фильтры сетевые, удлинители',
    'Кабели, переходники и прочее',
    'Инструменты',
    'Чистящие средства',
    'Программное обеспечение - антивирусные программы',
    'Ламинаторы, резаки',
    'Картриджи к лазерным принтерам (оригиналы)',
    'Картриджи и ленты для матричных принтеров',
    'Картриджи к струйным принтерам (оригиналы)',
    'Картриджи к лазерным принтерам (совместимые)',
    'Картриджи для копировальной техники',
    'Тонеры к лазерным принтерам',
    'Тонеры для копировальной техники',
    'ЗИП для лазерных принтеров',
    'ЗИП для копировальной техники',
    'Аксессуары для переплетных машин/ламинаторов',
    'Бумага, фотобумага, пленки',
    'Серверы (комплектующие)',
    'Кофеварки/Соковыжималки (доставка по гг.Алматы, Астана, Караганда)',
    'Миксеры (доставка по гг.Алматы, Астана, Караганда)',
    'Освещение (лампочки)',
    'Домашние кинотеатры (доставка по гг.Алматы, Астана, Караганда)',
    'Вафельницы (доставка по гг.Алматы, Астана, Караганда)',
    'Пылесосы (доставка по гг.Алматы, Астана, Караганда)',
    'Телевизоры LCD (доставка по гг.Алматы, Астана, Караганда)',
    'Телевизоры (аксессуары)',
    'Умный дом',
    'Здоровье и гигиена',
    'Холодильники (доставка по гг.Алматы, Астана, Караганда)',
    'Чайники (доставка по гг.Алматы, Астана, Караганда)',
    'Электромясорубки (доставка по гг.Алматы, Астана, Караганда)',
    'Электроинструменты',
    'Обогреватели',
    'Канцелярские товары',
    'Электроскутера и Моноколеса',
    'Офисные кресла',
    'Конструкторы',
    'Туризм и отдых',
    'Чемоданы',
    'Сумки, рюкзаки',
    'Автотовары'
];
exports.AVAILABLE_CATEGORIES = {
    'S2.Для дома': 'home_c',
    Моноблоки: 'monoblocks_c',
    'S3.Работа и Бизнес': 'home_and_business_c',
    'S4.Игровые': 'gaming_c',
    'Компьютеры портативные - ультрабуки': 'ultrabook_c',
    'Компьютеры портативные - ноутбуки (аксессуары)': 'laptop_c',
    'Компьютеры портативные - ноутбуки (комплектующие)': 'laptop_accessories_c',
    Планшеты: 'tablet_c',
    'Компьютеры настольные (системный блок, клавиатура, мышь)': 'assembies_c',
    'Игровые приставки': 'playstation_c',
    'Мониторы жидкокристаллические': 'LCD_monitor_c',
    'Винчестеры USB и сетевые накопители': 'USD_harddrives_and_network_device_c',
    'CD-ROM, DVD-ROM, CD-RW, DVD-RW': 'CD_DVD_c',
    'Процессоры Intel 1150/1151': 'intel_CPU_old_c',
    'Процессоры AMD': 'AMD_CPU_c',
    'Процессоры Intel 1156/1366/1155-LGA/2011': 'intel_CPU_under_2011_c',
    'Процессоры Intel 1700': 'Intel_CPU_c',
    'Материнские платы Socket 1150/1151': 'motherboard_socket_c',
    'Материнские платы AMD': 'motherboard_AMD_c',
    'Материнские платы Socket 1700': 'motherboard_socket_1700_c',
    'Материнские платы с процессором': 'motherboard_w_CPU_c',
    'Память DDR3/DDR4': 'RAM_ddr3_ddr4_c',
    'Память DDR/DDR2': 'RAM_ddr_ddr2_c',
    'Память DDR5': 'RAM_ddr5_c',
    'Жесткие диски SATA': 'SATA_harddrives_c',
    'Жесткие диски SSD': 'SSD_harddrives_c',
    'Видеокарты PCI-E': 'GPU_PCI-E_c',
    'Системы охлаждения (процессоры)': 'cooler_CPU_c',
    'Системы охлаждения (корпуса, винчестеры, видеокарты и прочее)': 'cooler_c',
    'Мультимедия платы (TV-тюнеры, платы видеомонтажа)': 'multimedia_boards_c',
    'Звуковые карты и аудиооборудование': 'soundcards_c',
    'Акустические системы': 'acustic_system_c',
    'Наушники, микрофоны, звуковые гарнитуры': 'audio_headsets_c',
    'Сетевое оборудование (Маршрутизаторы, модемы)': 'network_equip_routers_c',
    'Сетевое оборудование (Сетевые карты и Адаптеры)': 'network_equip_cases_and_adapters_c',
    'Сетевое оборудование': 'network_equip_c',
    'Периферия (мыши, коврики)': 'perepherals_c',
    'Периферия (клавиатуры)': 'keyboards_c',
    'Периферия (джойстики, геймпады, рули)': 'gamepads_c',
    'Периферия (графические планшеты)': 'graphic_tablets_c',
    Корпуса: 'corps_c',
    'Блоки питания для корпусов': 'power_for_corps_c',
    'Источники бесперебойного питания, конверторы питания и стабилизаторы': 'UPS_c',
    'Программное обеспечение - операционные системы': 'software_OS_c',
    'Программное обеспечение - офисные приложения': 'software_office_c',
    'Мебель компьютерная': 'PC_forniture_c'
};


/***/ }),
/* 82 */
/***/ ((module) => {

"use strict";
module.exports = require("xlsx");

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProductDto = void 0;
const products_schema_1 = __webpack_require__(66);
class CreateProductDto extends products_schema_1.Product {
}
exports.CreateProductDto = CreateProductDto;


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(6);
const roles_decorator_1 = __webpack_require__(10);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const roles_enum_1 = __webpack_require__(15);
const api_const_1 = __webpack_require__(16);
const create_order_dto_1 = __webpack_require__(85);
const update_order_dto_1 = __webpack_require__(86);
const orders_service_1 = __webpack_require__(87);
const controllerName = `${api_const_1.apiVersion}/orders`;
let OrdersController = class OrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    create(clientId, createOrderDto) {
        return this.orderService.create(clientId, createOrderDto);
    }
    async findSortedItems(page, limit) {
        return await this.orderService.findSortedItems(page, limit);
    }
    findAll() {
        return this.orderService.findAll();
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    update(id, updateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }
    async remove(id) {
        return await this.orderService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)('/create?'),
    __param(0, (0, common_1.Query)('clientId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/filter?'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], OrdersController.prototype, "findSortedItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_order_dto_1.UpdateOrderDto !== "undefined" && update_order_dto_1.UpdateOrderDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], OrdersController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
OrdersController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object])
], OrdersController);
exports.OrdersController = OrdersController;


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderDto = void 0;
const orders_schema_1 = __webpack_require__(65);
class CreateOrderDto extends orders_schema_1.Order {
}
exports.CreateOrderDto = CreateOrderDto;


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOrderDto = void 0;
const swagger_1 = __webpack_require__(23);
const create_order_dto_1 = __webpack_require__(85);
class UpdateOrderDto extends (0, swagger_1.PartialType)(create_order_dto_1.CreateOrderDto) {
}
exports.UpdateOrderDto = UpdateOrderDto;


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const products_service_1 = __webpack_require__(78);
const mongoose_2 = __importStar(__webpack_require__(18));
const index_1 = __webpack_require__(19);
const clients_schema_1 = __webpack_require__(64);
const clients_service_1 = __webpack_require__(63);
const products_schema_1 = __webpack_require__(66);
const orders_schema_1 = __webpack_require__(65);
const clientRef = 'client';
const productRef = 'orderedProducts';
let OrdersService = class OrdersService {
    constructor(orderModel, productModel, clientModel, clientsService, productService) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.clientModel = clientModel;
        this.clientsService = clientsService;
        this.productService = productService;
    }
    async create(clientId, createOrderDto) {
        try {
            const client = await this.clientsService.findOne(clientId);
            createOrderDto.closeRequestInterval = (0, index_1.calcRelToAnyDate)(createOrderDto.firstContactDate, createOrderDto.deliveryDate, false);
            console.log('client - >', client);
            if (!client) {
                throw new common_1.HttpException('An error occurred while creating order! client', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            createOrderDto.client = clientId;
            console.log(createOrderDto);
            const products = await this.productService.findAllByWithOutPopulating({
                _id: {
                    $in: createOrderDto.orderedProducts.map((id) => new mongoose_2.default.Types.ObjectId(id))
                }
            });
            console.log('products->', products);
            if (!products || (products === null || products === void 0 ? void 0 : products.length) === 0) {
                throw new common_1.HttpException('An error occurred while creating order! product', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            const order = await this.orderModel.create(createOrderDto);
            const orderId = order._id;
            const clientUpdated = await this.clientsService.update(clientId, {
                orders: client.orders.concat(orderId)
            }, { new: true });
            console.log('order->', order);
            if (!clientUpdated) {
                throw new common_1.HttpException('An error occurred while creating order! order', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            return products.forEach(async (p) => {
                return await this.productService.updateById(p['_id'], {
                    includedInOrders: orderId,
                    buyers: [clientId]
                });
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async findSortedItems(page, limit) {
        const total = await this.orderModel.count({}).exec();
        const query = this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findAll() {
        return await this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
    }
    async findOne(_id) {
        return await this.orderModel
            .findOne({ _id })
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        const firstContactDate = (updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.firstContactDate)
            ? updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.firstContactDate
            : order === null || order === void 0 ? void 0 : order.firstContactDate;
        const deliveryDate = (updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.deliveryDate)
            ? updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.deliveryDate
            : order === null || order === void 0 ? void 0 : order.deliveryDate;
        updateOrderDto.closeRequestInterval = (0, index_1.calcRelToAnyDate)(firstContactDate, deliveryDate, false);
        return await this.orderModel
            .findOneAndUpdate({ _id: id }, Object.assign({}, updateOrderDto), { new: true })
            .populate({ path: productRef, model: this.productModel });
    }
    async updateMany(filter, parameter, settings) {
        return await this.orderModel
            .updateMany(filter, parameter, Object.assign(Object.assign({}, settings), { new: true }))
            .populate({ path: productRef, model: this.productModel });
    }
    async remove(id) {
        const ObjectId = new mongoose_2.default.Types.ObjectId(id);
        const updatedClients = await this.clientsService.updateMany({ orders: { $in: ObjectId } }, {
            $pull: {
                orders: { $in: ObjectId }
            }
        });
        if (!updatedClients.acknowledged) {
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const updatedProducts = await this.productService.updateMany({ includedInOrders: { $in: ObjectId } }, {
            $pull: {
                includedInOrders: { $in: ObjectId }
            }
        });
        if (!updatedProducts.acknowledged) {
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return await this.orderModel.findOneAndRemove({ _id: ObjectId });
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(orders_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(clients_schema_1.Client.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _d : Object, typeof (_e = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _e : Object])
], OrdersService);
exports.OrdersService = OrdersService;


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const clients_module_1 = __webpack_require__(61);
const clients_schema_1 = __webpack_require__(64);
const orders_schema_1 = __webpack_require__(65);
const products_controller_1 = __webpack_require__(89);
const products_service_1 = __webpack_require__(78);
const products_schema_1 = __webpack_require__(66);
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            clients_module_1.ClientsModule,
            mongoose_1.MongooseModule.forFeature([
                { name: products_schema_1.Product.name, schema: products_schema_1.ProductsSchema },
                { name: orders_schema_1.Order.name, schema: orders_schema_1.OrdersSchema },
                { name: clients_schema_1.Client.name, schema: clients_schema_1.ClientSchema }
            ])
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(70);
const roles_decorator_1 = __webpack_require__(10);
const role_auth_guard_1 = __importDefault(__webpack_require__(12));
const multer_interface_1 = __webpack_require__(72);
const roles_enum_1 = __webpack_require__(15);
const api_const_1 = __webpack_require__(16);
const create_product_dto_1 = __webpack_require__(83);
const update_product_dto_1 = __webpack_require__(90);
const products_filter_interface_1 = __webpack_require__(91);
const products_service_1 = __webpack_require__(78);
const controllerName = `${api_const_1.apiVersion}/products`;
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return await this.productsService.create(createProductDto);
    }
    findAll() {
        return this.productsService.findAllBy();
    }
    async findSortedItems(parameter, onlyOrdered, page, limit, category, filters) {
        return await this.productsService.findByQuery(parameter, page, limit, onlyOrdered, category, filters);
    }
    async getMinMaxValues() {
        return await this.productsService.getMinMaxValues();
    }
    async createMultipleItems(file) {
        if (file.originalname !== 'WW_dealers.xlsx') {
            throw new common_1.HttpException('Bad file provided', common_1.HttpStatus.CONFLICT);
        }
        const products = this.productsService.getDataFromExcel(file);
        return await this.productsService.manipulateMultipleItems(products);
    }
    findOne(id) {
        return this.productsService.findOneById(id);
    }
    update(id, updateProductDto) {
        return this.productsService.updateById(id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProductsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)('/search?'),
    __param(0, (0, common_1.Query)('search-by')),
    __param(1, (0, common_1.Query)('onlyOrdered', {
        transform(value) {
            return value === 'true';
        }
    })),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('category')),
    __param(5, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Number, Number, String, typeof (_e = typeof products_filter_interface_1.ProductsFilter !== "undefined" && products_filter_interface_1.ProductsFilter) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ProductsController.prototype, "findSortedItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/min-max'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ProductsController.prototype, "getMinMaxValues", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('excel-dealer-file')),
    (0, common_1.Post)('/excel'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof multer_interface_1.MulterFile !== "undefined" && multer_interface_1.MulterFile) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createMultipleItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ProductsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ProductsController.prototype, "remove", null);
ProductsController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsController);
exports.ProductsController = ProductsController;


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductDto = void 0;
const create_product_dto_1 = __webpack_require__(83);
const mapped_types_1 = __webpack_require__(45);
class UpdateProductDto extends (0, mapped_types_1.PartialType)(create_product_dto_1.CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(6);
let AppController = class AppController {
    getHello() {
        return 'hello World!';
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
exports.AppController = AppController;


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionsFilter = void 0;
const common_1 = __webpack_require__(6);
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const responseMessage = (type, message) => {
            response.status(status).json({
                statusCode: status,
                path: request.url,
                errorType: type,
                errorMessage: message
            });
        };
        if (exception.message) {
            responseMessage("Error", exception.message);
        }
        else {
            responseMessage(exception.name, exception.message);
        }
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("cc336f30b39532e533b2")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;