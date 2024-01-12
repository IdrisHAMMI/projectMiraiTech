import { Request, Response } from "express";
import Users, { UserDocument } from '../models/users.model'
import { CreateUserInput } from "src/schema/users.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]> 
  res: Response) {
  try {
    return await Users.create(req.body)
  } catch (e) {
    return res.status(409).send(e.message)
  }
}

// POST REQUEST TO ADD NEW USER TO DB
//router.post("/register", async (req, res) => {
//  try {
//  const { username, email, password } = req.body;
//
//
//  const salt = await bcrypt.genSalt(10)
//  //HASHES PASSWORD
//  const hashedPassword = await bcrypt.hash(password,salt)
//
//  const hashedSignup = new Users({
//    username,
//    email,
//    password: hashedPassword
//  })
//
//  const result = await hashedSignup.save();
//
//  //JWT TOKEN
//  const {_id} = await result.toJSON()
//  const token = jwt.sign({_id:_id}, "secret")
//  res.cookie("jwt", token, {
//    httpOnly: true,
//    maxAge: 24 * 60 * 60 * 1000,
//  });
//
//    
//    res.send(result);
//  } catch (err) {
//    console.log('Error in Users Save:' + JSON.stringify(err, undefined, 2));
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//});
//
//
//router.post("/login", async (req,res) => {
//  const user = await Users.findOne({email: req.body.email})
// 
//  if(!user){
//    return res.status(404).send({
//      message: "User not found"
//    });
//  }
//
//  if(!(await bcrypt.compare(req.body.password, user.password))){
//    return res.status(400).send({
//      message: "pass is no bueno"
//    });
//  }
//
//  const token = jwt.sign({_id:user._id}, "secret")
//  res.cookie("jwt",token,{
//    httpOnly:true,
//    maxAge: 24 * 60 * 60 * 1000,
//  })
//  res.send({
//    message: "bueno"
//  });
//})
//
//// GET USER INFO
//router.get("/users", async (req, res) => {
//  try {
//    const cookie = req.cookies['jwt'];
//    const claims = jwt.verify(cookie, "secret");
//
//    if (!claims) {
//      return res.status(401).send({
//        message: "unauthenticated",
//      });
//    }
//
//    const user = await Users.findOne({ _id: claims._id });
//
//    if (!user) {
//      return res.status(404).send({
//        message: "User not found",
//      });
//    }
//
//    const { password, ...data } = await user.toJSON();
//    res.send(data);
//  } catch (err) {
//    return res.status(401).send({
//      message: 'unauthenticated',
//    });
//  }
//});
//
//router.post('/logout', (req, res) => {
//  try {
//    // Clear the JWT cookie
//    res.cookie('jwt', '', { maxAge: 0, httpOnly: true });
//
//    // Optionally: perform additional cleanup or invalidate the JWT on the server
//
//    res.status(200).send({ message: 'Logout successful' });
//  } catch (error) {
//    console.error('Error during logout:', error);
//    res.status(500).send({ error: 'Internal Server Error' });
//  }
//});
//
//
//module.exports = router;