"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapter_1 = require("./repositories/adapters/nodemailer/nodemailer_mail_adapter");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma_feedbacks_repository");
const submit_feedbacks_use_case_1 = require("./use-cases/submit_feedbacks_use_case");
exports.routes = express_1.default.Router();
exports.routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbackRepository = new prisma_feedbacks_repository_1.PrismaFeedbackRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbackUseCase = new submit_feedbacks_use_case_1.SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter);
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    });
    return res.status(201).send();
});
