import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './StudentLoginComponent.css';
import GetStudentData from '../../../api/Tokens/StudentLoginToken.js';
import TryAgainTopBarPopup from '../../tryAgain/tryAgain.jsx';
import Loader from '../../loader/loader.jsx'


export default function StudentLoginComponent() {
    const [rollNumber,setRollNumber]=useState("");
    const [password,setPassword]=useState("");
    const [showTopPopUp,setShowTopPopUp]=useState(false)
    const [TopPopUPValue,setTopPopUPValue]=useState(500)
    const [showPassword, setShowPassword] = useState(false);
    const [loading,SetLoading]=useState(false);

    const navigate=useNavigate();

    // Handler to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const StudentForgetPasswordHandeller=()=>{
        navigate('/login/student/forget-password')
    }

    const rollNumberChangeHandeller=(event)=>{
        setRollNumber(event.target.value)
    }

    const passwordChangeHandeller=(event)=>{
        setPassword(event.target.value)
    }

    const submitButtonHandeller=async ()=>{
        SetLoading(true);
        try{
            const fetchedStudentData= await GetStudentData(rollNumber,password);
            if(fetchedStudentData.status==500){
                setTopPopUPValue(500)
                setShowTopPopUp(true)
            }
            else if (fetchedStudentData.status==404){
                setTopPopUPValue(8)
                setShowTopPopUp(true)
            }
            else if(fetchedStudentData.status==400){
                setTopPopUPValue(400)
                setShowTopPopUp(true)
            }
            else if(fetchedStudentData.status==200){
                try{
                    // Ensure token is saved first before navigating
                    const token = fetchedStudentData.data.token;
                    localStorage.setItem('aot-student-login-authorization-token', token);

                    // Log token and navigate
                    if (localStorage.getItem('aot-student-login-authorization-token')) {
                        navigate('/student-dashboard');
                    } else {
                        console.error('Token not saved. Navigation halted.');
                    }
                }catch(error){
                    console.log('An Error Occured')
                }finally{
                    navigate('/student-dashboard');
                }
            }
        }catch(error){
            setTopPopUPValue(500)
            setShowTopPopUp(true)
        }finally{
            SetLoading(false)
        }
    }

    useEffect(() => {
        if (showTopPopUp) {
            const timer = setTimeout(() => {
                setShowTopPopUp(false);
            }, 5000); // 3.5 seconds

            // Cleanup function to clear the timer
            return () => clearTimeout(timer);
        }
    }, [showTopPopUp]);

    return <>
        {showTopPopUp && <TryAgainTopBarPopup status={TopPopUPValue}/>}
        <div className='StudentLoginContainer'>
            <h1 className='HeadingBar'>STUDENT LOGIN</h1>
            <span className="StudentLoginHeaderBorder"></span>
            <div className="StudentLoginFormArea">
                <div className="StudentLoginFormDoodle" style={{ backgroundImage: 'url(LoginPageDoodleForStudentPage.svg)' }}></div>
                <div className='StudentLoginFormContainer'>

                    <div className='StudentLoginFormInputHeaders'>ROLL NUMBER</div>
                    <input type="text" className='StudentLoginFormInputInputs' value={rollNumber} onChange={rollNumberChangeHandeller}/>

                    <div className='StudentLoginFormInputHeaders StudentLoginFormInputHeadersPassword'>PASSWORD</div>
                    <input type={showPassword ? "text" : "password"} className='StudentLoginFormInputInputs' value={password} onChange={passwordChangeHandeller}/>
                    <div className="PasswordVisiblityAndForgetPasswordArea">
                        <div className='PasswordVisibilityDiv' onClick={togglePasswordVisibility}>
                            {showPassword ? "HIDE PASSWORD" : "SHOW PASSWORD"}
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="PasswordToggleIcon"
                            />
                        </div>

                        <div className='StudentForgetPasswordDiv' onClick={StudentForgetPasswordHandeller}>Forget Password?</div>
                            


                    </div>
                    

                    <button className='StudentLoginFormSubmitButton' onClick={submitButtonHandeller}>SUBMIT</button>
                </div>
            </div>
        </div>
        {loading && <Loader/>}
    </>;
}


