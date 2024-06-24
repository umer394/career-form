import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const CenteredFormContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 20px',
  gridTemplateColumns: '1fr',
  marginLeft: "20px",
  [theme.breakpoints.up('sm')]: {
    marginLeft: "40px",
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: "100px",
  },
  [theme.breakpoints.up('lg')]: {
    marginLeft: "180px",
  },
}));

export default function BasicFormControl() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(0);
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a PDF file.');
      return;
    }

    try {
      const googleAuth = gapi.auth2.getAuthInstance();
      const user = googleAuth.currentUser.get();
      const oauthToken = user.getAuthResponse().access_token;

      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('education', education);
      formData.append('experience', experience);
      formData.append('file', file);

      const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: ['1GqbdRQRnpb5uOvjGGyn4BqWw-URkDdvQ']
      };

      const uploadData = new FormData();
      uploadData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      uploadData.append('file', file);

      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + oauthToken }),
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file to Google Drive');
      }

      console.log('File uploaded successfully:', await response.json());
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      alert('Failed to upload file. Please try again later.');
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: 'AIzaSyAFnhqK2v6kJuBgXF2Q5i37acrq7-SxuZ4', // Replace with your API key
        clientId: '241767684569-055n8g94dkqnjiclj81kg666l0jnl55h.apps.googleusercontent.com', // Replace with your Client ID
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive.file',
        // Add the correct redirect URI here
        redirect_uri: 'http://localhost:3000/careers-form'
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
      });
    };
  
    gapi.load('client:auth2', initClient);
  }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!file) {
//       alert('Please upload a PDF file.');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('first_name', firstName);
//     formData.append('last_name', lastName);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('education', education);
//     formData.append('experience', experience);
//     formData.append('file', file);

//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }
  
   
//     try {
//     const response = await fetch('http://127.0.0.1:8000/api/upload' , {
//       method: 'POST',
//       body: formData,
//     });
    

//     if (!response.ok) {
//       throw new Error('Failed to upload file to backend');
//     }

//     console.log('File uploaded successfully:', await response.json());
//     alert('File uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading file to backend:', error);
//     alert('Failed to upload file. Please try again later.');
//   }
// }
  
  
//   useEffect(() => {
//     const initClient = () => {
//       gapi.client.init({
//         apiKey: 'AIzaSyANZPxo2qRdlEf3tTJ2REMx8OwkQO4AGN0', // Replace with your API key
//         clientId: '944016285769-asjlr5ueo7frtiakfq7eilg53i64sp2m.apps.googleusercontent.com', // Replace with your Client ID
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'] ,
//         scope: 'https://www.googleapis.com/auth/drive.file',
//       });
//     };

//     gapi.load('client:auth2', initClient);
    
//   }, []);
  

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const steps = [
    <FormControl required key="firstName" sx={{ gridColumn: 'span 1' }}>
      <Label sx={{ color: "white", fontWeight: "bold" }}>First Name</Label>
      <StyledInput placeholder="Write your first name here" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <HelperText />
    </FormControl>,
    <FormControl required key="lastName" sx={{ gridColumn: 'span 1' }}>
      <Label sx={{ color: "white", fontWeight: "bold" }}>Last Name</Label>
      <StyledInput placeholder="Write your last name here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <HelperText />
    </FormControl>,
    <FormControl required key="email" sx={{ gridColumn: 'span 1' }}>
      <Label sx={{ color: "white", fontWeight: "bold" }}>Email Address</Label>
      <StyledInput placeholder="Write your email address here" value={email} onChange={(e) => setEmail(e.target.value)} />
      <HelperText />
    </FormControl>,
    <FormControl required key="phone" sx={{ gridColumn: 'span 1' }}>
      <Label sx={{ color: "white", fontWeight: "bold" }}>Phone Number</Label>
      <StyledInput placeholder="Write your phone number here" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <HelperText />
    </FormControl>,
    <FormControl required key="education" sx={{ gridColumn: 'span 1' }}>
      <Label sx={{ color: "white", fontWeight: "bold" }}>Education</Label>
      <StyledInput placeholder="Write your education here" value={education} onChange={(e) => setEducation(e.target.value)} />
      <HelperText />
    </FormControl>,
    <FormControl required key="experience" sx={{ gridColumn: 'span 1' }}>
      <Label sx={{ color: "white", fontWeight: "bold" }}>Experience</Label>
      <StyledInput placeholder="Write your experience here" value={experience} onChange={(e) => setExperience(e.target.value)} />
      <HelperText />
    </FormControl>,
    <FormControl key="file" sx={{ gridColumn: 'span 1' }}>
      <Label sx={{ color: "white", fontWeight: "bold" }}>Upload File</Label>
      <input type="file" onChange={handleFileChange} style={{ color: "white" }} />
    
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            justifySelf: 'center',
            backgroundColor: '#d0140f',
            '&:hover': {
              backgroundColor: '#a60f0d',
            },
          }}
        >
          Submit
        </Button>

    </FormControl>,
  ];

  return (
    <CenteredFormContainer>
      {steps[step]}
      <div>
        {step > 0 && (
          <Button onClick={handlePrev} sx={{ marginRight: '10px', backgroundColor: '#d0140f', '&:hover': { backgroundColor: '#a60f0d' } }}>
            Previous
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button onClick={handleNext} sx={{ backgroundColor: '#d0140f', '&:hover': { backgroundColor: '#a60f0d' } }}>
            Next
          </Button>
        )}
      </div>
      
    </CenteredFormContainer>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: 100%;
    max-width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;

    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? white[100] : white[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[900]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[900]};
    box-shadow: 0px 1px 1px ${theme.palette.mode === 'dark' ? grey[600] : grey[20]};

    &:hover {
      border-color: ${red[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${red[400]};
      box-shadow: 0 0 0 2px ${theme.palette.mode === 'dark' ? red[600] : red[900]};
    }
  }
`,
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
      {children}
      {required ? ' *' : ''}
    </p>
  );
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-top: 30px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const red = {
  100: '#FFD7D7',
  200: '#FFAFAF',
  400: '#FF5252',
  500: '#FF0000',
  600: '#E50000',
  900: '#750000',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
  1000: '#444950',
};

const white = {
  100: '#FFFFFF',
  200: '#F5F5F5',
  400: '#E0E0E0',
  500: '#CCCCCC',
  600: '#B3B3B3',
  900: '#666666',
};
