(function() {
    angular.module("app").factory("widgetOptionsService", widgetOptionsService);
    
    widgetOptionsService.$inject = ["dataService"];
    
    function widgetOptionsService(dataService) {
        var gridColumns = [
            {field : 'name', title: 'Nazwa'},
            {field: 'type', title: 'Rodzaj', template: '#=type.name#'},
            {field: 'jediRange', title: 'Ranga jedi', template: '#=jediRange.name#'},
            {field: 'dateOfBirth', title:'Data urodzin'},
            { template: '<kendo-button ng-click="vm.onDeleteButtonClicked(dataItem)">Usuń</kendo-button>', attributes: { style: "text-align:center;" }, width:'95px' }
            ];
             
        var readCallback = null;
        
        var widgetOptionsService = {
            getGridOptions: getGridOptions,
            getDropDownTypeOptions: getDropDownTypeOptions,
            getDatePickerOptions: getDatePickerOptions,
            getReadCallback: getReadCallback
        }
        
        return widgetOptionsService;
        
        function getGridOptions() {
            return {
                dataSource: {
                    transport: {
                        read: function (e) {
                            readCallback = e; 
                            e.success(dataService.getCharacters());                           
                        }
                    }
                },
                scrollable: false,
                columns: gridColumns
            }
        }
        
        function getDropDownTypeOptions(data) {
            return {
                dataSource: {
                    data: data
                },
                dataValuePrimitive: true,
                dataTextField: "name",
                dataValueField: "id"
            }
        }
        
        function getDatePickerOptions() {
            return {
                format: "dd.MM.yyyy"
            }
        }
        
        function getReadCallback() {
            return readCallback;
        }
    }
})();