const handleRegisterPost = async (req, res, db, bcrypt, success, error) => {

    try{
        const { username, password } = req.body
        const checkUser = await db.select('username').from('users').where('username', '=', username);        
        
        if(checkUser.length) return res.status(200).json(error(3002, 'Username is already exist!'))
        try {
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            await db.transaction(trx => {
                trx.insert({
                    hash: hashedPassword,
                    username: username
                })
                .into('login')
                .returning('username')
                .then(loginUsername => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            username: loginUsername[0].username,
                            joined: new Date()
                        })
                        .then(user => {
                            return res.status(201).json(success(user[0], {}));
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
        } catch(err){
            res.status(500).json(error(5001, 'Something went wrong:(', null, {}))
        }
             
    } catch(err) {
        res.status(500).json(error(5001, 'Something went wrong:(', null, {}))
    }
}

module.exports = {
    handleRegisterPost: handleRegisterPost
}