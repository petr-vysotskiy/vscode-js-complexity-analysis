"use strict";

const HtmlReportProvider = require("./report/HtmlReportProvider.js");
const ReportFactory = require("./report/ReportFactory.js");

const reportFactory  = new ReportFactory();
const reportProvider = new HtmlReportProvider(reportFactory);

const vscode  = require("vscode");
const analyseFile = require("./analyse-file")(reportFactory);
const analyseProject = require("./analyse-project");

const registerForEditor = vscode.commands.registerTextEditorCommand;
const register = vscode.commands.registerCommand;



function activate(context) {
	const commands = [
        registerForEditor("complexityAnalysis.analyseFile", analyseFile.execute),
        register("complexityAnalysis.analyseProject", analyseProject.execute)
    ];

    commands.forEach(cmd =>
	   context.subscriptions.push(cmd)
    );

    const registration = reportProvider.register();

    context.subscriptions.push(registration);
}

exports.activate = activate;
