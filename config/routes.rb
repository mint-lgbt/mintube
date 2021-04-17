Rails.application.routes.draw do
  root to: 'home#index'

  get '/toggle_theme', to: 'toggle_theme#change'

  devise_for :users
end
