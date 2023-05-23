"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const home = (req, res, next) => {
    res.status(200).render('base', {
        title: 'hello'
    });
};
exports.home = home;
//# sourceMappingURL=viewsController.js.map