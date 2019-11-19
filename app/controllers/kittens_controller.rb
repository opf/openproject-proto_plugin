class KittensController < ApplicationController
  before_action :find_optional_project

  def index
    @kittens = Kitten.all

    render layout: true
  end

  def new
    @kitten = Kitten.new
  end

  def create
    # TODO
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
    # params.require(:kitten).permit(:name, :project_id)
  end

  # def notify_changed_kittens(action, changed_kitten)
  #   OpenProject::Notifications.send(:kittens_changed, action: action, kitten: changed_kitten)
  # end
end
