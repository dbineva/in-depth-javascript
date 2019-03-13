let Ajax = {

    ajax : null,
 
    init() {
 
        return new XMLHttpRequest();  
    },
 
    get(url, callback) {
 
        let request = this.init();
        request.open("GET", url)
        request.send();
        request.onload = () => {
            console.log(request.statusCode);
            callback(JSON.parse(request.responseText));
        };
    }
 };