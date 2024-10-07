/* eslint-disable react/prop-types */
import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';


import './StudentUplaodImageComponent.css'

import UploadStudentProfilePhoto from '../../../../api/Dashboard Data/Student/UploadProfilePhoto';
import TryAgainTopBarPopup from '../../../tryAgain/tryAgain';
import Loader from '../../../loader/loader';

export default function StudentUploadImageComponent(params) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [isLoading,SetIsLoading] = useState(false)
  const [reload,SetReaload] = useState(false)

  const[ShowTopMessageBar,setShowTopMessageBar]=useState(false)
  const[TopMessageBarStatus,setTopMessageBarStatus]=useState()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (file && file.size < 2 * 1024 * 1024) {
      setSelectedFile(file);
      setFileError('');
    } else {
      setSelectedFile(null);
      setFileError('File must be less than 2MB.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  useEffect(() => {
    if (ShowTopMessageBar) {
        const timer = setTimeout(() => {
            setShowTopMessageBar(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }
  }, [ShowTopMessageBar]);

  useEffect(()=>{
    setTimeout(() => {
      reload ? window.location.reload() : null
    }, 3000);
  },[reload])


  const StudentProfileUploadHandeller = async ()=> {
    SetIsLoading(true)
    try{
      const UplaodStatus= await UploadStudentProfilePhoto(selectedFile,params.StudentData)
      if(UplaodStatus.status==500){
        console.log(UplaodStatus)
        setTopMessageBarStatus(500)
        setShowTopMessageBar(true)
      }else if(UplaodStatus.status==200){
        setTopMessageBarStatus(9)
        setShowTopMessageBar(true)
        SetReaload(true)
      }
    }catch(err){
      console.log(err)
      setTopMessageBarStatus(9)
      setShowTopMessageBar(true)
    }finally{
      SetIsLoading(false)
    }
  }

  return (
    <div className="studentUploadPopup">
      {ShowTopMessageBar ? <TryAgainTopBarPopup status={TopMessageBarStatus}/> : null}
      {isLoading ? <Loader/> : null}
      <h2>UPLOAD NEW PROFILE PHOTO</h2>
      <div
        className={`studentUploadBox ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label htmlFor="upload" className="studentUploadIcon">
          <FontAwesomeIcon icon={faImages} size="3x" />
        </label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        <p>{selectedFile ? `File is Selected: ${selectedFile.name}` : (isDragging ? 'Drop the file here' : 'Drag or Select file')}</p>
      </div>
      {fileError && <p className="studentFileError">{fileError}</p>}
      <button
        className="studentUploadBtn"
        disabled={!selectedFile}
        onClick={StudentProfileUploadHandeller}
      >
        UPLOAD
      </button>
    </div>
  );
}