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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQ = void 0;
const amqplib_1 = require("amqplib");
class RabbitMQManager {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    connect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield (0, amqplib_1.connect)(url);
            this.channel = yield this.connection.createChannel();
            console.log("RabbitMQ Connected");
        });
    }
    sendMessage(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                throw new Error("Channel not initialized");
            }
            yield this.channel.assertQueue(queue, {
                durable: false,
            });
            this.channel.sendToQueue(queue, Buffer.from(message));
            console.log("Sent: %s", message);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                yield this.channel.close();
            }
            if (this.connection) {
                yield this.connection.close();
            }
            console.log("RabbitMQ Connection Closed");
        });
    }
}
exports.rabbitMQ = new RabbitMQManager();
