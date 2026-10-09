"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function sync() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/portfolio_db');
    const settings = await mongoose_1.default.connection.db?.collection('sitesettings').findOne();
    if (settings && settings.home) {
        await mongoose_1.default.connection.db?.collection('profiles').updateOne({}, {
            $set: {
                avatarUrl: settings.home.profilePhotoUrl,
                fullName: settings.home.name || 'Bharathi k',
            },
        });
        console.log('Successfully synced Profile with SiteSettings in MongoDB!');
        console.log('New Profile avatarUrl:', settings.home.profilePhotoUrl);
    }
    process.exit(0);
}
sync().catch((err) => {
    console.error(err);
    process.exit(1);
});
