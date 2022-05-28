const handleClarifaiApiCall = (req, res, success, error, API_KEY) => {
    try{
        const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
        const stub = ClarifaiStub.grpc();

        const metadata = new grpc.Metadata();
        metadata.set("authorization", `Key ${API_KEY}`);

        const { input } = req.body;

        stub.PostModelOutputs(
            {
                model_id: "a403429f2ddf4b49b307e318f00e528b",
                inputs: [{data: {image: {url: input}}}]
            },
            metadata,
            (err, response) => {
                if (err) return res.status(500).json(error(5001, err, null, {}));
        
                if (response.status.code !== 10000) {
                    return res.status(200).json(error(response.status.code, response.status.details, null, {}));
                }
                
                return res.status(200).json(success(response, {}))
            }
        );
    } catch(err) {
        return res.status(500).json(error(5001, 'Timeout server', null, {}))
    }
    
}

module.exports = {
    handleClarifaiApiCall: handleClarifaiApiCall
}