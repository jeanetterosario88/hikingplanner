Rails.application.routes.draw do
  # resources :notes
  resources :trails, only: %i[show index create update]
  resources :locations, only: %i[show index create] 
  # customize routes for what you're actually using
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
