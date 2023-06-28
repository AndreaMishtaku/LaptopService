//
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Backdrop from "./Backdrop";
import { Theme } from '@mui/material/styles';
import Table from './Table'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme:Theme ) {
  return Object.assign(
    Card(theme),
    Table(theme),
    Input(theme),
    Button(theme),
    Backdrop(theme),
  );
}
