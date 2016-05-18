(function() {
    angular.module("app").controller("StarWarsController", StarWarsController);
    
    StarWarsController.$inject = ["dataService", "widgetOptionsService"];
    
    function StarWarsController(dataService, widgetOptionsService) {
        
        var vm = this;
        
        //public properties
        
        vm.gridOptions = null;
        vm.dropDownTypeOptions = null;
        vm.dropDownJediRangeOptions = null;
        vm.datePickerOptions = null;
        vm.characterToAdd = {
            name: null,
            type: null,
            jediRange: null,
            dateOfBirth: null
        };
        
        //public functions
        
        vm.onAddButtonClicked = onAddButtonClicked;
        vm.onDeleteButtonClicked = onDeleteButtonClicked;
        vm.isAddButtonDisabled = isAddButtonDisabled;
        vm.onTypeChange = onTypeChange;
        
        //public functions definitions
        
        function onAddButtonClicked() {
            dataService.addCharacter(vm.characterToAdd);
            refreshGrid();           
            for (var prop in vm.characterToAdd) {
                vm.characterToAdd[prop] = null;
            }            
        }
        
        function onDeleteButtonClicked(characterToDelete) {
            if (characterToDelete) {
                dataService.deleteCharacter(characterToDelete.id);
                refreshGrid();
            }
        }
        
        function isAddButtonDisabled() {
            var jediTypeId = 1;
            if (vm.characterToAdd.type == jediTypeId) {
                return !(vm.characterToAdd.name &&
                       vm.characterToAdd.type &&
                       vm.characterToAdd.jediRange &&
                       vm.characterToAdd.dateOfBirth);
            } else {
                return !(vm.characterToAdd.name &&
                       vm.characterToAdd.type &&
                       vm.characterToAdd.dateOfBirth);
            }
        }
        
        function onTypeChange() {
            if (vm.characterToAdd.type != 1) {
                if (vm.characterToAdd.jediRange) {
                    vm.characterToAdd.jediRange = null;
                }
            }
        }
        
        //private functions
        
        function refreshGrid() {
            var readCallback = widgetOptionsService.getReadCallback();
            if (readCallback) {
                vm.gridOptions.dataSource.transport.read(readCallback); //refresh grid
            } 
        }
        
        function activate() {
            vm.gridOptions = widgetOptionsService.getGridOptions();
            vm.dropDownTypeOptions = widgetOptionsService.getDropDownTypeOptions(dataService.getTypes());
            vm.dropDownJediRangeOptions = widgetOptionsService.getDropDownTypeOptions(dataService.getJediRanges());
            vm.datePickerOptions = widgetOptionsService.getDatePickerOptions();
        }
        
        activate();
    }
})();