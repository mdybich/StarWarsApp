(function() {
    angular.module("app").factory("dataService", dataService);
    
    function dataService() {
        var characters = [
            {id: 1, name: "Luke Skywalker", type: {id: 1, name: "Jedi"}, jediRange: {id: 3, name: "Mistrz jedi"}, dateOfBirth: "27.09.1980"},
            {id: 2, name: "Darth Vader", type: {id: 2, name: "Sith"}, jediRange: {id: 4, name: "Nie dotyczy"}, dateOfBirth: "04.04.1950"},
            {id: 3, name: "BB8", type: {id: 3, name: "Droid"}, jediRange: {id: 4, name: "Nie dotyczy"}, dateOfBirth: "25.12.2015"},
            {id: 4, name: "Chewbacca", type: {id: 5, name: "Wookiee"}, jediRange: {id: 4, name: "Nie dotyczy"}, dateOfBirth: "12.09.1960"},
            {id: 5, name: "Obi Wan Kenobi", type: {id: 1, name: "Jedi"}, jediRange: {id: 2, name: "Rycerz jedi"}, dateOfBirth: "02.02.1969"},
            {id: 6, name: "Jar Jar Binks", type: {id: 7, name: "Gunganin"}, jediRange: {id: 4, name: "Nie dotyczy"}, dateOfBirth: "29.12.1920"},
            {id: 7, name: "Jabba", type: {id: 8, name: "Hutt"}, jediRange: {id: 4, name: "Nie dotyczy"}, dateOfBirth: "04.08.1932"},
            {id: 8, name: "Kylo Ren", type: {id: 2, name: "Sith"}, jediRange: {id: 4, name: "Nie dotyczy"}, dateOfBirth: "14.07.1985"}
        ]
        
        var types = [
            {id: 1, name: "Jedi"},
            {id: 2, name:"Sith"},
            {id: 3, name: "Droid"},
            {id: 4, name: "Galaktyczny łotr"},
            {id: 5, name: "Wookiee"},
            {id: 6, name: "Ewok"},
            {id: 7, name: "Gunganin"},
            {id: 8, name: "Hutt"}
        ]
    
        var jediRanges = [
            {id: 1, name: "Padawan"},
            {id: 2, name: "Rycerz jedi"},
            {id: 3, name: "Mistrz jedi"}
        ]
        
        var dataService = {
            getCharacters: getCharacters,
            getTypes: getTypes,
            getJediRanges: getJediRanges,
            addCharacter: addCharacter,
            deleteCharacter: deleteCharacter
        }
        
        return dataService;
        
        //functions definitions
        
        function getCharacters() {
            return characters;
        }
        
        function getTypes() {
            return types;
        }
        
        function getJediRanges() {
            return jediRanges;
        }
        
        function deleteCharacter(id) {
            var indexToDelete = null;
            for (var i = 0 ; i < characters.length; i++) {
                if (characters[i].id === id) {
                    indexToDelete = i;
                    break;
                }
            }
            characters.splice(indexToDelete, 1);
        }
        
        function addCharacter(characterToAdd) {
            if (characterToAdd.jediRange) {
                var jediRangeId = Number(characterToAdd.jediRange);
                characterToAdd.jediRange = {
                    id: jediRangeId,
                    name: getJediRangeNameById(jediRangeId)
                }
            } else {
                 characterToAdd.jediRange = {
                    id: 4,
                    name: "Nie dotyczy"
                }
            }
            var typeId = Number(characterToAdd.type);
            
            characterToAdd.type = {
                    id: typeId,
                    name: getTypeNameById(typeId)
                }
            characterToAdd.id = getUniqueId();
            
            characters.push(angular.copy(characterToAdd));
        }
        
        function getUniqueId() {
            for (var i = 1; i < 10000; i++) {
                var isAlreadyInData = false;
                for (var j = 0; j < characters.length; j++) {
                    if (characters[j].id === i) {
                        isAlreadyInData = true;
                        break;
                    }
                }
                
                if (!isAlreadyInData) {
                    return i;
                }
            }
        }
        
        function getTypeNameById(id) {
            for (var i = 0; i < types.length; i++) {
                if(types[i].id === id) {
                    return types[i].name;
                }
            }
        }
    
        function getJediRangeNameById(id) {
            for (var i = 0; i < jediRanges.length; i++) {
                if(jediRanges[i].id === id) {
                    return jediRanges[i].name;
                }
            }
        }
    }
})();