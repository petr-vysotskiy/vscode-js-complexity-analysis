"use strict";

const vscode = require("vscode");

const config = require("./config").options;
const Navigator = require("./navigator");
const HttpService = require("./http-service");
const ReportFactory = require("./report-factory");
const HtmlReportProvider = require("./html-report-provider");
const AnalyseFileCommand = require("./commands/analyse-file");
const AnalyseProjectCommand = require("./commands/analyse-project");

const AnalyseFileCmdName    = "complexityAnalysis.analyseFile";
const AnalyseProjectCmdName = "complexityAnalysis.analyseProject";

function Controller(context) {
    const reportFactory     = new ReportFactory();
    const reportProvider    = new HtmlReportProvider(reportFactory, config.navigation);
    const navigator         = new Navigator(config.navigation, reportProvider);
    const service           = new HttpService(navigator);
    const cmdAnalyseFile    = new AnalyseFileCommand(reportFactory, navigator);
    const cmdAnalyseProject = new AnalyseProjectCommand(reportFactory, navigator, service);

    function activate() {
        context.subscriptions.push(
            vscode.commands.registerTextEditorCommand(
                AnalyseFileCmdName, cmdAnalyseFile.execute));

        context.subscriptions.push(
            vscode.commands.registerCommand(
                AnalyseProjectCmdName, cmdAnalyseProject.execute));

        context.subscriptions.push(
            vscode.workspace.registerTextDocumentContentProvider(
                config.navigation.scheme, reportProvider));

        service.start();
    }

    function dispose() {
        service.stop();
    }

    this.activate = activate;
    this.dispose = dispose;
}

module.exports = Controller;
