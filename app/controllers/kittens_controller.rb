class KittensController < ApplicationController
  # Check for the permissions of the user
  # as defined in the engine.rb permissions block
  before_action :find_project_by_project_id
  before_action :authorize

  def index
    @kittens = Kitten.all

    render layout: true
  end

  def new
    @kitten = Kitten.new
  end

  def create
    @kitten = Kitten.new(kitten_params)
    if @kitten.save
      # notify_changed_kittens(:created, @kitten)
      flash[:notice] = 'Created new kitten'
      redirect_to action: 'index'
    else
      flash[:error] = 'Cannot create new kitten'
      render action: 'new'
    end
  end

  private

  def kitten_params
    params.require(:kitten).permit(:name)
  end

  # def notify_changed_kittens(action, changed_kitten)
  #   OpenProject::Notifications.send(:kittens_changed, action: action, kitten: changed_kitten)
  # end
end
