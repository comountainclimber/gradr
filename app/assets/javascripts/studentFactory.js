//= require angular
angular.module('gradr')
  .factory('StudentFactory', function StudentFactory($http) {
    
  var factory = {};

  factory.getStudents = function() {
    return $http.get('/api/students');
  };

  // factory.postStudents = function(students) {
  //   return $http.post('/api/students', students);
  // };

  return factory;

  });