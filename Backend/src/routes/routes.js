import { Router } from "express";
import path from "path";
import homeRouter from "../api/HomeData/getHomeData.js";
import getStudentCredentials from "../api/CredentialsData/Student/getStudentCredentials.js";
import VerifyToken from "../middlewares/VerifyToken.js";
import GetStudentDeatils from "../api/StudentData/GetStudentData.js";
import UpdateStudentCredentials from "../api/CredentialsData/Student/UpdateStudentCredentials.js";
import ForgotPasswordHandeller from "../api/CredentialsData/Student/ForgotPassword.js";
import StudentUplaodProfile from "../api/UploadProfile/Student/StudentUplaodProfile.js";

const router = Router();

// Serving the index.html when someone requests '/'
router.get('/', (req, res) => {
    const filePath = path.resolve('public/index.html');
    res.sendFile(filePath);
});

router.get('/api/home', homeRouter); 

router.post('/login/student',getStudentCredentials);
router.post('/login/student/forgot-password',ForgotPasswordHandeller)
router.get('/api/student-dashboard', VerifyToken, GetStudentDeatils)
router.put('/api/student/change-password',VerifyToken,UpdateStudentCredentials)
router.get('/api/student/change-photo',StudentUplaodProfile)

export default router;
