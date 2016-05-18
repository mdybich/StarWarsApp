//view model definition

var viewModel = kendo.observable({
    charactersList: new kendo.data.DataSource({data: dataModule.getCharacters()}),
    typesList: dataModule.getTypes(),
    isJediRangeOptionVisible: false,
    jediRangesList: dataModule.getJediRanges(),
    selectedValue: {
        name: null,
        type: null,
        jediRange: null,
        dateOfBirth: null
    },
    onTypeChanged: onTypeChanged,
    onAddButtonClicked: onAddButtonClicked
});

//binding view with viewModel

$(function() {
   kendo.bind($("#main-container"), viewModel); // :(
})

//viewmodel functions definitions

function onAddButtonClicked() {
    if (isValidData.call(this)) {
        var characterToAdd = getCharacterToAdd.call(this);
        dataModule.addCharacter(characterToAdd);
        this.charactersList.data(dataModule.getCharacters());
        clearSelectedValues.call(this);
    }
}

function onTypeChanged() {
    var jediTypeId = 1;
    
    if (this.selectedValue.type === jediTypeId) {
        this.set("isJediRangeOptionVisible", true);
    } else {
        this.set("isJediRangeOptionVisible", false);
    }
}

//helpers

function onDeleteButtonClicked(e) {
    e.preventDefault();
    var characterToDelete = this.dataItem($(e.currentTarget).closest("tr"));
    dataModule.deleteCharacter(characterToDelete.id);
    viewModel.charactersList.data(dataModule.getCharacters());
}

function isValidData() {
    var jediTypeId = 1;
    
    if (this.selectedValue.type === jediTypeId) {
        return this.selectedValue.name !== null &&
               this.selectedValue.jediRange !== null &&
               this.selectedValue.type !== null &&
               this.selectedValue.dateOfBirth !== null;
    } else {
        return this.selectedValue.name !== null &&
               this.selectedValue.type !== null &&
               this.selectedValue.dateOfBirth !== null;
    }
}

function clearSelectedValues() {
    this.selectedValue.set("name", null);
    this.selectedValue.set("type", null);
    this.selectedValue.set("jediRange", null);
    this.selectedValue.set("dateOfBirth", null);
    this.set("isJediRangeOptionVisible", false);
}

function getCharacterToAdd() {
     var characterToAdd = {
        name: this.selectedValue.get("name"),
        dateOfBirth: this.selectedValue.dateOfBirth.toLocaleDateString(),
        type: {
            id: this.selectedValue.type,
            name: dataModule.getTypeNameById(this.selectedValue.type)
        }
    }
    
    if (this.selectedValue.jediRange) {
        characterToAdd.jediRange = {
            id: this.selectedValue.jediRange,
            name: dataModule.getJediRangeNameById(this.selectedValue.jediRange)
        }
    } else {
        characterToAdd.jediRange = {
            id: 4,
            name: "Nie dotyczy"
        }
    }
    
    return characterToAdd;
}