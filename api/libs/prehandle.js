const addPost = (req) => {
  if(req.body['query'] && req.body['query'].indexOf('addPost') !== -1){
    req.body['query'] = req.body['query'].replace(/\"img\"/g, "img");
    req.body['query'] = req.body['query'].replace(/\"thumbnail\"/g, "thumbnail");
    req.body['query'] = req.body['query'].replace(/\"main\"/g, "main");
  }
};

module.exports = {
  addPost
}