angular.module('appModule').component('employeesList', {
  templateUrl: 'components/employees-list/employees-list.html',
  controller: EmployeesListComponent,
  controllerAs: 'EmployeesListComponentVm',
  bindings: {
    employeesList: '<',
  },
});

function EmployeesListComponent($scope) {
  const EmployeesVm = this;
  EmployeesVm.employeesListFiltered = EmployeesVm.employeesList;

  $scope.$on('broadcast-employees', function (evt, filterRegex) {
    EmployeesVm.employeesListFiltered = EmployeesVm.employeesList.map(
      (item) => {
        if (
          !(
            item?.profile?.name.match(filterRegex) ||
            item?.profile?.about.match(filterRegex)
          )
        ) return item;

        return {
          ...item,
          profile: {
            ...item.profile,
            name: item.profile.name.replace(
              filterRegex,
              '<span class="mark">$1</span>'
            ),
            about: item.profile.about.replace(
              filterRegex,
              '<span class="mark">$1</span>'
            ),
          },
        };
      }
    );
  });
}
