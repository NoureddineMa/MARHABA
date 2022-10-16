// *** *** *** method :post *** *** ***
// @Route :api/auth/login
// *** acces : public ***
const Login =  (req,res) => {
    try {
        res.status(200).send(req.body)
    } catch (error) {
        res.send(error)
    }
}


// *** *** *** method :post *** *** ***
// @Route :api/auth/Register
// *** acces : public ***
const Register =  (req,res) => {
    try {
        res.status(200).send('this a register function')
    } catch (error) {
        res.send(error);
    }  
}


// *** *** *** method :post *** *** ***
// @Route :api/auth/ForgetPassword
// *** acces : public ***
const ForgetPassword =  (req,res) => {
    try {
        res.status(200).send('this a Forget Password function')
    } catch (error) {
        res.send(error)
    }   
}


// *** *** *** method :post *** *** ***
// @Route :api/auth/ResetPassword
// *** acces : public ***
const ResetPassword =  (req,res) => {
    try {
        res.status(200).send('this a reset Password function of')
    } catch (error) {
        res.send(error)
    }
    // token = req.params.id
}


module.exports = { Login, Register, ForgetPassword, ResetPassword }