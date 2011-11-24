Fanalyzer::Application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks"} do
		root :to => "pages#index"
		get "sign_in", :to => "pages#index"
		get "sign_out", :to => "devise/sessions#destroy"
		get 'omniauth_callbacks/oauth_data' => 'omniauth_callbacks#oauth_data'
    post 'omniauth_callbacks/clear_omniauth' => 'omniauth_callbacks#clear_omniauth'
    get '/users/auth/:provider' => 'omniauth_callbacks#passthru'
    get '/users/auth/:provider/callback' => 'omniauth_callbacks#aho'
	end


	match 'home' => 'users#home', :as => 'user_home'

	resources :users
	resources :comments

	resources :questions do
		resources :answers do
			post 'up_vote', :on => :member
			post 'down_vote', :on => :member
		end
		get 'my' , :on => :collection
	end

	
	root :to => "pages#index"


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id(.:format)))'
end
