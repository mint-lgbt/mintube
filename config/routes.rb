Rails.application.routes.draw do
  root to: 'home#index'

  get '/toggle_theme', to: 'toggle_theme#change'

  get '/privacy', to: 'privacy#index'

  get '/licenses', to: 'license#index'

  devise_for :users
end
