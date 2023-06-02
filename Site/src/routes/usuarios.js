var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});


router.get("/listarUsuarios", function (req, res) {
    usuarioController.listarUsuarios(req, res);
});


router.get("/buscarEmpresa", function (req, res) {
    usuarioController.buscarEmpresa(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/listarSensores", function (req, res) {
    usuarioController.listarSensores(req, res);
});

router.post("/listarDataRegistro", function (req, res) {
    usuarioController.listarDataRegistro(req, res);
});

router.post("/gerarToken", function (req, res) {
    usuarioController.gerarToken(req, res);
});

module.exports = router;