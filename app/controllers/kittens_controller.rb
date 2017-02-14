class KittensController < ApplicationController
  # this is necessary if you want the project menu in the sidebar for your view
  before_filter :find_optional_project, only: :index

  def index
    @kittens = Kitten.all

    render layout: true
  end

  def new
    # TODO
    # @kitten = Kitten.new
  end

  def create
    # TODO
    # @kitten = Kitten.new
    #  notify_changed_kittens(:added, @kitten)
    # if @kitten.save
    #   flash[:notice] = 'Created new kitten (not really)'
    #   redirect_to action: 'index'
    #   notify_changed_kittens(:added, @kitten)
    # else
    #   flash[:error] = 'Cannot create new kitten'
    #   render action: 'new'
    # end
  end

  private

  # TODO
  # def notify_changed_kittens(action, changed_kitten)
    # OpenProject::Notifications.send(:kittens_changed, action: action, kitten: changed_kitten)
  # end
end
