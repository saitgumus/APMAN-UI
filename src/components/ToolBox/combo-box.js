import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

/**
 * combobox component
 * @param {*} props props
 */
function ComboBox(props) {
  let defaultItem = [{ name: "" }];

  let data =
    props.itemSource && props.itemSource.length > 0
      ? props.itemSource
      : defaultItem;
  let val = props.defaultValue
    ? data.find((v) => v === props.defaultValue)
    : data[0];

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={data}
        value={val ? val : data[0]}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={props.label} variant="outlined" />
        )}
        onChange={(e, value, reason) => {
          val = value;
          if (props.onSelectedItemChange && value) {
            props.onSelectedItemChange(value);
          }
        }}
        fullWidth
        disabled={props.disabled}
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
