const handleSignInPost = async (req, res, db, bcrypt, success, error) => {

    try{

        const { username, password } = req.body;
        const checkUser = await db('login').select('username', 'hash').where('username', '=', username);

        if(!checkUser.length) return res.status(200).json(error(3003, 'Invalid username and password', null, {}))

        bcrypt.compare(password, checkUser[0].hash, async (err, result) => {
            
            if(!result) return res.status(200).json(error(3003, 'Invalid username and password'))

            const user = await db('users').select('*').where('username', '=', username)
            return res.status(200).json(success(user[0], {}))
        });

    } catch(err){
        res.status(500).json(error(5001, 'Something went wrong', null, {}))
    }
    
}

module.exports = {
    handleSignInPost: handleSignInPost
}