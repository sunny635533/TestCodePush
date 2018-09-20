"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTransportAccountApi(host) {
    return {
        transitInfoStat: host + 'carrier/app/bill/transitInfoStat.do',
        classifyStatRecordList: host + 'carrier/app/bill/classifyStatRecordList.do'
    };
}
exports.getTransportAccountApi = getTransportAccountApi;
