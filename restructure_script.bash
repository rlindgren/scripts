#!/bin/bash

# build directory structure
mkdir app/src
mkdir -p app/src/{init,appframe,config,constants,data,globals,mocks,modules,system,debug,utils}
mkdir -p app/src/appframe/{content,footer,menu,navigation,notifications}
mkdir -p app/src/system/{authentication,indexing,privileges,validation}
mkdir -p app/src/data/{http,socket}
mkdir -p app/src/modules/{accountant,bills,contracts,dashboard,departments,entities,invoices,payments,projects,requests,resources,admin,setup,timesheets}

# build test directory structure
mkdir -p test/spec/{appframe,data,modules,system,utils}
mkdir -p test/spec/appframe/{content,footer,menu,navigation,notifications}
mkdir -p test/spec/system/{authentication,indexing,privileges,validation}
mkdir -p test/spec/data/{http,socket}
mkdir -p test/spec/modules/{accountant,bills,contracts,dashboard,departments,entities,invoices,payments,projects,requests,resources,tenants,timesheets}

# build views directory structure
mkdir -p app/views/appframe/{content,footer,menu,navigation,notifications}
mkdir -p app/views/system/{authentication,indexing,privileges,validation}
mkdir -p app/views/modules/{accountant,bills,contracts,dashboard,departments,entities,invoices,payments,projects,requests,resources,tenants,timesheets}
mkdir -p app/views/modals
mkdir -p app/views/debug


# move directories
git mv app/scripts/third_party app/src/lib && git commit -am 'moves app/scripts/third_party to app/src/lib'
git mv app/scripts/mocks app/src/mocks && git commit -am 'moves app/scripts/mocks to app/src/mocks'
git mv app/scripts/directives app/src/utils/directives && git commit -am 'moves app/scripts/directives to app/src/utils/directives'
git mv app/scripts/filters app/src/utils/filters && git commit -am 'moves app/scripts/filters to app/src/utils/filters'
git mv app/scripts/animations app/src/utils/animations && git commit -am 'moves app/scripts/animations to app/src/utils/animations'
git mv emails app/views && git commit -am 'moves emails to app/views/emails'


# move app init files to app/src/init
git mv app/scripts/app.js app/src/init/app.js
git mv app/src/mocks/_app.js app/src/init/appMock.js
git mv app/scripts/services/Validation.js app/src/init/validation.js
git commit -am 'builds app/init directory'


# move constants to app/src/constants
git mv app/scripts/services/{ALLOWED_VERBS,COUNTRIES,DAYS,LABELS,PERMISSIONLIST,RECURRING_PERIODS,SETTINGS,STATES,STRUCTURELIST}.js app/src/constants
git commit -am 'moves constants to app/src/constants'


# move API services, associated test suites and touch new test suites if none exists
git mv app/scripts/services/AccountSvc.js app/src/data/http/Account.js && touch test/spec/data/http/Account.js
git mv app/scripts/services/Api.js app/src/data/http/Api.js && git mv test/spec/services/Api.js test/spec/data/http/Api.js
git mv app/scripts/services/Clients.js app/src/data/http/Clients.js && touch test/spec/data/http/Clients.js
git mv app/scripts/services/Company.js app/src/data/http/Company.js && git mv test/spec/services/Company.js test/spec/data/http/Company.js
git mv app/scripts/services/Contracts.js app/src/data/http/Contracts.js && git mv test/spec/services/Contracts.js test/spec/data/http/Contracts.js
git mv app/scripts/services/Departments.js app/src/data/http/Departments.js && git mv test/spec/services/Departments.js test/spec/data/http/Departments.js
git mv app/scripts/services/DocumentsSvc.js app/src/data/http/Documents.js && touch test/spec/data/http/Documents.js
git mv app/scripts/services/IndexingSvc.js app/src/data/http/Indexing.js && touch test/spec/data/http/Indexing.js
git mv app/scripts/services/Invoices.js app/src/data/http/Invoices.js && touch test/spec/data/http/Invoices.js
git mv app/scripts/services/PayablesSvc.js app/src/data/http/Payables.js && git mv test/spec/services/Payables.js test/spec/data/http/Payables.js
git mv app/scripts/services/Projects.js app/src/data/http/Projects.js && touch test/spec/data/http/Projects.js
git mv app/scripts/services/PurchaseRequests.js app/src/data/http/Requests.js && git mv test/spec/services/purchase-requests.js test/spec/data/http/Requests.js
git mv app/scripts/services/SaasSvc.js app/src/data/http/Saas.js && git touch test/spec/data/http/Saas.js
git mv app/scripts/services/Timesheets.js app/src/data/http/Timesheets.js && git touch test/spec/data/http/Timesheets.js
git mv app/scripts/services/User.js app/src/data/http/User.js && git mv test/spec/services/User.js test/spec/data/http/User.js
git mv app/scripts/services/Vendors.js app/src/data/http/Vendors.js && touch test/spec/data/http/Vendors.js
git commit -am 'moves http API to app/src/data/http'
git mv app/scripts/services/kSignalRSvc.js app/src/data/socket/SignalR.js && touch test/spec/data/socket/SignalR.js
git commit -am 'moves socket API to app/src/data/socket'
git mv app/scripts/services/Data.js app/src/data/http/Data.js && git mv test/spec/services/Data.js test/spec/data/Data.js
git mv app/scripts/services/Datastore.js app/src/data/http/Datastore.js && git mv test/spec/services/Datastore.js test/spec/data/Datastore.js
git mv app/scripts/services/kDataCacheSvc.js app/src/data/http/DataCache.js && touch test/spec/data/DataCache.js
git mv app/scripts/services/Persist.js app/src/data/http/Persist.js && git mv test/spec/services/Persist.js test/spec/data/Persist.js
git commit -am 'moves data storage API to app/src/data'


# MODULES
# accountant
git mv app/scripts/controllers/accountant.js app/src/modules/accountant/accountantCtrl.js && git mv test/spec/controllers/accountant.js test/spec/modules/accountant/accountantCtrl.js
git mv app/scripts/states/accountant.js app/src/modules/accountant/states.js

# bills
git mv app/scripts/controllers/payable-detail.js app/src/modules/bills/payableDetailCtrl.js && git mv test/spec/controllers/payable-detail.js test/spec/modules/bills/payableDetailCtrl.js
git mv app/scripts/controllers/payable-manage.js app/src/modules/bills/payableManageCtrl.js && git mv test/spec/controllers/payable-manage.js test/spec/modules/bills/payableManageCtrl.js
git mv app/scripts/states/bills.js app/src/modules/bills/states.js

# contracts
git mv app/scripts/services/Contract.js app/src/modules/contracts/Contract.js && git mv test/spec/services/Contract.js test/spec/modules/contracts/Contract.js
git mv app/scripts/services/Deliverable.js app/src/modules/contracts/Deliverable.js && git mv test/spec/services/Deliverable.js test/spec/modules/contracts/Deliverable.js
git mv app/scripts/controllers/contracts.js app/src/modules/contracts/contractsCtrl.js && git mv test/spec/controllers/contracts.js test/spec/modules/contracts/contractsCtrl.js
git mv app/scripts/controllers/contracts_create.js app/src/modules/contracts/contractsCreateCtrl.js && git mv test/spec/controllers/contracts_create.js test/spec/modules/contracts/contractsCreateCtrl.js
git mv app/scripts/controllers/contracts_create_build.js app/src/modules/contracts/contractsCreateBuildCtrl.js && git mv test/spec/controllers/contracts_create_build.js test/spec/modules/contracts/contractsCreateBuildCtrl.js
git mv app/scripts/controllers/contracts_create_setup.js app/src/modules/contracts/contractsCreateSetupCtrl.js && git mv test/spec/controllers/contracts_create_setup.js test/spec/modules/contracts/contractsCreateSetupCtrl.js
git mv app/scripts/controllers/contracts_manage.js app/src/modules/contracts/contractsManageCtrl.js && git mv test/spec/controllers/contracts_manage.js test/spec/modules/contracts/contractsManageCtrl.js
git mv app/scripts/states/contracts.js app/src/modules/contracts/states.js

# dashboard
git mv app/scripts/controllers/dashboard.js app/src/modules/dashboard/dashboardCtrl.js && git mv test/spec/controllers/dashboard.js test/spec/modules/dashboard/dashboardCtrl.js
git mv app/scripts/services/dashboardSvc.js app/src/modules/dashboard/dashboardSvc.js && git mv test/spec/services/dashboardSvc.js test/spec/modules/dashboard/dashboardSvc.js
git mv app/scripts/states/dashboard.js app/src/modules/dashboard/states.js

# departments
git mv app/scripts/controllers/departments.js app/src/modules/departments/departmentsCtrl.js && git mv test/spec/controllers/departments.js test/spec/modules/departments/departmentsCtrl.js
git mv app/scripts/states/departments.js app/src/modules/departments/states.js

# entities
git mv app/scripts/services/EntMan.js app/src/entities/EntityManager.js
# clients
git mv app/scripts/controllers/clients.js app/src/modules/clients/clientsCtrl.js && git mv test/spec/controllers/clients.js test/spec/modules/clients/clientsCtrl.js
git mv app/scripts/controllers/clients_create.js app/src/modules/clients/clientsCreateCtrl.js && git mv test/spec/controllers/clients_create.js test/spec/modules/clients/clientsCreateCtrl.js
git mv app/scripts/controllers/clients_edit.js app/src/modules/clients/clientsEditCtrl.js && git mv test/spec/controllers/clients_edit.js test/spec/modules/clients/clientsEditCtrl.js
git mv app/scripts/states/clients.js app/src/modules/clients/states.js
# vendors
git mv app/scripts/controllers/vendors.js app/src/modules/vendors/vendorsCtrl.js && git mv test/spec/controllers/vendors.js test/spec/modules/vendors/vendorsCtrl.js
git mv app/scripts/controllers/vendors_create.js app/src/modules/vendors/vendorsCreateCtrl.js && git mv test/spec/controllers/vendors_create.js test/spec/modules/vendors/vendorsCreateCtrl.js
git mv app/scripts/controllers/vendors_edit.js app/src/modules/vendors/vendorsEditCtrl.js && git mv test/spec/controllers/vendors_edit.js test/spec/modules/vendors/vendorsEditCtrl.js
git mv app/scripts/states/vendors.js app/src/modules/vendors/states.js

# invoices
git mv app/scripts/controllers/billables.js app/src/modules/invoices/billablesCtrl.js && git mv test/spec/controllers/billables.js test/spec/modules/invoices/billablesCtrl.js
git mv app/scripts/controllers/receivables-create.js app/src/modules/invoices/receivablesCreateCtrl.js && git mv test/spec/controllers/receivables-create.js test/spec/modules/invoices/receivablesCtrl.js
git mv app/scripts/controllers/receivables-manage.js app/src/modules/invoices/receivablesManageCtrl.js && touch test/spec/modules/invoices/receivablesManageCtrl.js
git mv app/scripts/states/invoices.js app/src/modules/invoices/states.js

# payments
git mv app/scripts/controllers/kPaymentsManageCtrl.js app/src/modules/payments/paymentsManageCtrl.js && touch test/spec/modules/payments/paymentsManageCtrl.js
git mv app/scripts/states/payments.js app/src/modules/payments/states.js

# projects
git mv app/scripts/controllers/projects.js app/src/modules/projects/projectsCtrl.js && git mv test/spec/controllers/projects.js test/spec/modules/projects/projectsCtrl.js
git mv app/scripts/controllers/projects_edit.js app/src/modules/projects/projectsEditCtrl.js && git mv test/spec/controllers/projects_edit.js test/spec/modules/projects/projectsEditCtrl.js
git mv app/scripts/controllers/projects_create.js app/src/modules/projects/projectsCreateCtrl.js && git mv test/spec/controllers/projects_create.js test/spec/modules/projects/projectsCreateCtrl.js
git mv app/scripts/states/projects.js app/src/modules/projects/states.js

# requests
git mv app/scripts/controllers/purchase-request-create.js app/src/modules/requests/requestCreateCtrl.js && git mv test/spec/controllers/purchase-create.js test/spec/modules/requests/requestCreateCtrl.js
git mv app/scripts/controllers/purchase-request-manage.js app/src/modules/requests/requestManageCtrl.js && git mv test/spec/controllers/purchase-request-manage.js test/spec/modules/requests/requestManageCtrl.js
git mv app/scripts/controllers/purchase-request-review-detail.js app/src/modules/requests/requestReviewDetailCtrl.js && git mv test/spec/controllers/purchase-request-review-detail.js test/spec/modules/requests/requestReviewDetailCtrl.js
git mv app/scripts/states/requests.js app/src/modules/requests/states.js

# resources
git mv app/scripts/controllers/resourceScheduleDayCtrl.js app/src/modules/resources/resourceScheduleDayCtrl.js && git mv test/spec/controllers/resource_schedule_day.js test/spec/modules/resources/resourceScheduleDayCtrl.js
git mv app/scripts/controllers/ResourceScheduleDaySvc.js app/src/modules/resources/resourceScheduleDaySvc.js && git mv test/spec/controllers/ResourceScheduleDaySvc.js test/spec/modules/resources/resourceScheduleDaySvc.js
git mv app/scripts/controllers/kSchedulesCtrl.js app/src/modules/resources/resourcesScheduleWeekCtrl.js && touch test/spec/modules/resources/resourcesScheduleWeekCtrl.js
git mv app/scripts/states/resources.js app/src/modules/resources/states.js

# tenants
# admin
git mv app/scripts/controllers/kAdminCtrl.js app/src/modules/admin/adminCtrl.js && touch test/spec/modules/admin/adminCtrl.js
git mv app/scripts/controllers/kAdminIndexCtrl.js app/src/modules/admin/adminIndexCtrl.js && touch test/spec/modules/admin/adminIndexCtrl.js
git mv app/scripts/controllers/kAdminCompanyInfoCtrl.js app/src/modules/admin/adminCompanyInfoCtrl.js && touch test/spec/modules/admin/adminCompanyInfoCtrl.js
git mv app/scripts/controllers/kAdminGeneralInfoCtrl.js app/src/modules/admin/adminGeneralInfoCtrl.js && touch test/spec/modules/admin/adminGeneralInfoCtrl.js
git mv app/scripts/controllers/kAdminRatesCtrl.js app/src/modules/admin/adminRatesCtrl.js && touch test/spec/modules/admin/adminRatesCtrl.js
git mv app/scripts/controllers/kAdminStructureCtrl.js app/src/modules/admin/adminStructureCtrl.js && touch test/spec/modules/admin/adminStructureCtrl.js
git mv app/scripts/controllers/kAdminUsersCtrl.js app/src/modules/admin/adminUsersCtrl.js && touch test/spec/modules/admin/adminUsersCtrl.js
git mv app/scripts/states/admin.js app/src/modules/admin/states.js
# setup
git mv app/scripts/controllers/setup.js app/src/modules/setup/setupCtrl.js && mv test/spec/controllers/setup.js test/spec/modules/setup/setupCtrl.js
git mv app/scripts/controllers/setup-begin.js app/src/modules/setup/setupBeginCtrl.js && mv test/spec/controllers/setup-begin.js test/spec/modules/setup/setupBeginCtrl.js
git mv app/scripts/controllers/setup-company.js app/src/modules/setup/setupCompanyInfoCtrl.js && mv test/spec/controllers/setup-company.js test/spec/modules/setup/setupCompanyCtrl.js
git mv app/scripts/controllers/setup-complete.js app/src/modules/setup/setupCompleteCtrl.js && mv test/spec/controllers/setup-complete.js test/spec/modules/setup/setupCompleteCtrl.js
git mv app/scripts/controllers/setup-general.js app/src/modules/setup/setupGeneralCtrl.js && mv test/spec/controllers/setup-general.js test/spec/modules/setup/setupGeneralCtrl.js
git mv app/scripts/controllers/setup-index.js app/src/modules/setup/setupIndexCtrl.js && mv test/spec/controllers/setup-index.js test/spec/modules/setup/setupIndexCtrl.js
git mv app/scripts/controllers/setup-structure-time.js app/src/modules/setup/setupStructureTimeCtrl.js && mv test/spec/controllers/setup-structure-time.js test/spec/modules/setup/setupStructureTimeCtrl.js
git mv app/scripts/controllers/setup-structure.js app/src/modules/setup/setupStrutureCtrl.js && mv test/spec/controllers/setup-structure.js test/spec/modules/setup/setupStructureCtrl.js
git mv app/scripts/controllers/setup-users.js app/src/modules/setup/setupUsersCtrl.js && mv test/spec/controllers/setup-users.js test/spec/modules/setup/setupUsersCtrl.js
git mv app/scripts/controllers/setup-quickbooks.js app/src/modules/setup/setupQuickbooksCtrl.js && touch test/spec/modules/setup/setupQuickbooksCtrl.js
git mv app/scripts/states/setup.js app/src/modules/setup/states.js

# timesheets
git mv app/scripts/controllers/timetracker.js app/src/modules/timesheets/timesheetsCtrl.js && mv test/spec/controllers/timetracker.js test/spec/modules/timesheets/timesheetsCtrl.js
git mv app/scripts/controllers/timetracker_entry.js app/src/modules/timesheets/timesheetsEntryCtrl.js && mv test/spec/controllers/timetracker_entry.js test/spec/modules/timesheets/timesheetsEntryCtrl.js
git mv app/scripts/controllers/timetracker_review.js app/src/modules/timesheets/timesheetsReviewCtrl.js && mv test/spec/controllers/timetracker_review.js test/spec/modules/timesheets/timesheetsReviewCtrl.js
git mv app/scripts/services/CalendarGrid.js app/src/modules/timesheets/CalendarGrid.js && mv test/spec/services/CalendarGrid.js test/spec/modules/timesheets/CalendarGrid.js
git mv app/scripts/services/Timesheet.js app/src/modules/timesheets/Timesheet.js && mv test/spec/services/Timesheet.js test/spec/modules/timesheets/Timesheet.js
git mv app/scripts/directives/timesheet.js app/src/modules/timesheets/kTimesheet.js && mv test/spec/directives/timesheet.js test/spec/modules/timesheets/kTimesheet.js
git mv app/scripts/states/timesheets.js app/src/modules/timesheets/states.js
git commit -am 'moves module-related services, controllers, directives to respective directories'


# move appframe src to respective directories
# content

# footer

# menu
git mv app/scripts/controllers/menuPanelCtrl.js app/src/appframe/menu/menuPanelCtrl.js && touch test/spec/appframe/menu/menuPanelCtrl.js
git mv app/scripts/services/menuPanelSvc.js app/src/appframe/menu/menuPanelSvc.js && touch test/spec/appframe/menu/menuPanelSvc.js
git mv app/scripts/directives/kMenuPanelToggle.js app/src/appframe/menu/kMenuPanelToggle.js && touch test/spec/appframe/menu/kMenuPanelToggle.js
git mv app/scripts/directives/kMenuPanelItem.js app/src/appframe/menu/kMenuPanelItem.js && touch test/spec/appframe/menu/kMenuPanelItem.js

# navigation
git mv app/scripts/controllers/bsPopover.js app/src/appframe/navigation/popoverCtrl.js && mv test/spec/controllers/bsPopover.js test/spec/appframe/navigation/popoverCtrl.js

# notifications
git mv app/scripts/controllers/notificationsCtrl.js app/src/appframe/menu/menuPanelCtrl.js && touch test/spec/appframe/menu/menuPanelCtrl.js
git commit -am 'moves appframe-related services, controllers, directives to respective directories'


# move views to respective directories in app/views
# accountant
git mv app/views/accountant.html app/views/modules/accountant/views/accountant-index.html

# bills
git mv app/views/payable-detail.html app/views/modules/bills/views/payable-detail.html
git mv app/views/payable-manage.html app/views/modules/bills/views/payable-manage.html

# contracts


# dashboard
git mv app/views/dashboard.html app/views/modules/dashboard/views/dashboard.html

# departments


# entities
# clients
git mv app/views/clients.html app/views/modules/clients/views/clients-index.html
git mv app/views/clients_create.html app/views/modules/clients/views/clients-create.html
git mv app/views/vendors.html app/views/modules/vendors/views/vendors-index.html
git mv app/views/vendors_create.html app/views/modules/vendors/views/vendors-create.html
git mv app/views/vendors_edit.html app/views/modules/vendors/views/vendors-edit.html
# vendors
git mv app/views/clients.html app/views/modules/clients/views/clients-index.html
git mv app/views/clients_create.html app/views/modules/clients/views/clients-create.html
git mv app/views/vendors.html app/views/modules/vendors/views/vendors-index.html
git mv app/views/vendors_create.html app/views/modules/vendors/views/vendors-create.html
git mv app/views/vendors_edit.html app/views/modules/vendors/views/vendors-edit.html

# invoices


# payments
git mv app/views/payments-manage.html app/views/modules/payments/views/payments-manage.html

# projects
git mv app/views/projects.html app/views/modules/projects/views/projects-index.html
git mv app/views/projects_create.html app/views/modules/projects/views/projects-create.html
git mv app/views/projects_edit.html app/views/modules/projects/views/projects-edit.html

# requests


# resources
git mv app/views/resource-schedules.html app/views/modules/resources/resource-schedule-day.html
git mv app/views/schedules.html app/views/modules/resources/resources-schedule-week.html

# tenants
# admin
git mv app/views/admin.html app/views/modules/admin/admin.html
git mv app/views/admin-index.html app/views/modules/admin/admin-index.html
git mv app/views/admin-company-info.html app/views/modules/admin/admin-company-info.html
git mv app/views/admin-general-info.html app/views/modules/admin/admin-general-info.html
git mv app/views/admin-rates.html app/views/modules/admin/admin-rates.html
git mv app/views/admin-users.html app/views/modules/admin/admin-users.html
git mv app/views/admin-structure.html app/views/modules/admin/admin-structure.html
# setup
git mv app/views/setup.html app/views/modules/setup/setup.html
git mv app/views/setup-index.html app/views/modules/setup/setup-index.html
git mv app/views/setup-company.html app/views/modules/setup/setup-company.html
git mv app/views/setup-general.html app/views/modules/setup/setup-general.html
git mv app/views/setup-begin.html app/views/modules/setup/setup-begin.html
git mv app/views/setup-nav.html app/views/modules/setup/setup-nav.html
git mv app/views/setup-users.html app/views/modules/setup/setup-users.html
git mv app/views/setup-structure.html app/views/modules/setup/setup-structure.html
git mv app/views/setup-structure-time.html app/views/modules/setup/setup-structure-time.html
git mv app/views/setup-quickbooks.html app/views/modules/setup/setup-quickbooks.html
git mv app/views/setup-designated.html app/views/modules/setup/setup-designated.html
git mv app/views/setup-complete.html app/views/modules/setup/setup-complete.html
git mv app/views/setup-company-configurebyday-popover.html app/views/modules/setup/setup-company-configurebyday-popover.html

# timesheets

git commit -am 'moves module-related views to respective views subdirectory'


# move appframe views to views directory
# content

# footer

# menu

# navigation

# notifications

git commit -am 'moves appframe-related views to respective views subdirectory'


# move system files to respective directories
# authentication
git mv app/scripts/states/authentication.js app/src/modules/system/authentication/states.js

# indexing

# landing

# privileges

# validation




# clean up
git rm -rf app/{scripts,mocks,controllers,services}