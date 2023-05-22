"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_cron_1 = __importDefault(require("node-cron"));
const clockInModel_1 = require("../model/clockInModel");
class Server {
    constructor(port, dURL) {
        this.port = port;
        this.dURL = dURL;
    }
    start() {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const year = currentDate.getFullYear().toString().slice(-2);
        const dbName = `clockins-${month}-${day}-${year}`;
        process.on('uncaughtException', (err) => {
            console.log('Uncaught exceptions...server shutting down 1..2..3');
            console.log(err.name, err.message);
        });
        process.on('unhandledRejection', (err) => {
            console.log('Uncaught exceptions...server shutting down 1..2..3');
            console.log(err.name, err.message);
        });
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        };
        mongoose_1.default.connect(this.dURL + dbName, options).then(() => {
            node_cron_1.default.schedule('0 0 * * 1-5', async () => {
                try {
                    // Create a new document for the current day
                    const newDocument = await clockInModel_1.ClockIn.create({
                        name: dbName,
                        visitors: []
                    });
                    console.log('New document created:', newDocument);
                }
                catch (error) {
                    console.error('Error creating document:', error);
                }
            });
        });
        app_1.default.listen(this.port, () => {
            console.log(`server is live on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map