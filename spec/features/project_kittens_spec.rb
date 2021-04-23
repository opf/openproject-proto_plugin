#-- copyright
# OpenProject ProtoPlugin Plugin
#
# Copyright (C)2016-2017 the OpenProject Foundation (OPF)
#
# This program is free software; you can redistribute it and/or modify it under
# the terms of the GNU General Public License version 3.
#
# OpenProject Backlogs is a derivative work based on ChiliProject Backlogs.
# The copyright follows:
# Copyright (C) 2010-2011 - Emiliano Heyns, Mark Maglana, friflaj
# Copyright (C) 2011 - Jens Ulferts, Gregor Schmidt - Finn GmbH - Berlin, Germany
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See doc/COPYRIGHT.rdoc for more details.
#++

require 'spec_helper'

# Feature type means system tests,
# js:true will enable a JS-compatible browser (Chrome by default)
#
# Testing is done with Capybara and Selenium
describe 'Project kittens', type: :feature, js: true do
  let(:permissions) { %w[view_kittens manage_kittens] }
  let(:project) { FactoryBot.create :project, enabled_module_names: %w[kittens_module] }
  let(:user) do
    FactoryBot.create :user,
                      member_in_project: project,
                      member_with_permissions: permissions
  end

  before do
    login_as user
  end

  context 'with a kitten created' do
    let!(:kitten) { FactoryBot.create :kitten, name: 'Foobar' }

    it 'will show an existing kitten' do
      visit kitten_plugin_project_kittens_path project_id: project.id
      expect(page).to have_text "These are the kittens"
      expect(page).to have_selector '.kitten', text: 'Foobar'
    end
  end

  it 'can create a new kitten' do
    visit kitten_plugin_project_kittens_path project_id: project.id
    expect(page).to have_text "There is currently nothing to display."

    click_on 'New Kitten'

    fill_in 'Name', with: "This is the kitten's name"

    click_on 'Create'

    expect(page).to have_text "These are the kittens"
    expect(page).to have_selector '.kitten', text: "This is the kitten's name"
  end

  context 'with no kittens permissions' do
    let(:permissions) { %w[view_project] }

    it 'will render a 403' do
      visit kitten_plugin_project_kittens_path project_id: project.id
      expect(page).to have_text "You are not authorized to access this page."
    end
  end
end
