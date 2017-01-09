class KittensController < ApplicationController
  def index
    @kittens = ['Felix', 'Klaus', 'Herbert']
  end
end
