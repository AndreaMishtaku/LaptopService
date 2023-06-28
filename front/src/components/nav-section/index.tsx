import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import * as Icons from '@mui/icons-material';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }: any) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item: any) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }: any) {
  const { title, path, icon, info } = item;

  const Icon = Object.keys(Icons).includes(icon) ? Icons[icon as keyof typeof Icons] : null;
  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        marginY: 1,
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{Icon && <Icon />}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} sx={{ fontSize: '1.1rem' }} />

      {info && info}
    </StyledNavItem>
  );
}
