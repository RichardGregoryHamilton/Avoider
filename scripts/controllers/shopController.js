angular.module('avoider')
    .controller('shopController', ['$scope', function($scope) {
        
        $scope.category = "characters";
        $scope.purchases = JSON.parse(localStorage['purchases']);
        $scope.orderStatus = {'showMessage': false, 'rejected': false};
        $scope.purchased = function(item) {
            return $scope.purchases.indexOf(item) < 0;
        }

        var cart = [];
        
        $scope.characters = [
                            { 'name': 'Orange Hero',         'price': 10,  'color': 'orange'  },
                            { 'name': 'Red Hero',            'price': 10,  'color': 'red'     },
                            { 'name': 'Green Hero',          'price': 15,  'color': 'green'   },
                            { 'name': 'Purple Hero',         'price': 15,  'color': 'purple'  },
                            { 'name': 'Crimson Hero',        'price': 20,  'color': 'crimson' },
                            { 'name': 'Indigo Hero',         'price': 20,  'color': 'indigo'  },
                            { 'name': 'Violet Hero',         'price': 30,  'color': 'violet'  },
                            { 'name': 'Black Hero',          'price': 50,  'color': 'black'   }
                          ];
                          
        $scope.enemies = [
                            { "name": "Skeleton",        "price": 10 },
                            { "name": "Bandit",          "price": 10 },
                            { "name": "Spiky",           "price": 15 },
                            { "name": "Goblin",          "price": 15 },
                            { "name": "Lizard_Warrior",  "price": 20 },
                            { "name": "Lizard_Archer",   "price": 20 },
                            { "name": "Magician",        "price": 30 },
                            { "name": "Mystic_Mummy",    "price": 50 },
                            { "name": "Skeleton_Knight", "price": 50 }
                          ];

        $scope.changeCategory = function(category) {
            $scope.category = category;
        }

        function approvePurchase() {
            $("#purchase-notification").css({ 'visibility': 'visible' });
            $scope.orderStatus = { 'rejected': false, 'showMessage': true };
            setTimeout(hideMessage, 5000);
        }
        
        function rejectPurchase() {
            $("#purchase-notification").css({ 'visibility': 'visible' });
            $scope.orderStatus = { 'rejected': true, 'showMessage': true };
            console.log($scope.orderStatus);
            setTimeout(hideMessage, 5000);
        }
        
        function hideMessage() {
            $("#purchase-notification").css({ 'visibility': 'hidden' });
            $scope.orderStatus['showMessage'] = false;
        }
        
        $scope.purchaseItem = function(event) {
            var coins = +(localStorage['coins']);
            var price = +(angular.element(event.target).text());
            var item = angular.element(event.target).parent().parent().find('td').html();
            if (coins > price) {
                angular.element(event.target).parent().html('Purchased');
                localStorage['coins'] = coins - price;
                $('nav .coins-badge').html(coins - price);
                approvePurchase();
                
                if ($scope.purchases.length) {
                    cart.push(item);
                    localStorage['purchases'] = JSON.stringify($scope.purchases.concat(cart));
                }
                else {
                    if (cart.indexOf(item) < 0) {
                        cart.push(item);
                        localStorage['purchases'] = JSON.stringify(cart);
                    }
                }
            }
            else {
                rejectPurchase();
            }
        }
        
    }]);