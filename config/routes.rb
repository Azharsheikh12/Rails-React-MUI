Rails.application.routes.draw do
  root "home#index"

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    post 'login', to: 'users/sessions#create'
    get 'signup', to: 'devise/registrations#new', as: 'signup'
  end
  
  # API routes
  namespace :api do
    namespace :v1 do
      post 'users/login', to: 'sessions#create', as: 'login'
      post 'users/signup', to: 'registrations#create', as: 'signup'
      post 'referrals', to: 'referrals#create'
    end
  end
end
