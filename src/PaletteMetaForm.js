import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import { DialogContent } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: "name", newPaletteName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("paletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }

  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.handleSubmit(newPalette);
    this.setState({ stage: "" });
  }

  render() {
    const { newPaletteName, stage } = this.state;
    const { hideForm } = this.props;

    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <DialogTitle>Pick a Palette Emoji</DialogTitle>
          <Picker onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === "name"}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new color palette. The name must be
                unique.
              </DialogContentText>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "paletteNameUnique"]}
                errorMessages={[
                  "Enter a palette name",
                  "Palette name must be unique",
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
