//= require angular
angular.module('gradr', ['ngAnimate']);
angular.module('gradr')
  .controller('MyController', ['$scope', 'StudentFactory', function($scope, StudentFactory) {

    $scope.editingStudent = false;
    $scope.addingStudent = false;
    $scope.deletingStudent = true;

    $scope.students = [];
    function init() {
      StudentFactory.getStudents()
      .success(function(students){
          $scope.students = students;
          createStudentList();
        })
        .error(function(data,status,headers,config){
          $log.log(data.error + ' ' + status);
        });
    }
    init();

    function postData() {
      StudentFactory.postStudents($scope.students)
      .success(function(students){
          console.log("Success");
        })
        .error(function(data,status,headers,config){
          $log.log(data.error + ' ' + status);
        });
    }

    createStudentList = function() {
      var totalPoints = 0;
      var arrayOfGrades = [];
      for (var i=0;i<$scope.students.length; i++) {
        arrayOfGrades.push(parseInt($scope.students[i].grade));
        totalPoints += parseInt($scope.students[i].grade);
        $scope.classAverage = (totalPoints / $scope.students.length).toFixed(0);
        if ($scope.students[i].grade < 65) {
          $scope.students[i].failing = true;
        }
        else if ($scope.students[i].grade >= 95) {
          $scope.students[i].hasHighGrade = true;
        }
        else {
          $scope.students[i].failing = false;
        }
      }
      arrayOfGrades.sort(function(a, b) {
        return a - b;
      });
      $scope.minGrade = arrayOfGrades[0];
      $scope.maxGrade = arrayOfGrades[arrayOfGrades.length-1];
    };

    $scope.doSort = function(propName){
      $scope.sortBy=propName;
      $scope.reverse=!$scope.reverse;
      $scope.students = $scope.students;
    };

    $scope.editStudentInfo = function(studentNumber) {
      $scope.editingStudent = !$scope.editingStudent;
      $scope.deletingStudent = !$scope.deletingStudent;
      $scope.disableAddStudent = !$scope.disableAddStudent;
      //to ensure the form gets validated
      $scope.disableEditList = !$scope.disableEditList;
      createStudentList();
    };

    $scope.addStudent = function() {
      $scope.addingStudent = !$scope.addingStudent;
      $scope.deletingStudent = !$scope.deletingStudent;
      $scope.disableEditList = !$scope.disableEditList;
    };

    $scope.enterNewStudent = function() {
      $scope.editingStudent = false;
      $scope.deletingStudent = !$scope.deletingStudent;
      var addedStudent = {
        name: $scope.newStudent.name,
        grade: parseInt($scope.newStudent.grade)
      };
      $scope.students.push(addedStudent);
      $scope.addingStudent = !$scope.addingStudent;
      $scope.newStudent = {};
      $scope.disableEditList = !$scope.disableEditList;
      createStudentList();
    };

    $scope.deleteStudent = function(student) {
      $scope.students.splice($scope.students.indexOf(student), 1);
      createStudentList();
    };

  }]);
