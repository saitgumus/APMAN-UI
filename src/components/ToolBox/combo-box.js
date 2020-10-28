import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

/**
 * combobox component
 * @param {*} props props
 */
function ComboBox(props) {
  let defaultItemSource = [{ name: "" }];

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={props.itemSource ? props.itemSource : defaultItemSource}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={props.label} variant="outlined" />
        )}
        onChange={(e, value, reason) => {
          if (props.onSelectedItemChange) {
            props.onSelectedItemChange(value);
          }
        }}
        fullWidth
      />
    </div>
  );
}

ComboBox.propTypes = {
  label: PropTypes.string.isRequired,
  onSelectedItemChange: PropTypes.func,
  itemSource: PropTypes.array.isRequired,
};

export default ComboBox;
