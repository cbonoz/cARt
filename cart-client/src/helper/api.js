const library = (function () {
    const axios = require('axios');

    const BASE_URL = 'http://localhost:9001'
    // const BASE_URL = 'http://34.239.22.54:8080' // or your host.

    function getParsings(text) {
        const url = `${BASE_URL}/dep`
        return axios.post(url, { text });
    }

    function getReportUrl() {
        return `${BASE_URL}/report`
    }

    function getFuture() {
        const url = `${BASE_URL}/future`
        return axios.get(url)
    }

    function getSummary() {
        const url = `${BASE_URL}/summary`
        return axios.get(url)
    }

    function getRecurring() {
        const url = `${BASE_URL}/recurring`
        return axios.get(url)
    }

    function getItems() {
        const url = `${BASE_URL}/items`
        return axios.get(url)
    }

    function uploadReport(report) {
        const url = getReportUrl()
        return axios.post(url, { report });
    }

    function getSearchResults(keywords) {
        const url = `${BASE_URL}/search`
        return axios.post(url, { keywords });
    }

    return {
        getFuture,
        getSummary,
        getRecurring,
        getItems,
        getParsings,
        getReportUrl,
        uploadReport,
        getSearchResults
    }

})();
module.exports = library;

