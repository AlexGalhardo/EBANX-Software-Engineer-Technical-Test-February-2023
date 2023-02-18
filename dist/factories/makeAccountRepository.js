"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAccountsRepository = void 0;
const InMemoryDatabaseaccountsRepository_1 = __importDefault(require("../repositories/InMemoryDatabaseaccountsRepository"));
const makeAccountsRepository = () => {
    return new InMemoryDatabaseaccountsRepository_1.default();
};
exports.makeAccountsRepository = makeAccountsRepository;
