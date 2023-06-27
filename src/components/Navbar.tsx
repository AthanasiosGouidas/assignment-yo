import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import SortSelect from './reusable/SortSelect';
import { NavbarTypes } from '../lib/types/Navbar';
import ColorChangingLogo from './reusable/ColorChangingLogo';
import DocumentationComponent from './Documentation';
import DialogComponent from './reusable/DialogComponent';

const Navbar: React.FC<NavbarTypes> = ({ setSortKey, selectedColor }) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  
  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 2rem',
        backgroundColor: 'primary.main',
        position: 'fixed',
        width: '100vw',
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <Box sx={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <ColorChangingLogo selectedColor={selectedColor} />
        <Typography sx={{marginLeft: '1rem', color: selectedColor, fontSize: '10px', position: 'absolute', bottom: '16px', right: 0 }} variant="subtitle1">Assigment</Typography>
      </Box>
      <Box sx={{display: 'flex'}}>
        <Box sx={{mx: '1rem'}}>
        <Button color="inherit" onClick={handleDialogOpen}>Docs</Button> 
        <DialogComponent 
            title="Documentation" 
            onClose={handleDialogClose} 
            selectedColor={selectedColor}
            open={open}
        >
            <DocumentationComponent />
        </DialogComponent>
        </Box>
        <Box>
        <SortSelect
          options={[
            { value: 'release_date', label: 'Release date' },
            { value: 'title', label: 'Title' },
            { value: 'vote_average', label: 'Average vote' },
            { value: 'popularity', label: 'Popularity' },
          ]}
          defaultValue='release_date'
          onChange={(value: string | number) => setSortKey(value as "release_date" | "title" | "vote_average" | "popularity")}
          selectedColorProp={selectedColor}
          labelText='Sort Movies by'
          shouldUpdateContext={true} 
        />
        </Box>
      </Box>

    </Box>
  );
}

export default Navbar;
