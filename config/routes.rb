Rails.application.routes.draw do
  scope '', as: 'kitten_plugin' do
    resources :kittens
  end
end
