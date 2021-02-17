const jwt_decode = (token) => {
    let jsonString = decodeURIComponent(escape(window.atob(token.split('.')[1])));
    let jsonObj = JSON.parse(jsonString);
    return jsonObj;
};

export default jwt_decode;