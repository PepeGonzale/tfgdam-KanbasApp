"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const config_1 = __importDefault(require("../config/config"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenSecre = config_1.default.JWT_SECRET;
const maxAge = 3 * 24 * 60 * 60;
const registerUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const saveUser = yield user_model_1.default.create({ email, password });
    const token = jsonwebtoken_1.default.sign({
        userId: saveUser._id,
        email: saveUser.email,
    }, tokenSecre, {
        expiresIn: maxAge,
    });
    return { user: { email: saveUser.email }, token };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        const auth = yield bcryptjs_1.default.compare(password, user.password);
        if (auth) {
            const token = jsonwebtoken_1.default.sign({
                userId: user._id,
                email: user.email,
            }, tokenSecre, {
                expiresIn: 72 * 60 * 60 * 1000,
            });
            return { user: { email: user.email }, token };
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.service.js.map