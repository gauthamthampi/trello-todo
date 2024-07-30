import userCollection from '../model/userDb.js'

export const createUser = async(req,res)=>{
        const { name, email, password } = req.body;
        try {
          const existingUser = await userCollection.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
          }
      
          const user = new userCollection({ name, email, password });
          await user.save();
          res.status(201).json(user);
        } catch (error) {
            console.log(error);
          res.status(400).json({ error: error.message });
        }
      };
 

      