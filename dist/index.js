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
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const redisClient = yield (0, redis_1.createClient)()
        .on("error", (err) => console.log("Redis Client Error", err))
        .connect();
    const peopleVisited = yield redisClient.get("value");
    let newValue;
    newValue = Boolean(peopleVisited) ? Number(peopleVisited) : 0;
    const displayString = `Page visited ${newValue} times`;
    yield redisClient.set("value", newValue + 1);
    res.send(displayString);
}));
app.listen(8081, () => {
    console.log("Listening on port 8081");
});
