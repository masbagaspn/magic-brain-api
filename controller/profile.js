const handleProfileGet = async (req, res, db, success, error) => {

    try{
        const { id } = req.params;
        const user = await db.select('*').from('users').where({
            id: id
        })

        if(user) return res.status(200).json(success(user[0], {}))

        return res.status(200).json(error(3001, 'User not found', null, {}))
    } catch(err) {
        res.status(500).json(error(5001, 'Something went wrong:(', null, {}))
    }
}

module.exports = {
    handleProfileGet: handleProfileGet
}