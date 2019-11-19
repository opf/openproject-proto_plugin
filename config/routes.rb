Rails.application.routes.draw do
  scope '', as: 'plugin_kitten' do
    scope 'projects/:project_id', as: 'project' do
      resources :kittens
    end
  end
end
