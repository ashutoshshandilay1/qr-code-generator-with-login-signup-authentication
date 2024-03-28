import React, {useState} from 'react';
import { Box, TextField, Button } from "@mui/material";
import "../Screens/Home.css";

export default function Home() {
  const [url, setUrl] = useState('');
  const handleSubmit =(e) =>{
    e.preventDefault();

  }
  return (
    <div className='sups' >
      <form onSubmit={handleSubmit}>
       <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="" id="fullWidth" type='url' value={url} onChange={(e)=> setUrl(e.target.value)} placeholder='Enter Your Url' required  />
    </Box>
    
    </form>
    {
      url && (
        <img src={`https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${url}`}/>
      )
    }

    </div>
  );
}
