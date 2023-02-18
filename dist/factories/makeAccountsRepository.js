"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAccountsRepository = void 0;
const InMemoryDatabaseAccountsRepository_1 = __importDefault(require("../repositories/InMemoryDatabaseAccountsRepository"));
const makeAccountsRepository = () => {
    return new InMemoryDatabaseAccountsRepository_1.default();
};
exports.makeAccountsRepository = makeAccountsRepository;
