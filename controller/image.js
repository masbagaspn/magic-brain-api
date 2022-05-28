const handleImagePut = async (req,res, db, success, error) => {
    
    try{
        const { id, imageUrl } = req.body;
        
        const checkUrl = await db('images').select('url').where('url', '=', imageUrl);

        if(checkUrl.length && imageUrl.length) return res.status(304).json(error(4001, 'Image already uploaded', null, {}))
        
        const user = await db('users').select('*').where('id', '=', id);
        await db('images').insert({
            username: user[0].username,
            url: imageUrl
        })
        const updateEntries = await db('users').where('id', '=', id).increment('entries', 1).returning('entries')
        const entries = await updateEntries

        return res.status(201).json(success(entries[0], {}))

    } catch{
        return res.status(500).json(error(5001, 'Something went wrong:(', null, {}))
    }
}

module.exports = {
    handleImagePut: handleImagePut
}