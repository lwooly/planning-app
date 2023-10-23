import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { availableColors } from '../features/filters/colors';

export default function SelectComponent({colorChange}) {
  const [color, setColor] = useState('');

  const handleChange = (event) => {
    setColor(event.target.value);
    colorChange(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Colour</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="color-select"
          value={color}
          label="color"
          onChange={handleChange}
        >
            {availableColors.map((color) => <MenuItem key={color} value={color}>{color}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}