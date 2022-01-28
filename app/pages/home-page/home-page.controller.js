/* eslint-disable radix */
angular.module('appModule').controller('homeController', homePageController);

function homePageController(Employees, $rootScope) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.loading = true;
  homePageVm.currentPage = 1;
  homePageVm.pages = undefined;
  homePageVm.showLoadBtn = function () {
    return parseInt(homePageVm.currentPage) <= parseInt(homePageVm.pages);
  };

  (function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.pages = data.pages;
        homePageVm.currentPage += 1;
      })
      .catch((error) => {
        // TBD: show error notification
        console.error(error);
      })
      .finally(() => {
        homePageVm.loading = false;
        homePageVm.showLoadBtn();
      });
  }());

  homePageVm.loadMoreHandler = function () {
    homePageVm.loading = true;

    Employees.loadMoreEmployees(homePageVm.currentPage)
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.currentPage += 1;
      })
      .catch((error) => {
        // TBD: show error notification
        console.error(error);
      })
      .finally(() => {
        homePageVm.loading = false;
        homePageVm.showLoadBtn();
        $rootScope.$broadcast('broadcast-loadmore', homePageVm.employees);
      });
  };

  homePageVm.filtersEmployees = function (searchText) {
    const filterRegex = new RegExp(`(${searchText})`, 'i');
    $rootScope.$broadcast('broadcast-employees', filterRegex);
  };
}
