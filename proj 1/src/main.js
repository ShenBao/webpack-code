var routes = {

    '/home': function(){
    	require(['./comp/home/home.js'],function(home){
    		home.render()
    	})
    },
    
    '/store':function(){
    	require(['./comp/store/store.js'],function(store){
    		store.render()
    	})
    },

    '/cart': function(){
    	require(['./comp/cart/cart.js'],function(cart){
    		cart.render()
    	})
    },
    '/mine': function(){
    	require(['./comp/mine/mine.js'],function(mine){
    		mine.render()
    	})
    }
  };

require(['director'],function(d){
	var router = d.Router(routes);
	router.configure({
		notfound:function(){
			location.hash = '/home';
		}
	})
	router.init();
})

