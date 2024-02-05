import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';


const listItemsData = [
  { label: "Dashboard", icon: <DashboardIcon />, onClick: () => setFragment("Dashboard")},
  { label: "Orders", icon: <ShoppingCartIcon />, onClick: () => setFragment("Orders") },
  { label: "Customers", icon: <PeopleIcon />, onClick: () => setFragment("Customers") },
  { label: "Reports", icon: <BarChartIcon />, onClick: () => setFragment("Reports") },
  { label: "Integrations", icon: <LayersIcon />, onClick: () => setFragment("Integrations") },
];

const secondaryListItemsData = [
  { label: "Current month", icon: <AssignmentIcon />, onClick: () => setFragment("Current month") },
  { label: "Last quarter", icon: <AssignmentIcon />, onClick: () => setFragment("Last quarter") },
  { label: "Year-end sale", icon: <AssignmentIcon />, onClick: () => setFragment("Year-end sale") },
];

export const mainListItems = (
  <React.Fragment>
    {listItemsData.map((item, index) => (
      <ListItemButton key={index}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} onClick={item.onClick} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    {secondaryListItemsData.map((item, index) => (
      <ListItemButton key={index}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} onClick={item.onClick} />
      </ListItemButton>
    ))}
  </React.Fragment>
);