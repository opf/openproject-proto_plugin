require 'spec_helper'

describe KittensController, type: :controller do
  let(:user) { FactoryGirl.create :admin }

  before do
    login_as user
  end

  describe '#index' do
    before do
      get :index
    end

    it 'renders a template' do
      expect(response).to be_success
      expect(response).to render_template 'kittens/index'
    end
  end
end
