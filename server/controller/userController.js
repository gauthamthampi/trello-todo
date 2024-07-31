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
 
export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
      