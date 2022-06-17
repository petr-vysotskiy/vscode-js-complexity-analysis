"use strict";

class ReportFactory {
    constructor() {
        // Key: report uri as string
        // Value: FileReport
        const reports = new Map();

        function addReport(path, report) {
            reports.set(path, report);
        }

        function getReport(uri) {
            return reports.get(uri);
        }

        function clear() {
            reports.clear();
        }

        this.addReport = addReport;
        this.getReport = getReport;
        this.clear = clear;
    }
}

export default ReportFactory;
