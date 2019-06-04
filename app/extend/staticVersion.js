module.exports = {
    get staticVersion() {
        if(app.config.env!='prod'){
            return url;
        }
        return 'dev'
    }
};