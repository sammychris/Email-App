import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  bodyDiv: {
    backgroundColor: '#fff',
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: '20px 10px',
    width: '100%',
    overflowY: 'auto',
    height: 400,
  },
  body: {
    minHeight: '360px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '66.67%',
  },
  button: {
    position: 'fixed',
    bottom: 10,
    right: 80,
  },
  smallMessage: {
    fontSize: 12,
    textAlign: 'center',
    padding: '5px',
  }
}));

export default function Viewcampaign(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };




  const { result } = {
    "result": {
        "_id": "5edfe8dfe9ad2725380e6074",
        "subject": "sammybuy, How to setup your store on Jumia.",
        "body": `<li style="text-align: center;">This is amazing</li>
        <li style="text-align: center;">This is amazing</li>
        <li style="text-align: center;">This is amazing</li>
        <li style="text-align: center;">This is amazing</li>
        <li style="text-align: center;">This is amazing</li>
        <li style="text-align: center;">This is amazing</li>
        `,
        "__v": 0
    }
  };

  return (
    <div>
      <div  className={ classes.bodyDiv }>
        {/* <div className={ classes.body } dangerouslySetInnerHTML={{ __html: result.body }} /> */}
        <div className={ classes.smallMessage }>Primary Message</div>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Message Title</Typography>
            <Typography className={classes.secondaryHeading}>
              <div style={{ fontSize:'12px', display: 'flex', justifyContent: 'space-between'}}>
                <span>Draft ICON</span>
                <span>2:30pm</span>
                <span>5days</span>
                <span>0/450</span>
              </div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={ classes.body } dangerouslySetInnerHTML={{ __html: result.body }} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <div className={ classes.smallMessage }>Follow up messages</div>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>General settings</Typography>
            <Typography className={classes.secondaryHeading}>
              <div style={{ fontSize:'12px', display: 'flex', justifyContent: 'space-between'}}>
                <span>Waiting ICON</span>
                <span>countdown starts by 2:30pm</span>
                <span>5days to complete</span>
                <span>0/450 sent</span>
              </div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={ classes.body }>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>General settings</Typography>
            <Typography className={classes.secondaryHeading}>
              <div style={{ fontSize:'12px', display: 'flex', justifyContent: 'space-between'}}>
                <span>Ongoing ICON</span>
                <span>Due in countdown</span>
                <span>3days to complete</span>
                <span>30/450 sent</span>
              </div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={ classes.body }>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>General settings</Typography>
            <Typography className={classes.secondaryHeading}>
              <div style={{ fontSize:'12px', display: 'flex', justifyContent: 'space-between'}}>
                <span>Completed ICON</span>
                <span>Thu Jul 02 2020, 2:30pm</span>
                <span>5days interval</span>
                <span>450/450 sent</span>
              </div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={ classes.body }>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className={ classes.button }>
          <Tooltip title="Send a followup message" aria-label="Send a follow-up message">
            <Link to='?c=followup'>
              <Fab style={{ marginRight: '10px' }} color="secondary" aria-label="edit">
                <AddIcon />
              </Fab>
            </Link>
          </Tooltip>
      </div>
    </div>
  );
}
