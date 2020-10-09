import React from 'react';
import { Container, withStyles } from '@material-ui/core';


 const StyledContainer = withStyles ({
    root:{
        width: '100%',
        textAlign: 'center',
        margin: 'auto',
    }  
  })(Container)

  export default StyledContainer;