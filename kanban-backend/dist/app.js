"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const mongo_1 = __importDefault(require("./config/mongo"));
const user_router_1 = __importDefault(require("./router/user.router"));
const board_router_1 = __importDefault(require("./router/board.router"));
const authMiddleware_1 = __importDefault(require("./utils/authMiddleware"));
const app = (0, express_1.default)();
const PORT = config_1.default.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
try {
    app.use("/api/auth", user_router_1.default);
    app.use("/api/boards", authMiddleware_1.default, board_router_1.default);
    (0, mongo_1.default)().then(data => {
        console.log("db conectada con exito");
    });
}
catch (err) {
    console.error(err);
}
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map