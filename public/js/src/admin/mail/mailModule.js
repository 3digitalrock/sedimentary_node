angular.module('mailModule', ['ngRoute', 'ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('mailInbox', {
            url: '/dashboard/mail/inbox',
            templateUrl: '/templates/admin/mail_inbox.html',
            controller: 'AdminMailInboxCtrl'
          })
          .state('mailReply', {
            url: '/dashboard/mail/:mailId/reply',
            templateUrl: '/templates/admin/mail_reply.html',
            controller: 'AdminMailReplyCtrl'
          })
          .state('mailView', {
            url: '/dashboard/mail/:mailId',
            templateUrl: '/templates/admin/mail_view.html',
            controller: 'AdminMailViewCtrl'
          });
  }]);