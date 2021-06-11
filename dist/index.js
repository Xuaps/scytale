"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/api/infrastructure/routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(function (req, res, next) {
    req.params;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "src/web")));
app.use('/', express_1.default.static('public'));
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(500).json({
        message: "Something went wrong",
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map