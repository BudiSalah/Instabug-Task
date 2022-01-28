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

  EmployeesVm.filterRegex = null;
  EmployeesVm.employeesListFiltered = [];

  (function setEmployeesListFiltered() {
    EmployeesVm.employeesListFiltered = EmployeesVm.employeesList;
  }());

  function mapEmployeesListFiltered() {
    if (!EmployeesVm.filterRegex) return;

    EmployeesVm.employeesListFiltered = EmployeesVm.employeesList.map(
      (item) => {
        if (
          !(
            item?.profile?.name.match(EmployeesVm.filterRegex) ||
            item?.profile?.about.match(EmployeesVm.filterRegex)
          )
        ) return item;

        return {
          ...item,
          profile: {
            ...item.profile,
            name: item.profile.name.replace(
              EmployeesVm.filterRegex,
              '<span class="mark">$1</span>'
            ),
            about: item.profile.about.replace(
              EmployeesVm.filterRegex,
              '<span class="mark">$1</span>'
            ),
          },
        };
      }
    );
  }

  $scope.$on('broadcast-employees', function (evt, filterRegex) {
    EmployeesVm.filterRegex = filterRegex;
    mapEmployeesListFiltered();
  });

  $scope.$on('broadcast-loadmore', function (evt, newEmployesData) {
    EmployeesVm.employeesList = newEmployesData;
    mapEmployeesListFiltered();
  });
}
