/**
 *    Before running script
 */
// - change .bowerrc config for "directory" to `app/lib`
// - modify `files.js` to reflect changes to dependency install directory modification
// - 

var utils = require('./buildUtils');
var util = require('util');
var exec = require('child_process').exec;
var uuu = require('lodash');
var path = path || require('path');
var $ = path.join;

var app = 'app',
	lib = $(app, 'lib'),
	src = $(app, 'src'),
		initSrc = $(src, 'init'),
		configSrc = $(src, 'config'),
		constantsSrc = $(src, 'constants'),
		globalsSrc = $(src, 'globals'),
		mocksSrc = $(app, 'mocks'),
		utilsSrc = $(src, 'utils'),
			filtersSrc = $(utilsSrc, 'filters'),
			directivesSrc = $(utilsSrc, 'directives'),
			animationsSrc = $(utilsSrc, 'animations'),
		appframeSrc = $(src, 'appframe'),
			contentSrc = $(appframeSrc, 'content'),
			footerSrc = $(appframeSrc, 'footer'),
			headerSrc = $(appframeSrc, 'header'),
			menuSrc = $(appframeSrc, 'menu'),
			navigationSrc = $(appframeSrc, 'navigation'),
			notificationsSrc = $(appframeSrc, 'notifications'),
		modulesSrc = $(src, 'modules'),
			accountantSrc = $(modulesSrc, 'accountant'),
			billsSrc = $(modulesSrc, 'bills'),
			contractsSrc = $(modulesSrc, 'contracts'),
			dashboardSrc = $(modulesSrc, 'dashboard'),
			departmentsSrc = $(modulesSrc, 'departments'),
			entitiesSrc = $(modulesSrc, 'entities'),
				clientsSrc = $(entitiesSrc, 'clients'),
				vendorsSrc = $(entitiesSrc, 'vendors'),
			invoicesSrc = $(modulesSrc, 'invoices'),
			paymentsSrc = $(modulesSrc, 'payments'),
			projectsSrc = $(modulesSrc, 'projects'),
			requestsSrc = $(modulesSrc, 'requests'),
			resourcesSrc = $(modulesSrc, 'resources'),
			tenantsSrc = $(modulesSrc, 'tenants'),
				adminSrc = $(tenantsSrc, 'admin'),
				setupSrc = $(tenantsSrc, 'setup'),
			timesheetsSrc = $(modulesSrc, 'timesheets'),
		dataSrc = $(src, 'data'),
			httpSrc = $(dataSrc, 'http'),
			socketSrc = $(dataSrc, 'socket'),
		systemSrc = $(src, 'system'),
			indexingSrc = $(systemSrc, 'indexing'),
			emailsSrc = $(systemSrc, 'emails'),
			errorsSrc = $(systemSrc, 'errors'),
			quickbooksSrc = $(systemSrc, 'quickbooks'),
			debugSrc = $(systemSrc, 'debug'),
		verificationSrc = $(src, 'verification'),
			authenticationSrc = $(verificationSrc, 'authentication'),
			validationSrc = $(verificationSrc, 'validation'),
			privilegesSrc = $(verificationSrc, 'privileges'),
	styles = $(app, 'styles'),
		fonts = $(styles, 'webfonts'),
		stylesLib = $(fonts, 'lib'),
	views = $(app, 'views'),
		modalViews = $(views, 'modals'),
		appframeViews = $(views, 'appframe'),
		moduleViews = $(views, 'modules'),
			accountantViews = $(moduleViews, 'accountant'),
			billsViews = $(moduleViews, 'bills'),
			contractsViews = $(moduleViews, 'contracts'),
			dashboardViews = $(moduleViews, 'dashboard'),
			departmentsViews = $(moduleViews, 'departments'),
			entitiesViews = $(moduleViews, 'entities'),
				clientsViews = $(entitiesViews, 'clients'),
				vendorsViews = $(entitiesViews, 'vendors'),
			invoicesViews = $(moduleViews, 'invoices'),
			paymentsViews = $(moduleViews, 'payments'),
			projectsViews = $(moduleViews, 'projects'),
			requestsViews = $(moduleViews, 'requests'),
			resourcesViews = $(moduleViews, 'resources'),
			tenantsViews = $(moduleViews, 'tenants'),
				adminViews = $(tenantsViews, 'admin'),
				setupViews = $(tenantsViews, 'setup'),
			timesheetsViews = $(moduleViews, 'timesheets'),
		systemViews = $(views, 'system'),
			errorViews = $(systemViews, 'error'),
			indexingViews = $(systemViews, 'indexing'),
			emailsViews = $(systemViews, 'emails'),
			quickbooksViews = $(systemViews, 'quickbooks'),
			debugViews = $(systemViews, 'debug'),
		authenticationViews = $(views, 'authentication'),
	test = 'test',
	e2e = $(test, 'e2e'),
	spec = $(test, 'spec');

var filePathsMap = [
	['app/scripts/animations/menu-open.js', $(animationsSrc, 'menu-open.js')],
	['app/scripts/app.js', $(initSrc, 'app.js')],
	['app/scripts/config/req-res.js', $(configSrc, 'req-res.js')],
	['app/scripts/config/session.js', $(configSrc, 'session.js')],
	['app/scripts/config/urlRouter.js', $(configSrc, 'urlRouter.js')],
	['app/scripts/controllers/accountant.js', $(accountantSrc, 'accountantCtrl.js')],
	['app/scripts/controllers/billables.js', $(invoicesSrc, 'billablesCtrl.js')],
	['app/scripts/controllers/bsPopover.js', $(navigationSrc, 'popoverCtrl.js')],
	['app/scripts/controllers/change-password.js', $(authenticationSrc, 'changePasswordCtrl.js')],
	['app/scripts/controllers/clients.js', $(clientsSrc, 'clientsCtrl.js')],
	['app/scripts/controllers/clients_create.js', $(clientsSrc, 'clientsCreateCtrl.js')],
	['app/scripts/controllers/clients_edit.js', $(clientsSrc, 'clientsEditCtrl.js')],
	['app/scripts/controllers/contracts.js', $(contractsSrc, 'contractsCtrl.js')],
	['app/scripts/controllers/contracts_create.js', $(contractsSrc, 'contractsCreateCtrl.js')],
	['app/scripts/controllers/contracts_create_build.js', $(contractsSrc, 'contractsCreateBuildCtrl.js')],
	['app/scripts/controllers/contracts_create_setup.js', $(contractsSrc, 'contractsCreateSetupCtrl.js')],
	['app/scripts/controllers/contracts_manage.js', $(contractsSrc, 'contractsManageCtrl.js')],
	['app/scripts/controllers/dashboard.js', $(dashboardSrc, 'dashboardCtrl.js')],
	['app/scripts/controllers/departments.js', $(departmentsSrc, 'departmentsCtrl.js')],
	['app/scripts/controllers/indexing.js', $(indexingSrc, 'indexingCtrl.js')],
	['app/scripts/controllers/kAdminCompanyInfoCtrl.js', $(adminSrc, 'adminCompanyInfoCtrl.js')],
	['app/scripts/controllers/kAdminCtrl.js', $(adminSrc, 'adminCtrl.js')],
	['app/scripts/controllers/kAdminGeneralInfoCtrl.js', $(adminSrc, 'adminGeneralInfoCtrl.js')],
	['app/scripts/controllers/kAdminIndexCtrl.js', $(adminSrc, 'adminIndexCtrl.js')],
	['app/scripts/controllers/kAdminRatesCtrl.js', $(adminSrc, 'adminRatesCtrl.js')],
	['app/scripts/controllers/kAdminStructureCtrl.js', $(adminSrc, 'adminStructureCtrl.js')],
	['app/scripts/controllers/kAdminUsersCtrl.js', $(adminSrc, 'adminUsersCtrl.js')],
	['app/scripts/controllers/kNotificationsCtrl.js', $(notificationsSrc, 'notificationsCtrl.js')],
	['app/scripts/controllers/kPaymentsManageCtrl.js', $(paymentsSrc, 'paymentsManageCtrl.js')],
	['app/scripts/controllers/kPrivilegesCtrl.js', $(privilegesSrc, 'privilegesCtrl.js')],
	['app/scripts/controllers/kSchedulesCtrl.js', $(resourcesSrc, 'resourcesScheduleWeekCtrl.js')],
	['app/scripts/controllers/landingCtrl.js', $(authenticationSrc, 'landingCtrl.js')],
	['app/scripts/controllers/login.js', $(authenticationSrc, 'loginCtrl.js')],
	['app/scripts/controllers/logout.js', $(authenticationSrc, 'logoutCtrl.js')],
	['app/scripts/controllers/main.js', $(appframeSrc, 'mainCtrl.js')],
	['app/scripts/controllers/menuPanelCtrl.js', $(menuSrc, 'menuPanelCtrl.js')],
	['app/scripts/controllers/new-tenant.js', $(debugSrc, 'newTenantCtrl.js')],
	['app/scripts/controllers/payable-detail.js', $(billsSrc, 'payableDetailCtrl.js')],
	['app/scripts/controllers/payable-manage.js', $(billsSrc, 'payableManageCtrl.js')],
	['app/scripts/controllers/projects.js', $(projectsSrc, 'projectsCtrl.js')],
	['app/scripts/controllers/projects_create.js', $(projectsSrc, 'projectsCreateCtrl.js')],
	['app/scripts/controllers/projects_edit.js', $(projectsSrc, 'projectsEditCtrl.js')],
	['app/scripts/controllers/purchase-request-create.js', $(requestsSrc, 'requestCreateCtrl.js')],
	['app/scripts/controllers/purchase-request-manage.js', $(requestsSrc, 'requestManageCtrl.js')],
	['app/scripts/controllers/purchase-request-review-detail.js', $(requestsSrc, 'requestReviewDetailCtrl.js')],
	['app/scripts/controllers/receivables-create.js', $(invoicesSrc, 'receivablesCreateCtrl.js')],
	['app/scripts/controllers/receivables-manage.js', $(invoicesSrc, 'receivablesManageCtrl.js')],
	['app/scripts/controllers/resourceScheduleDayCtrl.js', $(resourcesSrc, 'resourceScheduleDayCtrl.js')],
	['app/scripts/controllers/setup-begin.js', $(setupSrc, 'setupBeginCtrl.js')],
	['app/scripts/controllers/setup-company.js', $(setupSrc, 'setupCompanyCtrl.js')],
	['app/scripts/controllers/setup-complete.js', $(setupSrc, 'setupCompleteCtrl.js')],
	['app/scripts/controllers/setup-general.js', $(setupSrc, 'setupGeneralCtrl.js')],
	['app/scripts/controllers/setup-index.js', $(setupSrc, 'setupIndexCtrl.js')],
	['app/scripts/controllers/setup-quickbooks.js', $(setupSrc, 'setupQuickbooksCtrl.js')],
	['app/scripts/controllers/setup-structure-time.js', $(setupSrc, 'setupStructureTimeCtrl.js')],
	['app/scripts/controllers/setup-structure.js', $(setupSrc, 'setupStructureCtrl.js')],
	['app/scripts/controllers/setup-users.js', $(setupSrc, 'setupUsersCtrl.js')],
	['app/scripts/controllers/setup.js', $(entitiesSrc, 'setup/setupCtrl.js')],
	['app/scripts/controllers/sockets.js', $(debugSrc, 'socketsCtrl.js')],
	['app/scripts/controllers/timetracker.js', $(timesheetsSrc, 'timesheetsCtrl.js')],
	['app/scripts/controllers/timetracker_entry.js', $(timesheetsSrc, 'timesheetsEntryCtrl.js')],
	['app/scripts/controllers/timetracker_review.js', $(timesheetsSrc, 'timesheetsReviewCtrl.js')],
	['app/scripts/controllers/utilities_user-select.js', '../saved_ctrls/utilities_user-select.js'],
	['app/scripts/controllers/vendors.js', $(vendorsSrc, 'vendorsCtrl.js')],
	['app/scripts/controllers/vendors_create.js', $(vendorsSrc, 'vendorsCreateCtrl.js')],
	['app/scripts/controllers/vendors_edit.js', $(vendorsSrc, 'vendorsEditCtrl.js')],
	['app/scripts/directives/activeItem.js', $(directivesSrc, 'kActiveItem.js')],
	['app/scripts/directives/authenticate.js', $(directivesSrc, 'kAuthenticate.js')],
	['app/scripts/directives/bodyClasses.js', $(directivesSrc, 'kBodyClasses.js')],
	['app/scripts/directives/datePicker.js', $(directivesSrc, 'kDatePicker.js')],
	['app/scripts/directives/disallowed.js', $(directivesSrc, 'kDisallowed.js')],
	['app/scripts/directives/dndModule.js', $(directivesSrc, 'kDndModule.js')],
	['app/scripts/directives/dragGroup.js', $(directivesSrc, 'kDragGroup.js')],
	['app/scripts/directives/dragItem.js', $(directivesSrc, 'kDragItem.js')],
	['app/scripts/directives/dropSpot.js', $(directivesSrc, 'kDropSpot.js')],
	['app/scripts/directives/dropSpotGroup.js', $(directivesSrc, 'kDropSpotGroup.js')],
	['app/scripts/directives/editInPlace.js', $(directivesSrc, 'kEditInPlace.js')],
	['app/scripts/directives/entityManagerList.js', $(directivesSrc, 'kEntityManagerList.js')],
	['app/scripts/directives/fileDropModule.js', $(directivesSrc, 'kFileDropModule.js')],
	['app/scripts/directives/fileListModule.js', $(directivesSrc, 'kFileListModule.js')],
	['app/scripts/directives/flashWarning.js', $(directivesSrc, 'kFlashWarning.js')],
	['app/scripts/directives/hide-for.js', $(directivesSrc, 'kHideFor.js')],
	['app/scripts/directives/hoverShow.js', $(directivesSrc, 'kHoverShow.js')],
	['app/scripts/directives/inputError.js', $(directivesSrc, 'kInputError.js')],
	['app/scripts/directives/isActive.js', $(directivesSrc, 'kIsActive.js')],
	['app/scripts/directives/kAnnouncement.js', $(directivesSrc, 'kAnnouncement.js')],
	['app/scripts/directives/kErrorsTarget.js', $(directivesSrc, 'kErrorsTarget.js')],
	['app/scripts/directives/kIsFlagged.js', $(directivesSrc, 'kIsFlagged.js')],
	['app/scripts/directives/kLabel.js', $(directivesSrc, 'kLabel.js')],
	['app/scripts/directives/kMask.js', $(directivesSrc, 'kMask.js')],
	['app/scripts/directives/kMatch.js', $(directivesSrc, 'kMatch.js')],
	['app/scripts/directives/kMaxvalue.js', $(directivesSrc, 'kMaxvalue.js')],
	['app/scripts/directives/kMenuPanelItem.js', $(directivesSrc, 'kMenuPanelItem.js')],
	['app/scripts/directives/kMenuPanelToggle.js', $(directivesSrc, 'kMenuPanelToggle.js')],
	['app/scripts/directives/kMinvalue.js', $(directivesSrc, 'kMinvalue.js')],
	['app/scripts/directives/kPaymentsTooltip.js', $(directivesSrc, 'kPaymentsTooltip.js')],
	['app/scripts/directives/kRequiredUnless.js', $(directivesSrc, 'kRequiredUnless.js')],
	['app/scripts/directives/kRightClickLineItem.js', $(directivesSrc, 'kRightClickLineItem.js')],
	['app/scripts/directives/kStatusDisplay.js', $(directivesSrc, 'kStatusDisplay.js')],
	['app/scripts/directives/kValidate.js', $(directivesSrc, 'kValidate.js')],
	['app/scripts/directives/kValidateTypeahead.js', $(directivesSrc, 'kValidateTypeahead.js')],
	['app/scripts/directives/kWeeklyDatepicker.js', $(directivesSrc, 'kWeeklyDatepicker.js')],
	['app/scripts/directives/limitValue.js', $(directivesSrc, 'kLimitValue.js')],
	['app/scripts/directives/logged-in.js', $(directivesSrc, 'kLoggedIn.js')],
	['app/scripts/directives/modal.js', $(directivesSrc, 'Modal.js')],
	['app/scripts/directives/nested-multi-sortable.js', $(directivesSrc, 'kNestedMultiSortable.js')],
	['app/scripts/directives/orderBy.js', $(directivesSrc, 'kOrderBy.js')],
	['app/scripts/directives/peerRequired.js', $(directivesSrc, 'kPeerRequired.js')],
	['app/scripts/directives/pkModal.js', $(directivesSrc, 'kModal.js')],
	['app/scripts/directives/pkTypeahead.js', $(directivesSrc, 'kTypeahead.js')],
	['app/scripts/directives/positive-number.js', $(directivesSrc, 'kPositiveNumber.js')],
	['app/scripts/directives/showItems.js', $(directivesSrc, 'kShowItems.js')],
	['app/scripts/directives/spin-handler.js', $(directivesSrc, 'kSpinHandler.js')],
	['app/scripts/directives/spinner.js', $(directivesSrc, 'kSpinner.js')],
	['app/scripts/directives/state-class.js', $(directivesSrc, 'kStateClass.js')],
	['app/scripts/directives/timesheet.js', $(directivesSrc, 'kTimesheet.js')],
	['app/scripts/directives/toggle-sidebar.js', $(directivesSrc, 'kToggleSidebar.js')],
	['app/scripts/directives/toggle.js', $(directivesSrc, 'kToggle.js')],
	['app/scripts/directives/toggleTimeInputForm.js', $(directivesSrc, 'kToggleTimeInputForm.js')],
	['app/scripts/directives/uid.js', $(directivesSrc, 'kUid.js')],
	['app/scripts/directives/unique-email.js', $(directivesSrc, 'kUniqueEmail.js')],
	['app/scripts/directives/zipcode.js', $(directivesSrc, 'kZipcode.js')],
	['app/scripts/filters/capitalize.js', $(filtersSrc, 'capitalize.js')],
	['app/scripts/filters/getAllByKey.js', $(filtersSrc, 'getAllByKey.js')],
	['app/scripts/filters/getAllWithoutKey.js', $(filtersSrc, 'getAllWithoutKey.js')],
	['app/scripts/filters/getAndModifyObjectByKey.js', $(filtersSrc, 'getAndModifyObjectByKey.js')],
	['app/scripts/filters/getByKey.js', $(filtersSrc, 'getByKey.js')],
	['app/scripts/filters/getIndexByKey.js', $(filtersSrc, 'getIndexByKey.js')],
	['app/scripts/filters/itemById.js', $(filtersSrc, 'itemById.js')],
	['app/scripts/filters/orderByKey.js', $(filtersSrc, 'orderByKey.js')],
	['app/scripts/filters/permissions.js', $(filtersSrc, 'permissions.js')],
	['app/scripts/filters/splitFilter.js', $(filtersSrc, 'splitFilter.js')],
	['app/scripts/filters/titleize.js', $(filtersSrc, 'titleize.js')],
	['app/scripts/services/AccountSvc.js', $(httpSrc, 'Account.js')],
	['app/scripts/services/Api.js', $(httpSrc, 'Api.js')],
	['app/scripts/services/CalendarGrid.js', $(timesheetsSrc, 'CalendarGrid.js')],
	['app/scripts/services/Clients.js', $(httpSrc, 'Clients.js')],
	['app/scripts/services/Company.js', $(httpSrc, 'Company.js')],
	['app/scripts/services/Contract.js', $(contractsSrc, 'Contract.js')],
	['app/scripts/services/Contracts.js', $(httpSrc, 'Contracts.js')],
	['app/scripts/services/Data.js', $(dataSrc, 'Data.js')],
	['app/scripts/services/Datastore.js', $(dataSrc, 'Datastore.js')],
	['app/scripts/services/Deliverable.js', $(contractsSrc, 'Deliverable.js')],
	['app/scripts/services/Departments.js', $(httpSrc, 'Departments.js')],
	['app/scripts/services/DocumentsSvc.js', $(httpSrc, 'Documents.js')],
	['app/scripts/services/EntMan.js', $(systemSrc, 'EntMan.js')],
	['app/scripts/services/ErrorHandler.js', $(systemSrc, 'ErrorHandler.js')],
	['app/scripts/services/FormReset.js', $(debugSrc, 'FormReset.js')],
	['app/scripts/services/IndexingSvc.js', $(httpSrc, 'Indexing.js')],
	['app/scripts/services/Invoices.js', $(httpSrc, 'Invoices.js')],
	['app/scripts/services/LabelMaker.js', $(systemSrc, 'LabelMaker.js')],
	['app/scripts/services/LocalStorageCache.js', $(systemSrc, 'LocalStorageCache.js')],
	['app/scripts/services/Modals.js', $(debugSrc, 'Modals.js')],
	['app/scripts/services/PayablesSvc.js', $(httpSrc, 'Payables.js')],
	['app/scripts/services/Persist.js', $(dataSrc, 'Persist.js')],
	['app/scripts/services/Projects.js', $(httpSrc, 'Projects.js')],
	['app/scripts/services/PurchaseRequests.js', $(requestsSrc, 'PurchaseRequests.js')],
	['app/scripts/services/Requests.js', $(requestsSrc, 'Requests.js')],
	['app/scripts/services/ResourceScheduleDaySvc.js', $(resourcesSrc, 'resourceScheduleDaySvc.js')],
	['app/scripts/services/SaaSSvc.js', $(systemSrc, 'SaaSSvc.js')],
	['app/scripts/services/Spin.js', $(appframeSrc, 'spinnerSvc.js')],
	['app/scripts/services/Timesheet.js', $(timesheetsSrc, 'Timesheet.js')],
	['app/scripts/services/Timesheets.js', $(httpSrc, 'Timesheets.js')],
	['app/scripts/services/Toastr.js', $(systemSrc, 'Toastr.js')],
	['app/scripts/services/Typeahead.js', $(debugSrc, 'Typeahead.js')],
	['app/scripts/services/TypeaheadSpecific.js', $(debugSrc, 'TypeaheadSpecific.js')],
	['app/scripts/services/User.js', $(httpSrc, 'User.js')],
	['app/scripts/services/Utilities.js', $(debugSrc, 'Utilities.js')],
	['app/scripts/services/Validation.js', $(initSrc, 'validation.js')],
	['app/scripts/services/ValidationHelper.js', $(validationSrc, 'ValidationHelper.js')],
	['app/scripts/services/Vendors.js', $(httpSrc, 'Vendors.js')],
	['app/scripts/services/accountant.js', $(accountantSrc, 'accountantSvc.js')],
	['app/scripts/services/cookieSvc.js', $(authenticationSrc, 'cookieSvc.js')],
	['app/scripts/services/dashboardSvc.js', $(dashboardSrc, 'dashboardSvc.js')],
	['app/scripts/services/kDataCacheSvc.js', $(socketSrc, 'DataCache.js')],
	['app/scripts/services/kNotificationsSvc.js', $(notificationsSrc, 'notificationSvc.js')],
	['app/scripts/services/kPaymentsSvc.js', $(paymentsSrc, 'paymentsSvc.js')],
	['app/scripts/services/kPrivilegesSvc.js', $(privilegesSrc, 'privilegesSvc.js')],
	['app/scripts/services/kSignalRSvc.js', $(socketSrc, 'SignalR.js')],
	['app/scripts/services/lodashSvc.js', $(globalsSrc, 'lodash.js')],
	['app/scripts/services/menuPanelSvc.js', $(menuSrc, 'menuPanelSvc.js')],
	['app/scripts/services/plurals.js', $(debugSrc, 'pluralsSvc.js')],
	['app/scripts/services/setup-storage.js', $(setupSrc, 'setupStorageSvc.js')],
	['app/scripts/states/accountant.js', $(accountantSrc, 'states.js')],
	['app/scripts/states/admin.js', $(adminSrc, 'states.js')],
	['app/scripts/states/authentication.js', $(authenticationSrc, 'states.js')],
	['app/scripts/states/bills.js', $(billsSrc, 'states.js')],
	['app/scripts/states/clients.js', $(modulesSrc, 'clients/states.js')],
	['app/scripts/states/contracts.js', $(contractsSrc, 'states.js')],
	['app/scripts/states/dashboard.js', $(dashboardSrc, 'states.js')],
	['app/scripts/states/debug.js', $(debugSrc, 'states.js')],
	['app/scripts/states/departments.js', $(departmentsSrc, 'states.js')],
	['app/scripts/states/indexing.js', $(indexingSrc, 'states.js')],
	['app/scripts/states/invoices.js', $(invoicesSrc, 'states.js')],
	['app/scripts/states/landing.js', $(systemSrc, 'landing/states.js')],
	['app/scripts/states/payments.js', $(paymentsSrc, 'states.js')],
	['app/scripts/states/projects.js', $(projectsSrc, 'states.js')],
	['app/scripts/states/requests.js', $(requestsSrc, 'states.js')],
	['app/scripts/states/resources.js', $(resourcesSrc, 'states.js')],
	['app/scripts/states/setup.js', $(setupSrc, 'states.js')],
	['app/scripts/states/timesheets.js', $(timesheetsSrc, 'states.js')],
	['app/scripts/states/vendors.js', $(vendorsSrc, 'states.js')],
	['app/scripts/validations/authentication.js', $(authenticationSrc, 'validations.js')],
	['app/scripts/validations/bills.js', $(billsSrc, 'validations.js')],
	['app/scripts/validations/config.js', $(configSrc, 'validations.js')],
	['app/scripts/validations/contracts.js', $(contractsSrc, 'validations.js')],
	['app/scripts/validations/entities.js', $(entitiesSrc, 'validations.js')],
	['app/scripts/validations/indexing.js', $(indexingSrc, 'validations.js')],
	['app/scripts/validations/invoices.js', $(invoicesSrc, 'validations.js')],
	['app/scripts/validations/projects.js', $(projectsSrc, 'validations.js')],
	['app/scripts/validations/requests.js', $(requestsSrc, 'validations.js')],
	['app/scripts/validations/tenant.js', $(tenantsSrc, 'validations.js')],
	['app/scripts/validations/timesheets.js', $(timesheetsSrc, 'validations.js')]
];


var viewFilesMap = [ 
	[ 'app/views/accountant.html', $(accountantViews, 'accountant.html') ],
	[ 'app/views/admin-company-info.html', $(adminViews, 'company-info.html') ],
	[ 'app/views/admin-general-info.html', $(adminViews, 'general-info.html') ],
	[ 'app/views/admin-index.html', $(adminViews, 'index.html') ],
	[ 'app/views/admin-rates.html', $(adminViews, 'rates.html') ],
	[ 'app/views/admin-structure.html', $(adminViews, 'structure.html') ],
	[ 'app/views/admin-users.html', $(adminViews, 'users.html') ],
	[ 'app/views/admin.html', $(adminViews, 'admin.html') ],
	[ 'app/views/billables.html', $(invoicesViews, 'billables-manage.html') ],
	[ 'app/views/changePassword.html', $(authenticationViews, 'change-password.html') ],
	[ 'app/views/clients.html', $(clientsViews, 'index.html') ],
	[ 'app/views/clients_create.html', $(clientsViews, 'create.html') ],
	[ 'app/views/contracts.html', $(contractsViews, 'index.html') ],
	[ 'app/views/contracts_create.html', $(contractsViews, 'create.html') ],
	[ 'app/views/contracts_create_build.html', $(contractsViews, 'create-build.html') ],
	[ 'app/views/contracts_create_setup.html', $(contractsViews, 'create-setup.html') ],
	[ 'app/views/contracts_manage.html', $(contractsViews, 'manage.html') ],
	[ 'app/views/dashboard.html', $(dashboardViews, 'index.html') ],
	[ 'app/views/department-create-modal.html', $(modalViews, 'department-create-modal.html') ],
	[ 'app/views/department-delete-modal.html', $(modalViews, 'department-delete-modal.html') ],
	[ 'app/views/department-update-modal.html', $(modalViews, 'department-update-modal.html') ],
	[ 'app/views/departments-detail.html', $(departmentsViews, 'detail.html') ],
	[ 'app/views/departments-index.html', $(departmentsViews, 'index.html') ],
	[ 'app/views/departments-manage.html', $(departmentsViews, 'manage.html') ],
	[ 'app/views/guide-me.html', $(appframeViews, 'guide-me.html') ],
	[ 'app/views/indexing.html', $(indexingViews, '/indexing.html') ],
	[ 'app/views/landing.html', $(authenticationViews, 'landing.html') ],
	[ 'app/views/login.html', $(authenticationViews, 'login.html') ],
	[ 'app/views/main.html', $(appframeViews, 'main.html') ],
	[ 'app/views/menu-panel.html', $(appframeViews, 'menu-panel.html') ],
	[ 'app/views/more-nav-items.html', $(appframeViews, 'more-nav-items.html') ],
	[ 'app/views/newTenant.html', $(debugViews, 'newTenant.html') ],
	[ 'app/views/payable-detail.html', $(billsViews, 'detail.html') ],
	[ 'app/views/payable-manage.html', $(billsViews, 'manage.html') ],
	[ 'app/views/payments-manage.html', $(paymentsViews, 'manage.html') ],
	[ 'app/views/projects.html', $(resourcesViews, 'index.html') ],
	[ 'app/views/projects_create.html', $(resourcesViews, 'create.html') ],
	[ 'app/views/projects_edit.html', $(resourcesViews, 'edit.html') ],
	[ 'app/views/purchase-request-all-items-modal.html', $(modalViews, 'request-all-items-modal.html') ],
	[ 'app/views/purchase-request-client-add-new-modal.html', $(modalViews, 'request-client-add-new-modal.html') ],
	[ 'app/views/purchase-request-comments-modal.html', $(modalViews, 'request-comments-modal.html') ],
	[ 'app/views/purchase-request-create-popover.html', $(requestsViews, 'create-popover.html') ],
	[ 'app/views/purchase-request-create.html', $(requestsViews, 'create.html') ],
	[ 'app/views/purchase-request-decline-purchase-modal.html', $(modalViews, 'request-decline-purchase-modal.html') ],
	[ 'app/views/purchase-request-document-preview-modal.html', $(modalViews, 'request-document-preview-modal.html') ],
	[ 'app/views/purchase-request-manage.html', $(requestsViews, 'manage.html') ],
	[ 'app/views/purchase-request-pass-expenses-modal.html', $(modalViews, 'request-pass-expenses-modal.html') ],
	[ 'app/views/purchase-request-projects-all-modal.html', $(modalViews, 'request-projects-all-modal.html') ],
	[ 'app/views/purchase-request-request-info-modal.html', $(modalViews, 'request-request-info-modal.html') ],
	[ 'app/views/purchase-request-review-alert-modal.html', $(modalViews, 'request-review-alert-modal.html') ],
	[ 'app/views/purchase-request-review-alert-time-modal.html', $(modalViews, 'request-review-alert-time-modal.html') ],
	[ 'app/views/purchase-request-review-detail.html', $(requestsViews, 'review-detail.html') ],
	[ 'app/views/purchase-request-review-forward-confirmation-modal.html', $(modalViews, '/request-review-forward-confirmation-modal.html') ],
	[ 'app/views/purchase-request-review-forward-modal.html', $(modalViews, 'request-review-forward-modal.html') ],
	[ 'app/views/purchase-request-review-more-info-modal.html', $(modalViews, 'request-review-more-info-modal.html') ],
	[ 'app/views/purchase-request-review.html', $(requestsViews, 'review.html') ],
	[ 'app/views/purchase-request-vendor-add-new-modal.html', $(modalViews, 'request-vendor-add-new-modal.html') ],
	[ 'app/views/purchase-request-vendor-select-modal.html', $(modalViews, 'request-vendor-select-modal.html') ],
	[ 'app/views/receivables-create.html', $(invoicesViews, 'create.html') ],
	[ 'app/views/receivables-manage.html', $(invoicesViews, 'manage.html') ],
	[ 'app/views/resource-schedule.html', $(resourcesViews, 'schedule-day.html') ],
	[ 'app/views/schedules.html', $(resourcesViews, 'schedules-week.html') ],
	[ 'app/views/setup-begin.html', $(setupViews, 'begin.html') ],
	[ 'app/views/setup-company-configurebyday-popover.html', $(setupViews, 'company-configurebyday-popover.html') ],
	[ 'app/views/setup-company.html', $(setupViews, 'company.html') ],
	[ 'app/views/setup-complete.html', $(setupViews, 'complete.html') ],
	[ 'app/views/setup-designated.html', $(setupViews, 'designated.html') ],
	[ 'app/views/setup-general.html', $(setupViews, 'general.html') ],
	[ 'app/views/setup-index.html', $(setupViews, 'index.html') ],
	[ 'app/views/setup-nav.html', $(setupViews, 'nav.html') ],
	[ 'app/views/setup-quickbooks.html', $(setupViews, 'quickbooks.html') ],
	[ 'app/views/setup-structure-time.html', $(setupViews, 'structure-time.html') ],
	[ 'app/views/setup-structure.html', $(setupViews, 'structure.html') ],
	[ 'app/views/setup-users.html', $(setupViews, 'users.html') ],
	[ 'app/views/setup.html', $(setupViews, 'setup.html') ],
	[ 'app/views/sidebar-first.html', $(appframeViews, 'index.html') ],
	[ 'app/views/sidebar-second.html', $(appframeViews, 'index.html') ],
	[ 'app/views/sockets.html', $(debugViews, 'sockets.html') ],
	[ 'app/views/system_company-info.html', 'app/views/system_company-info.html' ],
	[ 'app/views/system_departments.html', 'app/views/system_departments.html' ],
	[ 'app/views/system_general-info.html', 'app/views/system_general-info.html' ],
	[ 'app/views/system_index.html', 'app/views/system_index.html' ],
	[ 'app/views/system_users.html', 'app/views/system_users.html' ],
	[ 'app/views/timetracker.html', $(timesheetsViews, 'index.html') ],
	[ 'app/views/timetracker_entry.html', $(timesheetsViews, 'entry.html') ],
	[ 'app/views/timetracker_review.html', $(timesheetsViews, 'review.html') ],
	[ 'app/views/utilities_index.html', 'app/views/utilities_index.html' ],
	[ 'app/views/utilities_labels.html', 'app/views/utilities_labels.html' ],
	[ 'app/views/utilities_local-storage-cache.html', 'app/views/utilities_local-storage-cache.html' ],
	[ 'app/views/utilities_user-select.html', 'app/views/utilities_user-select.html' ],
	[ 'app/views/vendors.html', $(vendorsViews, 'index.html') ],
	[ 'app/views/vendors_create.html', $(vendorsViews, 'create.html') ],
	[ 'app/views/vendors_edit.html', $(vendorsViews, 'edit.html') ]
];

// current paths
var viewPathsMap = [ 
	[ 'views/accountant.html', 'views/modules/accountant/accountant.html' ],
	[ 'views/admin-company-info.html', 'views/modules/tenants/admin/company-info.html' ],
	[ 'views/admin-general-info.html', 'views/modules/tenants/admin/general-info.html' ],
	[ 'views/admin-index.html', 'views/modules/tenants/admin/index.html' ],
	[ 'views/admin-rates.html', 'views/modules/tenants/admin/rates.html' ],
	[ 'views/admin-structure.html', 'views/modules/tenants/admin/structure.html' ],
	[ 'views/admin-users.html', 'views/modules/tenants/admin/users.html' ],
	[ 'views/admin.html', 'views/modules/tenants/admin/admin.html' ],
	[ 'views/billables.html', 'views/modules/invoices/billables-manage.html' ],
	[ 'views/changePassword.html', 'views/system/authentication/change-password.html' ],
	[ 'views/clients.html', 'views/modules/entities/clients/index.html' ],
	[ 'views/clients_create.html', 'views/modules/entities/clients/create.html' ],
	[ 'views/contracts.html', 'views/modules/contracts/index.html' ],
	[ 'views/contracts_create.html', 'views/modules/contracts/create.html' ],
	[ 'views/contracts_create_build.html', 'views/modules/contracts/create-build.html' ],
	[ 'views/contracts_create_setup.html', 'views/modules/contracts/create-setup.html' ],
	[ 'views/contracts_manage.html', 'views/modules/contracts/manage.html' ],
	[ 'views/dashboard.html', 'views/modules/dashboard/index.html' ],
	[ 'views/department-create-modal.html', 'views/modals/department-create-modal.html' ],
	[ 'views/department-delete-modal.html', 'views/modals/department-delete-modal.html' ],
	[ 'views/department-update-modal.html', 'views/modals/department-update-modal.html' ],
	[ 'views/departments-detail.html', 'views/modules/departments/detail.html' ],
	[ 'views/departments-index.html', 'views/modules/departments/index.html' ],
	[ 'views/departments-manage.html', 'views/modules/departments/manage.html' ],
	[ 'views/guide-me.html', 'views/appframe/footer/guide-me.html' ],
	[ 'views/indexing.html', 'views/system/indexing/indexing.html' ],
	[ 'views/landing.html', 'views/system/authentication/landing.html' ],
	[ 'views/login.html', 'views/system/authentication/login.html' ],
	[ 'views/main.html', 'views/appframe/content/main.html' ],
	[ 'views/menu-panel.html', 'views/appframe/menu/menu-panel.html' ],
	[ 'views/more-nav-items.html', 'views/appframe/navigation/more-nav-items.html' ],
	[ 'views/newTenant.html', 'modules/system/debug/newTenant.html' ],
	[ 'views/payable-detail.html', 'views/modules/bills/detail.html' ],
	[ 'views/payable-manage.html', 'views/modules/bills/manage.html' ],
	[ 'views/payments-manage.html', 'views/modules/payments/manage.html' ],
	[ 'views/projects.html', 'views/modules/projects/index.html' ],
	[ 'views/projects_create.html', 'views/modules/projects/create.html' ],
	[ 'views/projects_edit.html', 'views/modules/projects/edit.html' ],
	[ 'views/purchase-request-all-items-modal.html', 'views/modals/request-all-items-modal.html' ],
	[ 'views/purchase-request-client-add-new-modal.html', 'views/modals/request-client-add-new-modal.html' ],
	[ 'views/purchase-request-comments-modal.html', 'views/modals/request-comments-modal.html' ],
	[ 'views/purchase-request-create-popover.html', 'views/modules/requests/create-popover.html' ],
	[ 'views/purchase-request-create.html', 'views/modules/requests/create.html' ],
	[ 'views/purchase-request-decline-purchase-modal.html', 'views/modals/request-decline-purchase-modal.html' ],
	[ 'views/purchase-request-document-preview-modal.html', 'views/modals/request-document-preview-modal.html' ],
	[ 'views/purchase-request-manage.html', 'views/modules/requests/manage.html' ],
	[ 'views/purchase-request-pass-expenses-modal.html', 'views/modals/request-pass-expenses-modal.html' ],
	[ 'views/purchase-request-projects-all-modal.html', 'views/modals/request-projects-all-modal.html' ],
	[ 'views/purchase-request-request-info-modal.html', 'views/modals/request-request-info-modal.html' ],
	[ 'views/purchase-request-review-alert-modal.html', 'views/modals/request-review-alert-modal.html' ],
	[ 'views/purchase-request-review-alert-time-modal.html', 'views/modals/request-review-alert-time-modal.html' ],
	[ 'views/purchase-request-review-detail.html', 'views/modules/requests/review-detail.html' ],
	[ 'views/purchase-request-review-forward-confirmation-modal.html', 'views/modals/request-review-forward-confirmation-modal.html' ],
	[ 'views/purchase-request-review-forward-modal.html', 'views/modals/request-review-forward-modal.html' ],
	[ 'views/purchase-request-review-more-info-modal.html', 'views/modals/request-review-more-info-modal.html' ],
	[ 'views/purchase-request-review.html', 'views/modules/requests/review.html' ],
	[ 'views/purchase-request-vendor-add-new-modal.html', 'views/modals/request-vendor-add-new-modal.html' ],
	[ 'views/purchase-request-vendor-select-modal.html', 'views/modals/request-vendor-select-modal.html' ],
	[ 'views/receivables-create.html', 'views/modules/invoices/create.html' ],
	[ 'views/receivables-manage.html', 'views/modules/invoices/manage.html' ],
	[ 'views/resource-schedule.html', 'views/modules/resources/schedule-day.html' ],
	[ 'views/schedules.html', 'views/modules/resources/schedules-week.html' ],
	[ 'views/setup-begin.html', 'views/modules/tenants/setup/begin.html' ],
	[ 'views/setup-company-configurebyday-popover.html', 'views/modules/tenants/setup/company-configurebyday-popover.html' ],
	[ 'views/setup-company.html', 'views/modules/tenants/setup/company.html' ],
	[ 'views/setup-complete.html', 'views/modules/tenants/setup/complete.html' ],
	[ 'views/setup-designated.html', 'views/modules/tenants/setup/designated.html' ],
	[ 'views/setup-general.html', 'views/modules/tenants/setup/general.html' ],
	[ 'views/setup-index.html', 'views/modules/tenants/setup/index.html' ],
	[ 'views/setup-nav.html', 'views/modules/tenants/setup/nav.html' ],
	[ 'views/setup-quickbooks.html', 'views/modules/tenants/setup/quickbooks.html' ],
	[ 'views/setup-structure-time.html', 'views/modules/tenants/setup/structure-time.html' ],
	[ 'views/setup-structure.html', 'views/modules/tenants/setup/structure.html' ],
	[ 'views/setup-users.html', 'views/modules/tenants/setup/users.html' ],
	[ 'views/setup.html', 'views/modules/tenants/setup/setup.html' ],
	[ 'views/sidebar-first.html', 'views/appframe/navigation/index.html' ],
	[ 'views/sidebar-second.html', 'views/appframe/notifications/index.html' ],
	[ 'views/sockets.html', 'modules/system/debug/sockets.html' ],
	[ 'views/system_company-info.html', 'views/system_company-info.html' ],
	[ 'views/system_departments.html', 'views/system-departments.html' ],
	[ 'views/system_general-info.html', 'views/system-general-info.html' ],
	[ 'views/system_index.html', 'views/system-index.html' ],
	[ 'views/system_users.html', 'views/system-users.html' ],
	[ 'views/timetracker.html', 'views/modules/timesheets/index.html' ],
	[ 'views/timetracker_entry.html', 'views/modules/timesheets/entry.html' ],
	[ 'views/timetracker_review.html', 'views/modules/timesheets/review.html' ],
	[ 'views/utilities_index.html', 'views/utilities-index.html' ],
	[ 'views/utilities_labels.html', 'views/utilities-labels.html' ],
	[ 'views/utilities_local-storage-cache.html', 'views/utilities_local-storage-cache.html' ],
	[ 'views/utilities_user-select.html', 'views/utilities-user-select.html' ],
	[ 'views/vendors.html', 'views/modules/entities/vendors/index.html' ],
	[ 'views/vendors_create.html', 'views/modules/entities/vendors/create.html' ],
	[ 'views/vendors_edit.html', 'views/modules/entities/vendors/edit.html' ]
];

var controllerNamesMap = [
	['AccountantCtrl', 'accountantCtrl'],
	['BillablesCtrl', 'billablesCtrl'],
	['bsPopoverCtrl', 'popoverCtrl'],
	['ChangePasswordCtrl', 'changePasswordCtrl'],
	['ClientsCtrl', 'clientsCtrl'],
	['ClientsCreateCtrl', 'clientsCreateCtrl'],
	['ClientsEditCtrl', 'clientsEditCtrl'],
	['ContractsCtrl', 'contractsCtrl'],
	['ContractsCreateCtrl', 'contractsCreateCtrl'],
	['ContractsCreateBuildCtrl', 'contractsCreateBuildCtrl'],
	['ContractsCreateSetupCtrl', 'contractsCreateSetupCtrl'],
	['ContractsManageCtrl', 'contractsManageCtrl'],
	['DashboardCtrl', 'dashboardCtrl'],
	['DepartmentsCtrl', 'departmentsCtrl'],
	['IndexingCtrl.js', 'indexingCtrl'],
	['kAdminCompanyInfoCtrl', 'adminCompanyInfoCtrl'],
	['kAdminCtrl', 'adminCtrl'],
	['kAdminGeneralInfoCtrl', 'adminGeneralInfoCtrl'],
	['kAdminIndexCtrl', 'adminIndexCtrl'],
	['kAdminRatesCtrl', 'adminRatesCtrl'],
	['kAdminStructureCtrl', 'adminStructureCtrl'],
	['kAdminUsersCtrl', 'adminUsersCtrl'],
	['kNotificationsCtrl', 'notificationsCtrl'],
	['kPaymentsManageCtrl', 'paymentsManageCtrl'],
	['kPrivilegesCtrl', 'privilegesCtrl'],
	['kSchedulesCtrl', 'resourcesScheduleWeekCtrl'],
	['LandingCtrl', 'landingCtrl'],
	['LoginCtrl', 'loginCtrl'],
	['LogoutCtrl', 'logoutCtrl'],
	['MainCtrl', 'mainCtrl'],
	['NewTenantCtrl', 'newTenantCtrl'],
	['PayableDetailCtrl', 'payableDetailCtrl'],
	['PayableManageCtrl', 'payableManageCtrl'],
	['ProjectsCtrl', 'projectsCtrl'],
	['ProjectsCreateCtrl', 'projectsCreateCtrl'],
	['ProjectsEditCtrl', 'projectsEditCtrl'],
	['PurchaseRequestCreateCtrl', 'requestCreateCtrl'],
	['PurchaseRequestManageCtrl', 'requestManageCtrl'],
	['PurchaseRequestReviewDetailCtrl', 'requestReviewDetailCtrl'],
	['ReceivablesCreateCtrl', 'receivablesCreateCtrl'],
	['ReceivablesManageCtrl', 'receivablesManageCtrl'],
	['SetupBeginCtrl', 'setupBeginCtrl'],
	['SetupCompanyCtrl', 'setupCompanyCtrl'],
	['SetupCompleteCtrl', 'setupCompleteCtrl'],
	['SetupGeneralCtrl', 'setupGeneralCtrl'],
	['SetupIndexCtrl', 'setupIndexCtrl'],
	['SetupQuickbooksCtrl', 'setupQuickbooksCtrl'],
	['SetupStructureTimeCtrl', 'setupStructureTimeCtrl'],
	['SetupStructureCtrl', 'setupStructureCtrl'],
	['SetupUsersCtrl', 'setupUsersCtrl'],
	['SetupCtrl', 'setupCtrl'],
	['SocketsCtrl', 'socketsCtrl'],
	['TimetrackerCtrl', 'timesheetsCtrl'],
	['TimetrackerEntryCtrl', 'timesheetsEntryCtrl'],
	['TimetrackerReviewCtrl', 'timesheetsReviewCtrl'],
	['VendorsCtrl', 'vendorsCtrl'],
	['VendorsCreateCtrl', 'vendorsCreateCtrl'],
	['VendorsEditCtrl', 'vendorsEditCtrl']
];

(function () {
	for (var x = 0; x < viewFilesMap.length; x++) {
		exec(['git mv', viewFilesMap[x][0], viewFilesMap[x][1]].join(' '));
	}

	for (var x = 0; x < filePathsMap.length; x++) {
		exec(['git', 'mv', filePathsMap[x][0], filePathsMap[x][1]].join(' '));
	}
}());

utils.recursiveReplace(['app/views', 'app/src'], viewPathsMap);

utils.recursiveReplace(['app/views', 'app/src'], controllerNamesMap);
