import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      newColorName: "",
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("colorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("colorUnique", (value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  updateCurrentColor(newColor) {
    this.setState({
      currentColor: newColor.hex,
    });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addNewColor(newColor);
    this.setState({
      newColorName: "",
    });
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm instantValidate={false} onSubmit={this.handleSubmit}>
          <TextValidator
            className={classes.colorNameInput}
            variant="filled"
            margin="normal"
            value={newColorName}
            name="newColorName"
            placeholder="Color Name"
            onChange={this.handleChange}
            validators={["required", "colorNameUnique", "colorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already used in palette",
            ]}
          />
          <Button
            className={classes.addColor}
            variant="contained"
            color="primary"
            type="submit"
            disabled={paletteIsFull}
            style={{
              backgroundColor: paletteIsFull
                ? "rgba(0, 0, 0, 0.12)"
                : currentColor,
            }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
