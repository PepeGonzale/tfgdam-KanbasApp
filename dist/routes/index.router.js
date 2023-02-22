"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/api", (req, res) => {
    res.send("Bienvenido a este pedazo de tfg amigoo!!!");
    console.log("hello");
});
router.get("api/v1", (req, res) => {
    res.send("Prueba");
});
exports.default = router;
