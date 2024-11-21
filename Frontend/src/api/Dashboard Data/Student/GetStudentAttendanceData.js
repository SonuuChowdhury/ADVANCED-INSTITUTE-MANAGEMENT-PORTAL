import axios from 'axios';

export default async function GetStudentAttendanceData(params) {
    const token = localStorage.getItem('aot-student-login-authorization-token');
    
    if (!token) {
        console.error('No token found in localStorage.');
        return { 'status': 403, 'message': 'Unauthorized: No token' }; 
    }

    try {
        if(params.addSubject){
            const  data  = await axios.post(
                'https://advanced-institute-management-portal.onrender.com/api/student-dashboard/attendance',
                {
                    roll: params.roll,
                    addSubject: true,
                    subjectName:params.subjectName,
                    subjectType:2
                    // 1 for theory classes 2 for lab classes 
                },
                {
                    headers: {
                        'aot-student-login-authorization-token': token,
                    },
                }
            );
    
            return data;

        }else if(params.startMonitoring){
            const  data  = await axios.post(
                'https://advanced-institute-management-portal.onrender.com/api/student-dashboard/attendance',
                {
                    roll: params.roll,
                    startMonitoring: true
                },
                {
                    headers: {
                        'aot-student-login-authorization-token': token,
                    },
                }
            );
    
            return data;
        }else{
            const data  = await axios.post(
                'https://advanced-institute-management-portal.onrender.com/api/student-dashboard/attendance',
                {
                    roll: params.roll,
                    getAttendance: true
                },
                {
                    headers: {
                        'aot-student-login-authorization-token': token,
                    },
                }
            );
    
            return data;
        }


        
    } catch (error) {
        // Handle specific HTTP errors (optional)
        if (error.response) {
            console.log(error)
            return error
        }
    }
}
