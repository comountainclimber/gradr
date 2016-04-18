Rails.application.routes.draw do

  get 'main/index'
  root 'main#index'

  namespace :api, defaults: { format: :json } do
    get '/students', to: 'students#index'
  end

end